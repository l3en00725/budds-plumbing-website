# Blog Migration Plan - Budd's Plumbing

## Blog Posts to Migrate

### 1. HIGH PRIORITY (High Traffic)
**Title:** Kohler vs. American Standard Toilets: Which One is Right for Your Home?
**Current URL:** `/post/kohler-vs-american-standard-toilets-which-one-is-right-for-your-home`
**New URL:** `/post/kohler-vs-american-standard-toilets-which-one-is-right-for-your-home`
**Images:**
- toilet-comparison-hero.jpg (main hero image)
- kohler-toilet-showcase.jpg (Kohler product image)
- american-standard-toilet-showcase.jpg (American Standard product image)
**Content Length:** ~1,500-2,000 words
**Special Features:** Affiliate links, expert authorship, comparison tables

### 2. MEDIUM PRIORITY (Seasonal Content)
**Title:** Why Wait for Your Pipes to Freeze? Winterization Tips for Shore Homes
**Current URL:** `/post/why-wait-for-your-pipes-to-freeze`
**New URL:** `/post/why-wait-for-your-pipes-to-freeze`
**Images:**
- frozen-pipes-hero.jpg
- winterization-tips.jpg

**Title:** Storm-Ready Plumbing for Fall and Winter
**Current URL:** `/post/fall-winter-storm-plumbing-checklist`
**New URL:** `/post/fall-winter-storm-plumbing-checklist`
**Images:**
- storm-preparation-hero.jpg
- plumbing-emergency-prep.jpg

**Title:** Low Shower Water Pressure in Summer?
**Current URL:** `/post/low-summer-water-pressure`
**New URL:** `/post/low-summer-water-pressure`
**Images:**
- low-water-pressure-hero.jpg
- shower-pressure-comparison.jpg

**Title:** Most Common Plumbing & HVAC Issues in August Rental Homes
**Current URL:** `/post/august-rental-home-plumbing-hvac-issues`
**New URL:** `/post/august-rental-home-plumbing-hvac-issues`
**Images:**
- rental-home-plumbing-hero.jpg
- august-hvac-issues.jpg

## Image Naming Convention

### Format: `[post-slug]-[image-purpose]-[number].jpg`

Examples:
- `kohler-vs-american-standard-hero-1.jpg`
- `kohler-vs-american-standard-product-kohler-2.jpg`
- `kohler-vs-american-standard-product-american-standard-3.jpg`
- `frozen-pipes-hero-1.jpg`
- `frozen-pipes-prevention-tips-2.jpg`

## Migration Steps

### Phase 1: Content Export
1. Copy content from each Webflow post
2. Preserve heading structure (H1, H2, H3)
3. Note all image positions
4. Save affiliate links and special formatting

### Phase 2: Image Collection
1. Download images from each post
2. Rename using convention above
3. Create image mapping document
4. Optimize for web (WebP + JPG fallback)

### Phase 3: Markdown Creation
1. Convert to Astro markdown (.mdx)
2. Add frontmatter with metadata
3. Insert optimized images
4. Add enhanced schema markup

### Phase 4: URL Preservation
1. Set up exact URL matches
2. Create 301 redirects if needed
3. Test all internal links
4. Preserve affiliate tracking

## Schema Enhancements

### Blog Post Schema
- Article schema with author, publish date
- LocalBusiness mentions
- FAQ schema for Q&A sections
- Product schema for product comparisons

### Enhanced SEO
- Breadcrumb navigation
- Related posts
- Tags and categories
- Reading time estimation

## Content Preservation Checklist

- [ ] Exact titles and headings
- [ ] Author attribution (Benjamin Haberman)
- [ ] Publication dates
- [ ] Affiliate links with tracking
- [ ] Local references (Cape May County)
- [ ] Call-to-action sections
- [ ] Contact information
- [ ] Internal service links