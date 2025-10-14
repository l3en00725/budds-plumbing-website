#!/usr/bin/env node

/**
 * Budd's Plumbing Website Crawler
 * Scrapes all pages, downloads images, and creates Astro-compatible markdown
 */

import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import https from 'https';
import http from 'http';
import { URL } from 'url';
import { createWriteStream } from 'fs';

const BASE_URL = 'https://www.buddsplumbing.com';
const OUTPUT_DIR = './src/content';
const IMAGES_DIR = './public/assets/budds';
const CRAWLED_PAGES = new Set();
const DOWNLOADED_IMAGES = new Set();

// Ensure directories exist
await fs.mkdir(OUTPUT_DIR, { recursive: true });
await fs.mkdir(IMAGES_DIR, { recursive: true });

/**
 * Download image from URL
 */
async function downloadImage(imageUrl, filename) {
  if (DOWNLOADED_IMAGES.has(imageUrl)) return filename;

  try {
    const url = new URL(imageUrl);
    const protocol = url.protocol === 'https:' ? https : http;

    return new Promise((resolve, reject) => {
      const file = createWriteStream(path.join(IMAGES_DIR, filename));

      protocol.get(imageUrl, (response) => {
        if (response.statusCode === 200) {
          response.pipe(file);
          file.on('finish', () => {
            file.close();
            DOWNLOADED_IMAGES.add(imageUrl);
            console.log(`✅ Downloaded: ${filename}`);
            resolve(filename);
          });
        } else {
          reject(new Error(`Failed to download ${imageUrl}: ${response.statusCode}`));
        }
      }).on('error', reject);
    });
  } catch (error) {
    console.error(`❌ Error downloading ${imageUrl}:`, error.message);
    return null;
  }
}

/**
 * Generate SEO-friendly filename from URL
 */
function generateImageFilename(imageUrl, pageSlug) {
  const url = new URL(imageUrl);
  const ext = path.extname(url.pathname) || '.jpg';
  const basename = path.basename(url.pathname, ext);

  // Create SEO-friendly name
  const seoName = `${pageSlug}-${basename}`.toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return `${seoName}${ext}`;
}

/**
 * Generate page slug from URL
 */
function generateSlug(url) {
  const pathname = new URL(url).pathname;
  return pathname === '/' ? 'home' :
    pathname.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home';
}

/**
 * Extract and process page content
 */
async function extractPageContent(page, url) {
  const content = await page.evaluate(() => {
    // Remove scripts, styles, and nav elements
    const elementsToRemove = document.querySelectorAll('script, style, nav, header, footer, .nav, .navigation');
    elementsToRemove.forEach(el => el.remove());

    // Extract title
    const title = document.querySelector('h1')?.textContent?.trim() ||
                 document.querySelector('title')?.textContent?.trim() ||
                 'Untitled';

    // Extract meta description
    const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';

    // Extract main content
    const contentArea = document.querySelector('main, .main-content, .content, .post-content, .blog-content') ||
                       document.body;

    // Extract all text content
    const textContent = contentArea?.innerText?.trim() || '';

    // Extract all images
    const images = Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      alt: img.alt || '',
      title: img.title || ''
    })).filter(img => img.src && !img.src.startsWith('data:'));

    // Extract headings for structure
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
      level: parseInt(h.tagName.substring(1)),
      text: h.textContent.trim()
    }));

    return {
      title,
      metaDescription: metaDesc,
      textContent,
      images,
      headings
    };
  });

  return content;
}

/**
 * Create Astro-compatible frontmatter
 */
function createFrontmatter(pageData, slug, url) {
  const publishDate = new Date().toISOString().split('T')[0];

  return `---
title: "${pageData.title.replace(/"/g, '\\"')}"
description: "${pageData.metaDescription.replace(/"/g, '\\"')}"
slug: "${slug}"
publishDate: "${publishDate}"
author: "Benjamin Haberman"
tags: ["plumbing", "hvac", "cape-may"]
originalUrl: "${url}"
---

`;
}

/**
 * Process images and update content
 */
async function processImages(pageData, slug) {
  const imageMap = new Map();

  for (const image of pageData.images) {
    const filename = generateImageFilename(image.src, slug);
    const downloadedFile = await downloadImage(image.src, filename);

    if (downloadedFile) {
      imageMap.set(image.src, {
        filename: downloadedFile,
        alt: image.alt,
        title: image.title
      });
    }
  }

  return imageMap;
}

