const fs = require('fs');
const path = require('path');

// Simple HTML parser for basic accessibility checks
function checkAccessibility(htmlFile) {
  const html = fs.readFileSync(htmlFile, 'utf8');
  const issues = [];
  const fileName = path.basename(htmlFile);

  // Check for lang attribute
  if (!html.includes('<html') || !html.match(/<html[^>]*lang=/i)) {
    issues.push({
      id: 'html-lang',
      impact: 'serious',
      description: '<html> element must have a lang attribute',
      node: '<html>'
    });
  }

  // Check for title
  if (!html.includes('<title>') || !html.match(/<title>[^<]+<\/title>/i)) {
    issues.push({
      id: 'document-title',
      impact: 'serious',
      description: 'Document must have a <title> element',
      node: '<head>'
    });
  }

  // Check for images without alt
  const imgTags = html.match(/<img[^>]*>/gi) || [];
  imgTags.forEach((img, index) => {
    if (!img.includes('alt=')) {
      issues.push({
        id: 'image-alt',
        impact: 'critical',
        description: `Image ${index + 1} must have an alt attribute`,
        node: img.substring(0, 50) + '...'
      });
    }
  });

  // Check for form labels
  const inputTags = html.match(/<input[^>]*>/gi) || [];
  inputTags.forEach((input, index) => {
    const typeMatch = input.match(/type=["']([^"']+)["']/i);
    const type = typeMatch ? typeMatch[1].toLowerCase() : 'text';
    const hasId = input.match(/id=["']([^"']+)["']/i);
    const hasAriaLabel = input.includes('aria-label') || input.includes('aria-labelledby');
    
    if (!['hidden', 'submit', 'button'].includes(type) && !hasId && !hasAriaLabel) {
      issues.push({
        id: 'form-label',
        impact: 'critical',
        description: `Form input ${index + 1} (${type}) should have associated label`,
        node: input.substring(0, 50) + '...'
      });
    }
  });

  // Check for button type
  const buttonTags = html.match(/<button[^>]*>/gi) || [];
  buttonTags.forEach((button, index) => {
    if (!button.includes('type=')) {
      issues.push({
        id: 'button-type',
        impact: 'minor',
        description: `Button ${index + 1} should have explicit type attribute`,
        node: button.substring(0, 50) + '...'
      });
    }
  });

  // Check for skip links
  const hasSkipLink = html.match(/href\s*=\s*["']#(main|content)/i) !== null;
  if (!hasSkipLink) {
    issues.push({
      id: 'skip-link',
      impact: 'moderate',
      description: 'Page should have a skip link for keyboard users',
      node: '<body>'
    });
  }

  // Check for heading hierarchy
  const headings = html.match(/<h[1-6][^>]*>/gi) || [];
  if (headings.length === 0) {
    issues.push({
      id: 'heading-missing',
      impact: 'moderate',
      description: 'Page should have at least one heading',
      node: '<body>'
    });
  }

  // Check for viewport meta
  if (!html.includes('viewport')) {
    issues.push({
      id: 'viewport-meta',
      impact: 'serious',
      description: 'Page should have a viewport meta tag for responsive design',
      node: '<head>'
    });
  }

  return {
    url: fileName,
    issues
  };
}

// Main execution
const htmlFiles = [
  'index.html',
  'about.html',
  'conditions.html',
  'doctors.html',
  'contact.html',
  'book.html',
  'consent.html',
  'disclaimer.html',
  'approach.html',
  'aasha.html',
  '404.html'
];

console.log('=== Accessibility Audit Report ===\n');

let totalIssues = 0;
let criticalIssues = 0;
let seriousIssues = 0;
let moderateIssues = 0;
let minorIssues = 0;

htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const result = checkAccessibility(file);
    if (result.issues.length > 0) {
      console.log(`\n📄 ${file}:`);
      result.issues.forEach(issue => {
        console.log(`  [${issue.impact.toUpperCase()}] ${issue.id}: ${issue.description}`);
        totalIssues++;
        if (issue.impact === 'critical') criticalIssues++;
        else if (issue.impact === 'serious') seriousIssues++;
        else if (issue.impact === 'moderate') moderateIssues++;
        else if (issue.impact === 'minor') minorIssues++;
      });
    } else {
      console.log(`\n✅ ${file}: No issues found`);
    }
  } else {
    console.log(`\n⚠️  ${file}: File not found`);
  }
});

console.log('\n\n=== Summary ===');
console.log(`Total Issues: ${totalIssues}`);
console.log(`  Critical: ${criticalIssues}`);
console.log(`  Serious: ${seriousIssues}`);
console.log(`  Moderate: ${moderateIssues}`);
console.log(`  Minor: ${minorIssues}`);

if (totalIssues === 0) {
  console.log('\n🎉 All accessibility checks passed!');
  process.exit(0);
} else {
  console.log('\n⚠️  Accessibility issues detected. Please review and fix.');
  process.exit(1);
}
