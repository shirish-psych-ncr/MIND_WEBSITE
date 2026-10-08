# Cloudflare Zaraz Tracking Implementation Guide

## Overview

This guide explains how to use the Zaraz event tracking system implemented for the Mind Grace Neuropsychiatric Clinic website.

## Files Added

- `/assets/js/zaraz-tracking.js` - Main tracking script that automatically tracks user interactions

## Tracked Events

The following events are automatically tracked when users interact with your website:

### 1. Page Views
**Event Name:** `page_view`

**Properties:**
- `page_title` - Document title
- `page_path` - URL path (e.g., `/book.html`)
- `page_url` - Full URL
- `referrer` - Traffic source
- `timestamp` - ISO 8601 timestamp

### 2. Booking Flow
**Event Name:** `booking_started`

**Triggered when:** User clicks any booking button

**Properties:**
- `event_category`: "booking"
- `event_action`: "booking_started"
- `button_id` - ID of clicked button
- `button_class` - CSS classes of button
- `page_path` - Current page
- `timestamp` - ISO 8601 timestamp

**Event Name:** `booking_form_opened`

**Triggered when:** Booking form iframe becomes visible

**Properties:**
- `event_category`: "booking"
- `page_path` - Current page
- `timestamp` - ISO 8601 timestamp

### 3. Emergency Resources
**Event Name:** `emergency_resource_accessed`

**Triggered when:** User clicks emergency banner or emergency page links

**Properties:**
- `event_category`: "emergency"
- `link_href` - Destination URL
- `link_text` - Link text content
- `page_path` - Current page
- `timestamp` - ISO 8601 timestamp

### 4. Self-Help Tools
**Event Name:** `tool_accessed`

**Triggered when:** User clicks link to a self-help tool

**Properties:**
- `event_category`: "self_help_tool"
- `tool_name` - Name of tool (e.g., "butterfly-tapper")
- `link_href` - Tool URL
- `page_path` - Current page
- `timestamp` - ISO 8601 timestamp

**Event Name:** `tool_session_started`

**Triggered when:** User starts a tool session

**Properties:**
- `event_category`: "self_help_tool"
- `tool_name` - Name of tool
- `timestamp` - ISO 8601 timestamp

### 5. Contact Actions
**Event Name:** `contact_initiated`

**Triggered when:** User clicks phone, email, or WhatsApp links

**Properties:**
- `event_category`: "contact"
- `contact_type` - "phone", "email", or "whatsapp"
- `contact_value` - The actual contact URL/href
- `page_path` - Current page
- `timestamp` - ISO 8601 timestamp

### 6. Call-to-Action Clicks
**Event Name:** `cta_clicked`

**Triggered when:** User clicks primary CTA buttons

**Properties:**
- `event_category`: "engagement"
- `cta_text` - Button text
- `cta_class` - CSS classes
- `page_path` - Current page
- `timestamp` - ISO 8601 timestamp

### 7. Navigation
**Event Name:** `navigation_click`

**Triggered when:** User clicks internal navigation links

**Properties:**
- `event_category`: "navigation"
- `destination` - Target URL
- `link_text` - Link text
- `current_page` - Current page path
- `timestamp` - ISO 8601 timestamp

### 8. Form Interactions
**Event Name:** `form_field_focused`

**Triggered when:** User focuses on a form field

**Properties:**
- `event_category`: "form_interaction"
- `form_id` - Form ID
- `field_name` - Field name attribute
- `field_type` - Input type
- `page_path` - Current page
- `timestamp` - ISO 8601 timestamp

**Event Name:** `form_submitted`

**Triggered when:** User submits a form

**Properties:**
- `event_category`: "form_interaction"
- `form_id` - Form ID
- `page_path` - Current page
- `timestamp` - ISO 8601 timestamp

## Zaraz Dashboard Configuration

### Step 1: Create Triggers

For each event type you want to track, create a trigger in your Zaraz dashboard:

1. Go to **Zaraz Dashboard** → **Triggers** → **Create Trigger**
2. Configure as follows:

