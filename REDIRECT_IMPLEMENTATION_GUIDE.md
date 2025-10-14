# Redirect Implementation Guide
## Budds Plumbing Website Migration

**Purpose:** Technical guide for implementing 301 redirects during Webflow → Astro migration
**Platform:** Vercel (Primary) / Netlify (Alternative)
**Status:** Reference Document - Only Use If URL Changes Required

---

## When to Use This Guide

### ✅ Use Redirects When:
1. You MUST change URLs from Webflow structure
2. Consolidating multiple pages into one
3. Changing URL slugs for SEO improvement
4. Removing pages and redirecting to alternatives

### ❌ Don't Use Redirects When:
1. URLs remain identical between Webflow and Astro
2. Creating new pages that didn't exist on Webflow
3. URLs are already correct and working

**⚠️ IMPORTANT:** Based on current analysis, if you keep existing Webflow URLs exactly as-is, **NO REDIRECTS ARE NEEDED.**

---

## Redirect Configuration Options

### Option 1: Vercel Configuration (Recommended)

Create: `/vercel.json` in project root

```json
{
  "redirects": [
    {
      "source": "/old-url-path",
      "destination": "/new-url-path",
      "permanent": true
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

**Key Points:**
- `"permanent": true` = 301 redirect (SEO-friendly)
- `"permanent": false` = 302 redirect (temporary, NOT recommended for SEO)
- Test thoroughly before deploying

### Option 2: Netlify Configuration (Alternative)

Create: `/public/_redirects`

```
# Netlify Redirects File
# Format: from   to   status

/old-url-path   /new-url-path   301
/another-old-url   /another-new-url   301

