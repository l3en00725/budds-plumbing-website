# Budd's Plumbing, Heating & Cooling Website

Modern Astro-based website for Budd's Plumbing, Heating & Cooling - Cape May County's trusted plumbing and HVAC experts since 1989.

**Live Site:** https://www.buddsplumbing.com
**Business:** Master Plumber License #13160
**Service Area:** Cape May County, Atlantic County, Cumberland County, NJ

---

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/l3en00725/budds-plumbing-website.git
cd budds-plumbing-website

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your actual credentials

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see the site.

### Available Commands

```bash
npm run dev        # Start dev server (localhost:4321)
npm run build      # Build for production
npm run preview    # Preview production build
npm run format     # Format code with Prettier
```

---

## Project Overview

This is a migration from Webflow to Astro, focusing on:
- **Performance:** Lighthouse scores >= 90
- **Local SEO:** Location-specific service pages
- **LLM Optimization:** Structured for AI search (Google AI Overview, ChatGPT, etc.)
- **Conversion:** Clear CTAs, trust badges, financing options

### Key Features

- ✅ Blazing fast Astro static site generation
- ✅ Location-specific service pages (15+ pages)
- ✅ Schema.org markup (LocalBusiness, Service, FAQ, Breadcrumb)
- ✅ 0% financing CTAs (SJG SAVEGREEN & AC Electric NEIF programs)
- ✅ Mobile-first responsive design
- ✅ SEO optimized with Open Graph and Twitter Cards
- ✅ South Jersey Gas contractor badge integration

---

## Project Structure

```
budds-plumbing-website/
├── src/
│   ├── pages/
│   │   ├── index.astro              # Homepage
│   │   ├── [service].astro          # Dynamic service page template
│   │   ├── services/
│   │   │   ├── [slug].astro         # Dynamic location-specific pages
│   │   │   └── index.astro          # Services listing
│   │   └── company/
│   │       ├── about.astro
│   │       ├── contact.astro
│   │       └── legal.astro
│   ├── content/
│   │   └── *.md                     # Service page markdown files
│   ├── components/
│   │   ├── sections/
│   │   │   ├── SJGFinancingCTA.astro        # Gas equipment financing
│   │   │   └── ACElectricFinancingCTA.astro # Electric HVAC financing
│   │   ├── schema/                  # Schema.org components
│   │   └── cards/                   # Service card components
│   ├── layouts/
│   │   ├── Base.astro               # Base HTML structure
│   │   └── Page.astro               # Page wrapper
│   ├── config/
│   │   ├── settings.js              # Global site settings
│   │   ├── nav.js                   # Navigation menu
│   │   └── footer.js                # Footer content
│   └── styles/
│       ├── theme.css                # CSS variables (black/white theme)
│       ├── global.css               # Typography and base styles
│       └── index.css                # Main stylesheet
├── public/
│   ├── assets/budds/                # Brand assets, images
│   ├── favicon-32.png               # Favicon
│   └── social.png                   # Open Graph image (1200x630)
├── .claude/
│   └── PROJECT_STATUS.md            # Detailed session notes
├── PROJECT_STATUS.md                # Current project status (see this first!)
├── project-config.json              # Business info and configuration
├── .env.example                     # Environment variables template
└── README.md                        # This file
```

---

## Environment Setup

### Required Environment Variables

See `.env.example` for all variables. Key ones:

```env
# Analytics (Required)
PUBLIC_GA4_ID=G-XXXXXXXXXX
PUBLIC_GADS_ID=AW-XXXXXXXXX

# CMS (Required for content management)
SANITY_PROJECT_ID=xxxxxxxx
SANITY_DATASET=production

# Database (For form submissions)
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=xxx

# Notifications (For lead alerts)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx

# Call Tracking (Critical for plumbing business)
CALLRAIL_COMPANY_ID=com_xxxxxxxx

# Site URL
PUBLIC_SITE_URL=https://www.buddsplumbing.com
```

---

## Business Information

**Budd's Plumbing, Heating & Cooling**
- **Established:** 1989 (35+ years)
- **Phone:** (609) 465-3759
- **Email:** info@buddsplumbing.com
- **Address:** 1011 Route 9 S, Cape May Court House, NJ 08210
- **License:** Master Plumber #13160
- **Hours:** 24/7 Emergency Service Available

**Service Areas:**
- Cape May County (primary)
- Atlantic County
- Cumberland County

**Key Cities:**
Ocean City, Wildwood, Stone Harbor, Avalon, Cape May, Atlantic City, Vineland, Millville, Egg Harbor Township

**Certifications:**
- South Jersey Gas Participating Contractor
- Atlantic City Electric NEIF Program Partner

**Financing:**
- SJG SAVEGREEN: 0% for 7 years on gas equipment ($10,000+)
- AC Electric NEIF: 0% for 7 years on HVAC ($5,000+)

---

## Current Status

