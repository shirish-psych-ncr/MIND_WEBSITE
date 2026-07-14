# Contributing to Mind Grace Neuropsychiatric Clinic Website

Thank you for your interest in contributing to the Mind Grace Clinic website project! This document provides guidelines and instructions for developers who want to contribute to this repository.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Adding Content](#adding-content)
- [Testing Requirements](#testing-requirements)
- [Git Workflow](#git-workflow)
- [Documentation](#documentation)
- [Questions?](#questions)

## Code of Conduct

This project is dedicated to providing mental health resources and information. All contributors must:
- Maintain a respectful and professional tone
- Ensure accessibility and inclusivity
- Prioritize user privacy and security
- Follow medical accuracy guidelines for health-related content

## Getting Started

### Prerequisites

- Git installed on your system
- A code editor (VS Code recommended)
- Modern web browser with developer tools
- Python 3.x (for automation scripts)
- Node.js 18+ (optional, for image processing)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/mind-grace-clinic.git
   cd mind-grace-clinic
   ```
3. Add the upstream remote:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/mind-grace-clinic.git
   ```

## Development Setup

### Local Server

Since this is a static website, you can use any local HTTP server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using PHP
php -S localhost:8000
```

Visit `http://localhost:8000` in your browser.

### Browser Extensions Recommended

- Lighthouse (performance auditing)
- axe DevTools (accessibility testing)
- WAVE Evaluation Tool (accessibility)
- JSON-LD Schema Validator

## Project Structure

```
/workspace/
├── *.html                 # Root level pages (25 files)
├── blog/                  # Blog section
│   ├── index.html        # Blog listing
│   ├── adult.html        # Adult category
│   ├── children.html     # Children category
│   └── pages/            # Individual blog posts
├── tools/                 # Therapeutic tools (6 files)
├── assets/
│   ├── css/              # Stylesheets
│   ├── js/               # JavaScript modules
│   ├── vendor/           # Third-party libraries
│   ├── images/           # WebP images
│   └── fonts/            # Web fonts
└── docs/                 # Documentation
```

### Key Files

- `index.html` - Homepage
- `PHASE_4_5_EXECUTION_PLAN.md` - Current project roadmap
- `PROJECT_SUMMARY.md` - Complete project overview
- `MAINTENANCE_GUIDE.md` - Ongoing maintenance procedures
- `CONTRIBUTING.md` - This file

## Coding Standards

### HTML

1. **Semantic Markup**: Use appropriate HTML5 elements
   ```html
   <!-- Good -->
   <header>
     <nav role="navigation" aria-label="Main navigation">
       <ul>
         <li><a href="/about.html">About</a></li>
       </ul>
     </nav>
   </header>
   <main id="main-content">
     <article>
       <h1>Page Title</h1>
     </article>
   </main>
   <footer role="contentinfo">
   ```

2. **Accessibility**: Always include ARIA attributes where needed
   ```html
   <button aria-expanded="false" aria-controls="menu-content">
     Menu
   </button>
   ```

3. **Meta Tags**: Every page must have complete metadata
   ```html
   <meta name="description" content="...">
   <link rel="canonical" href="https://mindgracencr.in/page.html">
   
   <!-- OpenGraph -->
   <meta property="og:title" content="...">
   <meta property="og:description" content="...">
   <meta property="og:image" content="...">
   <meta property="og:url" content="...">
   <meta property="og:type" content="website">
   
   <!-- Twitter Card -->
   <meta name="twitter:card" content="summary_large_image">
   ```

4. **Performance**: 
   - Add `loading="lazy"` to below-fold images
   - Use `fetchpriority="high"` for LCP images
   - Include explicit `width` and `height` attributes

### CSS

1. **Methodology**: Use BEM-like naming conventions
   ```css
   /* Good */
   .card { }
   .card__header { }
   .card__title { }
   .card--featured { }
   .card__button:hover { }
   ```

2. **Custom Properties**: Use CSS variables for theming
   ```css
   :root {
     --color-primary: #2563eb;
     --color-secondary: #7c3aed;
     --spacing-unit: 1rem;
   }
   
   .button {
     background-color: var(--color-primary);
     padding: calc(var(--spacing-unit) * 2);
   }
   ```

3. **Responsive Design**: Mobile-first approach
   ```css
   .container {
     padding: 1rem;
   }
   
   @media (min-width: 768px) {
     .container {
       padding: 2rem;
       max-width: 1200px;
       margin: 0 auto;
     }
   }
   ```

4. **Performance**:
   - Avoid universal selectors (`*`)
   - Minimize specificity
   - Use `will-change` sparingly

### JavaScript

1. **Modules**: Use ES6 modules exclusively
   ```javascript
   // main.js
   import { initComponents } from './components/init.js';
   import { utils } from './utils/helpers.js';
   
   export function init() {
     initComponents();
   }
   ```

2. **No Frameworks**: Vanilla JS only (no React, Vue, Angular)
   ```javascript
   // Good - Vanilla JS
   const button = document.querySelector('.btn');
   button.addEventListener('click', handleClick);
   
   // Bad - No frameworks allowed
   ```

3. **Error Handling**: Always handle errors gracefully
   ```javascript
   async function fetchData(url) {
     try {
       const response = await fetch(url);
       if (!response.ok) throw new Error('Network error');
       return await response.json();
     } catch (error) {
       console.error('Fetch failed:', error);
       showErrorMessage('Failed to load data');
       return null;
     }
   }
   ```

4. **Performance**:
   - Debounce scroll/resize events
   - Use requestAnimationFrame for animations
   - Lazy load non-critical functionality

## Adding Content

### How to Add a New Blog Post

1. Create a new HTML file in `blog/pages/`:
   ```bash
   cp blog/pages/template.html blog/pages/my-new-post.html
   ```

2. Update the metadata:
   ```html
   <title>Your Post Title | Mind Grace Clinic</title>
   <meta name="description" content="Post description...">
   <link rel="canonical" href="https://mindgracencr.in/blog/pages/my-new-post.html">
   ```

3. Add structured data:
   ```html
   <script type="application/ld+json">
   {
     "@context": "https://schema.org",
     "@type": "BlogPosting",
     "headline": "Your Post Title",
     "datePublished": "2024-12-07",
     "author": {
       "@type": "Physician",
       "name": "Dr. Anita Sharma"
     }
   }
   </script>
   ```

4. Add OpenGraph tags (copy from template)

5. Update category pages (`adult.html` or `children.html`) to link to new post

6. Test with Lighthouse and accessibility tools

### How to Add a Doctor Profile

1. Create new HTML file:
   ```bash
   cp dr-anita-sharma.html dr-new-doctor.html
   ```

2. Update all personal information:
   - Name, title, specialty
   - Photo (convert to WebP first)
   - Credentials, experience
   - Contact information

3. Update structured data:
   ```json
   {
     "@type": "Physician",
     "name": "Dr. New Doctor",
     "jobTitle": "Psychiatrist",
     "medicalSpecialty": "..."
   }
   ```

4. Update `doctors.html` to include new profile link

5. Add photo to `assets/images/` as WebP

### How to Add a New Page

1. Copy existing page as template:
   ```bash
   cp about.html new-page.html
   ```

2. Update `<head>` section:
   - Title
   - Description
   - Canonical URL
   - OG tags
   - Structured data

3. Replace `<main>` content

4. Update navigation in header/footer to include new page

5. Add to sitemap.xml

### Image Optimization Workflow

1. Convert images to WebP before adding:
   ```bash
   # Using Python script
   python scripts/convert-to-webp.py path/to/image.jpg
   
   # Or using Node.js Sharp
   npx sharp input.jpg -o output.webp
   ```

2. Optimize dimensions (max 1920px width for photos)

3. Add to `assets/images/`

4. Update HTML with proper attributes:
   ```html
   <img 
     src="assets/images/photo.webp" 
     alt="Descriptive alt text"
     width="800"
     height="600"
     loading="lazy"
   >
   ```

## Testing Requirements

Before submitting any changes, ensure:

### Functional Testing
- [ ] All links work (no 404 errors)
- [ ] Forms submit correctly
- [ ] Interactive features work (tools, carousels, etc.)
- [ ] Navigation functions properly

### Responsive Testing
- [ ] Mobile view (320px - 767px)
- [ ] Tablet view (768px - 1023px)
- [ ] Desktop view (1024px+)
- [ ] Large desktop (1440px+)

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Accessibility Testing
- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast ratios > 4.5:1
- [ ] All images have alt text
- [ ] Skip links functional
- [ ] Focus states visible

### Performance Testing
- [ ] Lighthouse score > 90
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] INP < 200ms
- [ ] No console errors

### SEO Testing
- [ ] Meta descriptions present
- [ ] Canonical URLs correct
- [ ] Structured data valid (use Google Rich Results Test)
- [ ] OpenGraph tags complete
- [ ] Sitemap updated

## Git Workflow

### Branch Naming

Use descriptive branch names:
```
feature/add-new-blog-post
fix/broken-contact-form
docs/update-maintenance-guide
optimize/compress-images
```

### Commit Messages

Follow conventional commits format:
```
feat: add new therapeutic tool (horizon-scan)
fix: resolve image lazy loading issue on mobile
docs: update CONTRIBUTING.md with testing checklist
style: format CSS according to BEM methodology
refactor: simplify navigation component
perf: optimize hero images with srcset
test: add accessibility tests for forms
chore: update vendor library versions
```

### Pull Request Process

1. **Update your fork**:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make changes and commit**:
   ```bash
   git add .
   git commit -m "feat: description of changes"
   ```

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**:
   - Go to GitHub repository
   - Click "New Pull Request"
   - Select your branch
   - Fill out PR template with:
     - Description of changes
     - Testing performed
     - Screenshots (if applicable)
     - Checklist completion

6. **Code Review**:
   - Respond to reviewer comments
   - Make requested changes
   - Re-request review when ready

7. **Merge**:
   - Once approved, maintainer will merge
   - Delete feature branch after merge

## Documentation

### Updating Documentation

When making changes, update relevant documentation:

- **Feature additions**: Update `PROJECT_SUMMARY.md`
- **Bug fixes**: Add to `CHANGELOG.md`
- **Process changes**: Update `MAINTENANCE_GUIDE.md`
- **Testing procedures**: Update `TESTING_CHECKLIST.md`
- **Security updates**: Update `SECURITY_HARDENING.md`

### Documentation Standards

- Use clear, concise language
- Include code examples where helpful
- Keep formatting consistent (Markdown)
- Update table of contents if adding sections
- Add "Last Updated" date

## Questions?

If you have questions about contributing:

1. Check existing documentation:
   - `README.md` - Project overview
   - `PROJECT_SUMMARY.md` - Complete project details
   - `MAINTENANCE_GUIDE.md` - Maintenance procedures
   - `PHASE_4_5_EXECUTION_PLAN.md` - Current roadmap

2. Review past pull requests for examples

3. Contact the maintainers (see `MAINTENANCE_GUIDE.md` for contact info)

4. For security issues, follow the process in `SECURITY_HARDENING.md`

## Thank You!

Your contributions help make mental health resources more accessible. We appreciate your time and effort in improving this project!

---

*Last Updated: December 2024*
*Version: 2.0.0*