/**
 * Convert content to markdown format
 */
function convertToMarkdown(pageData, imageMap) {
  let markdown = pageData.textContent;

  // Add images as markdown
  if (imageMap.size > 0) {
    markdown += '\n\n## Images\n\n';
    imageMap.forEach((imageData, originalSrc) => {
      markdown += `![${imageData.alt}](/assets/budds/${imageData.filename} "${imageData.title}")\n\n`;
    });
  }

  return markdown;
}

/**
 * Crawl a single page
 */
async function crawlPage(browser, url) {
  if (CRAWLED_PAGES.has(url)) return;

  console.log(`🔄 Crawling: ${url}`);
  CRAWLED_PAGES.add(url);

  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    const slug = generateSlug(url);
    const pageData = await extractPageContent(page, url);

    // Process images
    const imageMap = await processImages(pageData, slug);

    // Create markdown content
    const frontmatter = createFrontmatter(pageData, slug, url);
    const markdown = convertToMarkdown(pageData, imageMap);
    const fullContent = frontmatter + markdown;

    // Save to file
    const filename = `${slug}.md`;
    await fs.writeFile(path.join(OUTPUT_DIR, filename), fullContent, 'utf8');

    console.log(`✅ Created: ${filename}`);

    await page.close();

    return pageData;
  } catch (error) {
    console.error(`❌ Error crawling ${url}:`, error.message);
    return null;
  }
}

/**
 * Discover all pages on the site
 */
async function discoverPages(browser) {
  // Start with known pages from the blog migration plan and common pages
  const knownPages = [
    BASE_URL, // Homepage
    `${BASE_URL}/post/kohler-vs-american-standard-toilets-which-one-is-right-for-your-home`,
    `${BASE_URL}/post/why-wait-for-your-pipes-to-freeze`,
    `${BASE_URL}/post/fall-winter-storm-plumbing-checklist`,
    `${BASE_URL}/post/low-summer-water-pressure`,
    `${BASE_URL}/post/august-rental-home-plumbing-hvac-issues`,
    `${BASE_URL}/services`,
    `${BASE_URL}/about`,
    `${BASE_URL}/contact`,
    `${BASE_URL}/blog`,
    `${BASE_URL}/emergency`,
    `${BASE_URL}/service-areas`,
    `${BASE_URL}/reviews`,
    `${BASE_URL}/gallery`
  ];

  const pages = new Set(knownPages);

  // Try to discover additional pages with shorter timeout
  const page = await browser.newPage();
  try {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 10000 });

    // Extract all internal links with shorter timeout
    const links = await page.evaluate((baseUrl) => {
      const anchors = Array.from(document.querySelectorAll('a[href]'));
      return anchors
        .map(a => a.href)
        .filter(href => href && href.startsWith(baseUrl))
        .filter(href => !href.includes('#')) // Remove anchor links
        .filter(href => !href.includes('?')) // Remove query params for now
        .filter(href => !href.match(/\.(pdf|doc|docx|xls|xlsx)$/i)); // Skip documents
    }, BASE_URL);

    links.forEach(link => pages.add(link));
    console.log(`🔗 Discovered ${links.length} additional links`);

    await page.close();
  } catch (error) {
    console.warn('⚠️ Page discovery timeout, using known pages only:', error.message);
    await page.close();
  }

  return Array.from(pages);
}

/**
 * Main crawler function
 */
async function main() {
  console.log('🚀 Starting Budd\'s Plumbing website crawler...');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    // Discover all pages
    console.log('🔍 Discovering pages...');
    const allPages = await discoverPages(browser);
    console.log(`📄 Found ${allPages.length} pages to crawl`);

    // Crawl each page
    for (const pageUrl of allPages) {
      await crawlPage(browser, pageUrl);
      // Small delay to be respectful
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('✅ Crawling complete!');
    console.log(`📁 Content saved to: ${OUTPUT_DIR}`);
    console.log(`🖼️ Images saved to: ${IMAGES_DIR}`);
    console.log(`📊 Crawled ${CRAWLED_PAGES.size} pages`);
    console.log(`🖼️ Downloaded ${DOWNLOADED_IMAGES.size} images`);

  } catch (error) {
    console.error('❌ Crawler error:', error);
  } finally {
    await browser.close();
  }
}

// Run the crawler
main().catch(console.error);