### Completed (Phase 1)
✅ **15 service pages** (furnace repair, water heater, drain cleaning, etc.)
✅ **Homepage fully optimized** (hero, service cards, trust badges, CTAs)
✅ **Financing CTAs** (SJG and AC Electric with LLM-optimized FAQs)
✅ **Design system** (black/white theme, bold typography, minimalist)
✅ **Schema markup** (LocalBusiness, Service, FAQ, Breadcrumb)
✅ **Meta tags** (SEO, Open Graph, Twitter Cards)
✅ **SJG contractor badge** on heating/furnace pages

### Next Steps (Phase 2)
- [ ] Create AC/HVAC service pages (winter prep priority)
- [ ] Add more plumbing service pages
- [ ] Create 15 location-specific landing pages
- [ ] Deploy to production (Vercel/Netlify)
- [ ] Set up Sanity CMS integration
- [ ] Configure call tracking and analytics

**See `PROJECT_STATUS.md` for detailed session notes and progress tracking.**

---

## Design System

### Theme
- **Primary Color:** Black (#000000)
- **Accent Color:** Neon Blue (#00E5FF) for CTAs
- **Service Cards:** Lime Green (#B9FF66)
- **Typography:** Space Grotesk (headings), Inter (body)

### Design Principles
1. **Bold Typography:** Large headings (2.5-4rem) with tight letter-spacing
2. **Generous Whitespace:** 5rem section margins, 2rem grid gaps
3. **Minimalist:** Clean shadows, no heavy borders (except Positivus cards)
4. **Conversion-Focused:** Clear CTAs, prominent phone numbers, trust badges
5. **Mobile-First:** Responsive with clamp() and proper breakpoints

### Positivus Design System (Service Cards)
- Thick black borders (1px sides, 5px bottom)
- 24px rounded corners
- Circular arrow buttons with hover animations
- Real photos (not illustrations)
- Hover effects (lift + shadow)

---

## LLM Optimization Strategy

This site is optimized for AI search engines (Google AI Overview, ChatGPT, Claude, Perplexity):

### Key Tactics
1. **Structured Q&A Format:** FAQ sections with natural questions
2. **Complete Answers:** Specific details (phone, pricing, terms)
3. **Proper HTML Hierarchy:** H1 > H2 > H3 > H4
4. **Schema.org Markup:** Rich snippets for search results
5. **Authority Signals:** License numbers, years of experience, certifications

### Content Requirements
- Minimum 5 FAQs per service page
- Pricing transparency where possible
- Specific response times (e.g., "30-minute response for emergencies")
- Local expertise mentions (e.g., "coastal properties," "shore plumbing")

---

## Key Documentation

| File | Purpose |
|------|---------|
| `PROJECT_STATUS.md` | Detailed session notes and current status |
| `project-config.json` | Business info, SEO strategy, tracking config |
| `SERVICE_PAGES_STRATEGY.md` | Service page planning (if exists) |
| `URL_MIGRATION_STRATEGY.md` | Webflow to Astro migration plan |
| `.claude/PROJECT_STATUS.md` | Claude Code session tracking |

---

## Working with Claude Code

This project is configured for Claude Code AI assistance.

### Key Files for Claude
- `.claude/PROJECT_STATUS.md` - Session tracking
- `project-config.json` - Business context
- `PROJECT_STATUS.md` - Current status

### Agent Architecture Reference

This project can reference agents from the parent `ai-digital-agency` repo:
- **Web Dev Expert** - For development tasks
- **SEO Keyword Specialist** - For local SEO (with geo-specific sub-agents)
- **UI Design Specialist** - For design feedback
- **LLM Optimizer** - For AI search optimization
- **Schema Specialist** - For structured data

**Note:** Agents are NOT stored in this repo. They live in `~/ai-digital-agency/agents/`. This keeps the website repo focused on code and content.

---

## Deployment

### Recommended Platforms
- **Vercel** (recommended for Astro)
- **Netlify**
- **GitHub Pages**

### Deployment Steps

1. **Build the site:**
   ```bash
   npm run build
   ```

2. **Test production build:**
   ```bash
   npm run preview
   ```

3. **Deploy to Vercel (example):**
   ```bash
   npm install -g vercel
   vercel
   ```

4. **Set environment variables** in your hosting platform dashboard

5. **Configure custom domain** (buddsplumbing.com)

---

## Performance Targets

- **LCP (Largest Contentful Paint):** < 2.5s
- **CLS (Cumulative Layout Shift):** < 0.1
- **Lighthouse Score:** >= 90 (all categories)

---

## Contributing

This is a client project. For internal team members:

1. Create a feature branch
2. Make changes
3. Test locally (`npm run dev` and `npm run build`)
4. Submit PR with description

---

## Troubleshooting

### Dev server not starting
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json .astro
npm install
npm run dev
```

### Build errors
```bash
# Check for missing environment variables
cat .env

# Validate all markdown frontmatter
# Ensure all .md files have required fields: title, description, hero
```

### Images not loading
- Check file paths in `/public/assets/budds/`
- Ensure images are referenced correctly in markdown or components
- Use AVIF format for best performance

---

## License

Private client project. All rights reserved.

---

## Contact

For questions about this project, contact the development team or reference the `ai-digital-agency` repo.

**Client Contact:**
- **Business:** Budd's Plumbing, Heating & Cooling
- **Phone:** (609) 465-3759
- **Email:** info@buddsplumbing.com