**Example: Booking Started Trigger**
```
Trigger Name: booking_started_trigger
Rule Type: Match rule
Variable Name: Event Name
Match Operation: Equals
Match String: booking_started
```

**Example: Page View Trigger**
```
Trigger Name: page_view_trigger
Rule Type: Match rule
Variable Name: Event Name
Match Operation: Equals
Match String: page_view
```

Repeat for each event type you want to use.

### Step 2: Create Actions

For each tool/integration you want to send data to:

1. Go to your **Tool** configuration in Zaraz
2. Add an **Action**
3. Select the appropriate trigger from Step 1
4. Map event properties using the syntax: `{{ client.property_name }}`

**Example Action Configuration:**
```
Trigger: booking_started_trigger
Field: event_name
Value: {{ client.event_action }}

Field: category
Value: {{ client.event_category }}

Field: page
Value: {{ client.page_path }}

Field: timestamp
Value: {{ client.timestamp }}
```

### Step 3: Access Event Properties

In your action fields, use these placeholders to access event data:

- `{{ client.event_category }}` - Event category
- `{{ client.event_action }}` - Specific action
- `{{ client.page_path }}` - Page where event occurred
- `{{ client.page_title }}` - Page title
- `{{ client.timestamp }}` - Event timestamp
- `{{ client.tool_name }}` - Name of tool (for tool events)
- `{{ client.contact_type }}` - Contact method (for contact events)
- `{{ client.cta_text }}` - Button text (for CTA events)

For property names with special characters or numbers, use backticks:
```
{{ client.`property-name` }}
```

## Pages Already Configured

The Zaraz tracking script has been added to:

- ✅ `/index.html` - Home page
- ✅ `/book.html` - Appointment booking page
- ✅ `/tools/butterfly-tapper.html`
- ✅ `/tools/eye-movement.html`
- ✅ `/tools/guided-breathing.html`
- ✅ `/tools/horizon-scan.html`
- ✅ `/tools/hypnos-fractal.html`
- ✅ `/tools/leaf-on-stream.html`

## Adding to Additional Pages

To add tracking to other pages, insert this line before the closing `</head>` tag:

```html
<!-- Cloudflare Zaraz Tracking -->
<script defer src="/assets/js/zaraz-tracking.js"></script>
```

## Debugging

### Enable Debug Mode

1. In Zaraz Dashboard, enable **Debug Mode**
2. Open your browser's Developer Console (F12)
3. Look for tracking events in the console

### Console Messages

The tracking script logs initialization:
```
Zaraz tracking initialized for Mind Grace Clinic
```

If Zaraz is not available, you'll see:
```
Zaraz not available after waiting. Tracking events will be queued.
```

### Testing Events

Open browser console and manually trigger events:
```javascript
zaraz.track('test_event', { test_property: 'test_value' });
```

## Best Practices

1. **Meaningful Names**: Use descriptive event names that match your analytics goals
2. **Consistent Properties**: Use consistent property names across similar events
3. **Privacy**: Don't track sensitive personal information (PII)
4. **Performance**: Optional features like scroll tracking are disabled by default
5. **Testing**: Test thoroughly in debug mode before relying on data

## Troubleshooting

### Events Not Showing Up

1. Verify Zaraz is enabled on your domain
2. Check that the script is loaded: Open DevTools → Network tab → Filter by "zaraz-tracking.js"
3. Ensure triggers match event names exactly (case-sensitive)
4. Check browser console for errors

### Properties Not Available in Actions

1. Verify property names match exactly (including case)
2. Use backticks for special characters: `{{ client.\`key-name\` }}`
3. Check that the event actually sends the property

### Script Loading Issues

1. Verify the file exists at `/assets/js/zaraz-tracking.js`
2. Check for CORS issues if serving from different domain
3. Ensure no CSP (Content Security Policy) blocks the script

## Support

For Zaraz-specific questions, refer to:
- [Cloudflare Zaraz Documentation](https://developers.cloudflare.com/zaraz/)
- [Zaraz Track API Reference](https://developers.cloudflare.com/zaraz/web-api/track/)

For implementation issues, check:
- Browser console for JavaScript errors
- Zaraz dashboard debug mode
- Network tab for failed requests