# Wildcard example
/old-services/*   /services/:splat   301
```

**Key Points:**
- Simple text file format
- One redirect per line
- 301 = permanent redirect
- :splat captures wildcard paths

### Option 3: Astro Redirect Middleware (Advanced)

Create: `/src/middleware.ts`

```typescript
import { defineMiddleware } from 'astro/middleware';

const redirects: Record<string, string> = {
  '/old-url-path': '/new-url-path',
  '/another-old-url': '/another-new-url',
  // Add more redirects as needed
};

export const onRequest = defineMiddleware((context, next) => {
  const path = context.url.pathname;

  if (redirects[path]) {
    return context.redirect(redirects[path], 301);
  }

  return next();
});
```

**Key Points:**
- More flexible and dynamic
- Can include complex logic
- Requires Astro 2.0+
- Slightly more overhead than platform redirects

---

## Recommended Redirect Map (If URL Changes Needed)

### Scenario: Moving Root URLs to /services/ (NOT RECOMMENDED)

**Only use if absolutely necessary - will impact SEO temporarily**

```json
{
  "redirects": [
    {
      "source": "/tankless-water-heater",
      "destination": "/services/tankless-water-heater",
      "permanent": true
    },
    {
      "source": "/drain-cleaning",
      "destination": "/services/drain-cleaning",
      "permanent": true
    },
    {
      "source": "/toilet-repair",
      "destination": "/services/toilet-repair",
      "permanent": true
    },
    {
      "source": "/faucet-repair",
      "destination": "/services/faucet-repair",
      "permanent": true
    },
    {
      "source": "/sink-installation-and-repair",
      "destination": "/services/sink-installation-repair",
      "permanent": true
    },
    {
      "source": "/garbage-disposal",
      "destination": "/services/garbage-disposal",
      "permanent": true
    },
    {
      "source": "/sump-pump-installation",
      "destination": "/services/sump-pump-installation",
      "permanent": true
    },
    {
      "source": "/sewer-line-repair-replacement",
      "destination": "/services/sewer-line-repair",
      "permanent": true
    },
    {
      "source": "/boiler-repair-installation",
      "destination": "/services/boiler-repair-installation",
      "permanent": true
    },
    {
      "source": "/water-heater-repair",
      "destination": "/services/water-heater-repair",
      "permanent": true
    }
  ]
}
```

### Scenario: Consolidating Duplicate Pages

**If Webflow has multiple URLs for same service:**

```json
{
  "redirects": [
    {
      "source": "/services/tankless-water-heaters",
      "destination": "/tankless-water-heater",
      "permanent": true
    },
    {
      "source": "/water-heater-tankless",
      "destination": "/tankless-water-heater",
      "permanent": true
    }
  ]
}
```

### Scenario: Wildcard Redirects (Use Sparingly)

**For bulk URL changes:**

```json
{
  "redirects": [
    {
      "source": "/old-services/:slug",
      "destination": "/services/:slug",
      "permanent": true
    }
  ]
}
```

**⚠️ Warning:** Wildcard redirects can cause unexpected issues. Test thoroughly.

---

## Testing Redirects

### Manual Testing Checklist

- [ ] **Test Each Redirect Individually**
  ```bash
  curl -I https://www.buddsplumbing.com/old-url-path
  ```
  - Verify status code is `301 Moved Permanently`
  - Verify `Location:` header points to correct new URL

- [ ] **Test in Browser**
  - Open old URL in browser
  - Should redirect to new URL immediately
  - Check browser URL bar shows new URL

- [ ] **Test from Multiple Devices**
  - Desktop browser
  - Mobile browser
  - Incognito/private mode (no cache)

### Automated Testing Script

Create: `/scripts/test-redirects.js`

```javascript
const https = require('https');

const redirects = [
  { from: '/tankless-water-heater', to: '/services/tankless-water-heater' },
  { from: '/drain-cleaning', to: '/services/drain-cleaning' },
  // Add more redirects
];

async function testRedirect(domain, from, expectedTo) {
  return new Promise((resolve) => {
    const url = `https://${domain}${from}`;

    https.get(url, (res) => {
      const statusCode = res.statusCode;
      const location = res.headers.location;

      const success = statusCode === 301 && location && location.includes(expectedTo);

      console.log(`${from} → ${location || 'NO REDIRECT'} [${statusCode}] ${success ? '✅' : '❌'}`);
      resolve(success);
    });
  });
}

async function runTests() {
  console.log('Testing redirects...\n');

  for (const redirect of redirects) {
    await testRedirect('www.buddsplumbing.com', redirect.from, redirect.to);
  }

  console.log('\nTests complete.');
}

runTests();
```

**Usage:**
```bash
node scripts/test-redirects.js
```

### Online Testing Tools

1. **Redirect Checker**
   - https://www.redirect-checker.org/
   - Enter old URL, verify 301 redirect

2. **Screaming Frog SEO Spider**
   - Crawl site before and after migration
   - Identify broken links and redirects
   - Export redirect report

3. **Google Search Console**
   - Monitor 404 errors
   - Track redirect effectiveness
   - Identify missing redirects

---

## Redirect Best Practices

### ✅ DO:

1. **Use 301 Redirects** (Permanent)
   - Passes 90-99% of link equity
   - Tells Google URL has moved permanently
   - Maintains SEO rankings

2. **Redirect to Most Relevant Page**
   - Old: `/tankless-water-heater`
   - New: `/tankless-water-heater` (same content)
   - NOT: `/services` (generic page)

3. **Avoid Redirect Chains**
   - Bad: `/old` → `/temp` → `/new` (2 hops)
   - Good: `/old` → `/new` (1 hop)

4. **Update Internal Links**
   - Don't rely on redirects for internal navigation
   - Update all internal links to point to new URLs
   - Redirects are for external links and bookmarks

5. **Monitor for 6 Months**
   - Keep redirects active for at least 6 months
   - Google needs time to update its index
   - Monitor Google Search Console for issues

### ❌ DON'T:

1. **Don't Use 302 Redirects** (Temporary)
   - Does NOT pass link equity effectively
   - Confuses search engines
   - Use only for truly temporary redirects

2. **Don't Redirect to Unrelated Pages**
   - Old: `/tankless-water-heater`
   - Bad: `/contact` (unrelated)
   - Results in poor user experience and SEO penalty

3. **Don't Create Redirect Loops**
   - Bad: `/page-a` → `/page-b` → `/page-a`
   - Breaks site, confuses search engines

4. **Don't Delete Redirects Too Soon**
   - Backlinks may take months to be re-crawled
   - User bookmarks may be old
   - Keep redirects for at least 1 year

5. **Don't Redirect Everything to Homepage**
   - Bad: `/service-1`, `/service-2`, `/service-3` → `/`
   - Called "soft 404" by Google
   - Penalizes SEO rankings

---

## Implementation Timeline

### Pre-Deployment (1 Week Before)

- [ ] **Create vercel.json with redirects**
  - Add all required redirects
  - Test locally with Vercel CLI
  - Commit to repository

- [ ] **Test on Staging Environment**
  - Deploy to Vercel preview
  - Test all redirects manually
  - Run automated test script

- [ ] **Document Redirect Map**
  - Create CSV file with old → new URLs
  - Share with team for review
  - Keep for post-launch reference

### Deployment Day

- [ ] **Deploy with Redirects**
  - Push vercel.json to production
  - Verify deployment succeeded
  - Test redirects on live site

- [ ] **Monitor Redirect Performance**
  - Check Vercel analytics for redirect traffic
  - Monitor Google Search Console for 404s
  - Test 10-20 random old URLs

### Post-Deployment (First Week)

- [ ] **Daily Redirect Monitoring**
  - Check for 404 errors in logs
  - Add missing redirects immediately
  - Test reported broken links

- [ ] **Update Sitemap**
  - Ensure new URLs are in sitemap.xml
  - Submit to Google Search Console
  - Request re-crawl of key pages

### Ongoing (First 30 Days)

- [ ] **Weekly Redirect Audit**
  - Review Vercel analytics for redirect hits
  - Identify frequently accessed redirects
  - Consider updating external backlinks

---

## Common Issues & Solutions

### Issue: Redirect Not Working

**Symptoms:**
- Old URL shows 404 instead of redirecting
- Old URL loads but doesn't redirect

**Solutions:**
1. Clear browser cache and test in incognito mode
2. Verify vercel.json syntax is correct (no trailing commas)
3. Check Vercel deployment logs for errors
4. Ensure vercel.json is in project root, not /src/

### Issue: Redirect Loop

**Symptoms:**
- Browser shows "Too many redirects" error
- Page never loads

**Solutions:**
1. Check for circular redirects (A → B → A)
2. Verify destination URL exists and doesn't redirect
3. Remove redirect and test destination URL directly

### Issue: Wrong Destination

**Symptoms:**
- Redirect works but goes to wrong page
- 301 status code but incorrect Location header

**Solutions:**
1. Check vercel.json for typos in destination
2. Verify destination URL is correct
3. Clear CDN cache (Vercel automatically clears on deploy)

### Issue: 302 Instead of 301

**Symptoms:**
- Redirect works but status code is 302
- SEO tools flag as temporary redirect

**Solutions:**
1. Ensure `"permanent": true` in vercel.json
2. Redeploy to apply configuration change
3. Clear browser cache to see updated status code

---

## Vercel CLI Testing (Local)

### Install Vercel CLI

```bash
npm install -g vercel
```

### Login to Vercel

```bash
vercel login
```

### Test Redirects Locally

```bash
vercel dev
```

Then test redirects in browser at `http://localhost:3000/old-url-path`

### Deploy to Preview

```bash
vercel
```

Test redirects on preview URL before deploying to production.

### Deploy to Production

```bash
vercel --prod
```

---

## Redirect Maintenance Schedule

### Week 1-4: Active Monitoring
- Check redirects daily
- Add missing redirects immediately
- Monitor Google Search Console for 404s

### Month 2-3: Weekly Review
- Review redirect analytics weekly
- Update redirect map with any changes
- Test sample redirects monthly

### Month 4-6: Monthly Check
- Monthly review of redirect performance
- Identify unused redirects (consider removing)
- Plan for redirect cleanup after 1 year

### After 1 Year: Redirect Cleanup
- Identify redirects with zero traffic
- Consider removing low-traffic redirects
- Keep high-traffic redirects indefinitely

---

## Final Recommendation

**Based on current analysis:**

### ✅ KEEP EXISTING URLS (No Redirects Needed)

The **best SEO strategy** is to maintain exact URL parity:

- Webflow: `/tankless-water-heater` → Astro: `/tankless-water-heater`
- Webflow: `/drain-cleaning` → Astro: `/drain-cleaning`
- Webflow: `/services/piping-repiping` → Astro: `/services/piping-repiping`

**Benefits:**
- Zero SEO risk
- No redirect configuration needed
- Instant ranking preservation
- No Google re-crawl delay

**New location-specific pages** under `/services/` are NEW content, so no redirects needed.

---

## Only Use Redirects If...

1. **Stakeholder requires URL changes** (strongly discourage)
2. **Consolidating duplicate pages** (legitimate use case)
3. **Fixing poor URL structure** (e.g., `/old-page-123` → `/meaningful-page-name`)

Otherwise, **skip redirect implementation entirely** and focus on content quality and schema markup.

---

## Questions?

For redirect strategy questions, consult:
- `/URL_MIGRATION_STRATEGY.md` - Overall migration plan
- `/URL_MIGRATION_CHECKLIST.md` - Step-by-step checklist
- Web Dev Expert agent - Technical implementation help

**Last Updated:** October 13, 2025
