# Analytics Tracking Documentation

## Overview

The Etienne Agency website includes comprehensive analytics tracking for:
- **Page views** - Every page visit is tracked with page name and path
- **Button clicks** - All CTA and navigation buttons are tracked
- **Form submissions** - Contact form submissions with metadata
- **Scroll depth** - User engagement measured at 25%, 50%, 75%, and 100% scroll milestones
- **Navigation clicks** - Header, footer, and mobile menu navigation tracking

## Implementation

### Analytics Utility (`client/src/lib/analytics.ts`)

The core analytics module provides functions for tracking various events:

```typescript
// Track page view
trackPageView(pageName: string, path: string)

// Track CTA clicks (for conversion tracking)
trackCTAClick(ctaText: string, ctaLocation: string, ctaType: 'primary' | 'secondary')

// Track button clicks
trackButtonClick(buttonName: string, buttonLocation: string, additionalProps?: object)

// Track form submissions
trackFormSubmit(formName: string, formData?: object)

// Track navigation clicks
trackNavigationClick(linkText: string, linkDestination: string, navigationType: 'header' | 'footer' | 'mobile_menu')

// Track scroll depth
trackScrollDepth(depth: number, pageName: string)
```

### Custom Hooks

**`usePageView(pageName: string)`** - Automatically tracks page views when component mounts

**`useScrollTracking(pageName: string)`** - Automatically tracks scroll depth at 25%, 50%, 75%, and 100%

### Integration Points

All analytics events are sent to:
1. **Umami Analytics** (built-in) - Already configured via environment variables
2. **Google Analytics** (if configured) - Automatically detects `gtag` if present
3. **Custom endpoint** (optional) - Can be configured to send to your own backend

## Tracked Events

### Page Views
- Homepage
- How It Works
- Industries
- About
- Contact

### CTA Clicks
- "See How It Works" (Hero Section)
- "Watch 2-Minute Demo" (Hero Section)
- "Schedule a Call" (Header, Mobile Menu, all page CTAs)
- All industry cards
- All section CTAs

### Form Events
- Discovery Call Form submission
- Form includes metadata: industry, location count, whether challenge field was filled

### Navigation Events
- Header navigation (desktop)
- Mobile menu navigation
- Footer navigation (if implemented)
- All internal links tracked with source location

### Scroll Depth
- Tracked at 25%, 50%, 75%, and 100% scroll depth
- Helps measure content engagement
- Only fires once per milestone per page visit

## Viewing Analytics Data

### Umami Dashboard
The site is already configured with Umami analytics. Access your dashboard at:
- URL: `VITE_ANALYTICS_ENDPOINT` environment variable
- Website ID: `VITE_ANALYTICS_WEBSITE_ID` environment variable

### Google Analytics (Optional Setup)
To add Google Analytics:

1. Add Google Analytics script to `client/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

2. Events will automatically be sent to GA via the `trackEvent` function

### Custom Backend (Optional Setup)
To send events to your own backend, uncomment the fetch call in `client/src/lib/analytics.ts`:

```typescript
fetch('/api/analytics', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    event: eventName, 
    properties, 
    timestamp: Date.now() 
  })
}).catch(console.error);
```

## Key Metrics to Monitor

### Conversion Funnel
1. Homepage views
2. "See How It Works" CTA clicks
3. Contact page views
4. Form submissions

### Engagement Metrics
- Average scroll depth per page
- Time on page (via Umami)
- Navigation patterns (which pages users visit)

### CTA Performance
- Click-through rate on primary CTAs
- Comparison of hero CTAs vs. section CTAs
- Mobile menu CTA performance vs. header CTA

### Form Insights
- Form submission rate
- Most common industries
- Most common location counts
- Percentage of users filling optional challenge field

## Development Mode

In development mode (`NODE_ENV=development`), all analytics events are logged to the browser console for debugging:

```
[Analytics] page_view { page_name: 'Homepage', page_path: '/', timestamp: 1234567890 }
[Analytics] cta_click { cta_text: 'Schedule a Call', cta_location: 'Header', cta_type: 'primary' }
```

## Privacy Considerations

- No personally identifiable information (PII) is tracked
- Form submissions only track metadata (industry, location count), not actual form content
- Umami is privacy-focused and GDPR-compliant
- All tracking is client-side and transparent

## Future Enhancements

Consider adding:
- A/B testing for CTA copy and placement
- Heatmap tracking for click patterns
- Session replay for UX insights
- Conversion attribution (which source drove the form submission)
- Industry-specific conversion rates
