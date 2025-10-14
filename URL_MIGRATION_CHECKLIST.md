# URL Migration Checklist - Budds Plumbing Website
## Quick Reference Guide

**Last Updated:** October 13, 2025
**Migration Date:** TBD
**Status:** Pre-Launch Preparation

---

## Pre-Launch Preparation

### Week 1: URL Structure & Mapping

- [ ] **Export Webflow Sitemap**
  - Go to Webflow site settings
  - Download complete sitemap.xml
  - Save to `/migration-backup/webflow-sitemap.xml`

- [ ] **Create URL Mapping Spreadsheet**
  - Document all current Webflow URLs
  - Map to corresponding Astro URLs
  - Flag any URL changes requiring 301 redirects
  - Save as `/url-mapping.csv`

- [ ] **Identify High-Value URLs**
  - Check Google Search Console for top-performing pages
  - Note pages with most backlinks (Ahrefs/Moz)
  - Prioritize these for perfect URL matching
  - Document in spreadsheet

- [ ] **Configure Astro Routing**
  - Create root-level service pages (if needed)
  - Test dynamic routing in `/src/pages/services/[slug].astro`
  - Verify both `/[slug]` and `/services/[slug]` work
  - Local test: `npm run dev`

- [ ] **Update astro.config.mjs**
  - Set correct `site` URL (https://www.buddsplumbing.com)
  - Enable sitemap generation
  - Verify all integrations are configured

### Week 2: Content Migration

- [ ] **Migrate General Service Pages**
  - `/tankless-water-heater` - Keep exact URL
  - `/drain-cleaning` - Keep exact URL
  - `/toilet-repair` - Create if doesn't exist
  - `/faucet-repair` - Create if doesn't exist
  - Verify metadata matches or improves Webflow pages

- [ ] **Enhance Location-Specific Pages**
  - Add "See also" sections linking to general pages
  - Differentiate content (city-specific vs. county-wide)
  - Add location-specific testimonials
  - Include city landmarks and neighborhoods

- [ ] **Implement Schema Markup**
  - Verify Service schema on all pages
  - Confirm FAQPage schema extracts correctly
  - Test BreadcrumbList schema
  - Validate with Google Rich Results Test

- [ ] **Internal Linking Optimization**
  - Add contextual links from general → location pages
  - Create service hub page (/services/index.astro)
  - Add cross-service recommendations
  - Verify all links use absolute paths

### Week 3: Testing & Validation

- [ ] **Local Testing**
  - Run `npm run build` successfully
  - Test all service page URLs locally
  - Verify images load correctly
  - Test mobile responsiveness

- [ ] **Schema Validation**
  - Test every service page with Google Rich Results Test
  - Fix any schema markup errors
  - Verify FAQ schema extracts properly
  - Confirm BreadcrumbList appears correctly

- [ ] **Performance Audit**
  - Run Lighthouse on 10 key pages
  - Confirm LCP < 2.5s on all pages
  - Verify CLS < 0.1 on all pages
  - Test on 3G connection speeds

- [ ] **Staging Deployment**
  - Deploy to Vercel preview environment
  - Test all URLs on staging domain
  - Crawl with Screaming Frog (if available)
  - Share staging link with stakeholders

- [ ] **Redirect Testing (If Applicable)**
  - Create `/vercel.json` with redirects
  - Test each redirect manually
  - Verify 301 status codes (not 302)
  - Check for redirect chains (max 1 hop)

### Week 4: Pre-Launch Final Checks

- [ ] **Google Search Console Setup**
  - Add new property for Astro site domain
  - Verify domain ownership
  - Prepare to submit new sitemap
  - Set up email alerts for critical errors

- [ ] **Analytics Configuration**
  - Set up GA4 property (if new)
  - Configure conversion tracking
  - Test form submission events
  - Set up CallRail DNI tracking

- [ ] **Backup Webflow Data**
  - Export complete Webflow site backup
  - Save all page content as PDF
  - Download all images and assets
  - Store in `/migration-backup/`

- [ ] **Create Monitoring Dashboard**
  - Set up Google Search Console monitoring
  - Configure GA4 custom reports
  - Prepare spreadsheet for ranking tracking
  - Set up uptime monitoring (UptimeRobot)

---

## Launch Day Sequence

### T-1 Hour (Before DNS Switch)

- [ ] **Final Vercel Deployment**
  - Deploy production build to Vercel
  - Verify build completed successfully
  - Test production preview URL
  - Confirm all environment variables are set

- [ ] **Export Final Webflow Sitemap**
  - Download current sitemap.xml from Webflow
  - Save with timestamp: `webflow-sitemap-FINAL-2025-10-13.xml`
  - Document current rankings for top 20 keywords

- [ ] **Team Notification**
  - Alert stakeholders migration is starting
  - Provide status update timeline
  - Share monitoring dashboard links

### T-0 (DNS Switch)

- [ ] **Update DNS Records**
  - Point domain to Vercel deployment
  - Update A records and CNAME
  - Note exact time of DNS update

- [ ] **Monitor DNS Propagation**
  - Use whatsmydns.net to check propagation
  - Wait for at least 50% global propagation
  - Test from multiple locations/devices

### T+15 Minutes (Initial Testing)

- [ ] **Verify Site is Live**
  - Load www.buddsplumbing.com
  - Check homepage loads correctly
  - Test 5 high-priority service pages
  - Verify tracking scripts are firing

- [ ] **Test Critical Functionality**
  - Submit test form (contact form)
  - Verify form submission reaches Slack
  - Test phone number click-to-call
  - Confirm GA4 events are tracking

### T+30 Minutes (URL Testing)

- [ ] **Test Random URLs**
  - Test 10 root-level service pages
  - Test 10 /services/ location pages
  - Test blog post URLs
  - Test 5 redirects (if applicable)

- [ ] **Check for Errors**
  - Review Vercel deployment logs
  - Check for any 404 errors
  - Verify all images are loading
  - Test on mobile device

### T+1 Hour (Search Console)

- [ ] **Submit New Sitemap**
  - Go to Google Search Console
  - Submit new sitemap.xml URL
  - Request immediate indexing for top 10 pages
  - Monitor for crawl errors

- [ ] **Configure Search Console**
  - Set up email alerts
  - Request re-crawl of homepage
  - Submit URL inspection for key pages

### T+2 Hours (Monitoring Setup)

- [ ] **Enable Monitoring**
  - Check Google Analytics real-time reports
  - Monitor Vercel analytics dashboard
  - Review server logs for errors
  - Set up Slack alerts for critical errors

---

## Post-Launch Monitoring

### Daily (Days 1-7)

- [ ] **Morning Check (9 AM)**
  - Check Google Search Console for crawl errors
  - Review Vercel error logs
  - Check GA4 for traffic anomalies
  - Test 5 random URLs

- [ ] **Afternoon Check (3 PM)**
  - Monitor 404 error count
  - Check for indexing progress in GSC
  - Review form submission tracking
  - Test any reported issues

- [ ] **Evening Check (8 PM)**
  - Final review of daily metrics
  - Document any issues discovered
  - Plan fixes for next day

- [ ] **Daily Report**
  - Organic traffic vs. previous day
  - Crawl errors discovered and fixed
  - Rankings for top 10 keywords
  - Any critical issues

### Weekly (Days 8-30)

- [ ] **Monday: Analytics Review**
  - Compare week-over-week traffic
  - Review top-performing pages
  - Identify any traffic drops
  - Analyze conversion rate changes

- [ ] **Wednesday: Rankings Check**
  - Track rankings for top 50 keywords
  - Compare to pre-migration rankings
  - Document any significant changes
  - Identify pages needing optimization

- [ ] **Friday: Technical Audit**
  - Run full site crawl (Screaming Frog)
  - Check for broken links
  - Verify schema markup on new pages
  - Review Core Web Vitals report

---

## Issue Resolution Protocol

### If Rankings Drop

- [ ] **Identify Affected Pages**
  - Document which pages dropped
  - Check Google Search Console for manual actions
  - Review page indexing status
  - Compare current vs. old content

- [ ] **Check Technical Issues**
  - Verify page is indexed
  - Check for noindex tags
  - Verify canonical URLs
  - Test schema markup validation

- [ ] **Content Comparison**
  - Compare Webflow vs. Astro content
  - Ensure metadata is preserved
  - Verify internal linking
  - Check for missing content sections

- [ ] **Implement Fixes**
  - Add missing content/metadata
  - Fix technical SEO issues
  - Request re-indexing in GSC
  - Monitor recovery over 7 days

### If 404 Errors Appear

- [ ] **Identify Error Sources**
  - Check Google Search Console for 404 list
  - Review Vercel error logs
  - Identify most common broken URLs

- [ ] **Create Redirects**
  - Add 301 redirects to `/vercel.json`
  - Deploy updated configuration
  - Test each redirect manually
  - Request re-crawl in GSC

- [ ] **Fix Internal Links**
  - Search codebase for broken links
  - Update internal links to correct URLs
  - Test navigation flows
  - Verify breadcrumb links

### If Traffic Drops Significantly (>20%)

- [ ] **Emergency Audit**
  - Check if site is down/slow
  - Verify Google Analytics is tracking
  - Check Google Search Console for penalties
  - Review indexing status of key pages

- [ ] **Compare Pre/Post Migration**
  - Compare rankings for top keywords
  - Review indexed page count (site: search)
  - Check backlink status (still pointing correctly?)
  - Verify tracking codes haven't broken

- [ ] **Immediate Actions**
  - Fix critical technical issues
  - Submit sitemap again if needed
  - Request re-indexing of key pages
  - Contact stakeholders with status

---

## 30-Day Post-Launch Review

- [ ] **SEO Performance**
  - Compare organic traffic (pre vs. post)
  - Document ranking changes for all service pages
  - Calculate featured snippet capture rate
  - Review indexing status (all pages indexed?)

- [ ] **Technical Performance**
  - Run full Lighthouse audit on 20 pages
  - Verify Core Web Vitals meet thresholds
  - Check schema markup validation rate
  - Review mobile usability report

- [ ] **Conversion Tracking**
  - Verify form submissions tracking correctly
  - Check phone call tracking (CallRail)
  - Review conversion rate changes
  - Test lead quality vs. pre-migration

- [ ] **Content Performance**
  - Identify top-performing location pages
  - Review FAQ schema effectiveness
  - Analyze user engagement metrics
  - Plan content enhancements

- [ ] **Final Report**
  - Document migration success/challenges
  - Update knowledge base with learnings
  - Share insights with team
  - Plan ongoing optimization strategy

---

## Success Criteria

### ✅ Week 1: Stability
- Zero critical errors
- All URLs resolving correctly
- No significant ranking drops (>10%)
- Tracking working properly

### ✅ Week 4: Recovery
- Organic traffic within 10% of pre-migration
- Top 10 keywords maintained or improved
- Location pages gaining impressions
- Core Web Vitals passing thresholds

### ✅ Month 3: Growth
- Organic traffic exceeds pre-migration levels
- 5+ featured snippets captured
- 15+ location pages in top 5 locally
- Conversion rate improved or maintained

---

## Notes & Documentation

**Migration Date:** _________________

**DNS Updated:** _________________

**Issues Discovered:**
1.
2.
3.

**Lessons Learned:**
1.
2.
3.

**Next Steps:**
1.
2.
3.

---

**✅ This checklist should be printed and checked off manually during migration.**
**🔄 Update this document with actual dates and notes as migration progresses.**
