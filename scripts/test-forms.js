#!/usr/bin/env node

/**
 * Form Testing Script
 * Tests form validation and functionality
 * Usage: node scripts/test-forms.js
 */

const fs = require('fs');
const path = require('path');

console.log('📋 Starting form validation tests...\n');

const testResults = {
  passed: 0,
  failed: 0,
  tests: []
};

/**
 * Test result logger
 */
function logTest(name, passed, message = '') {
  const status = passed ? '✅' : '❌';
  console.log(`${status} ${name}`);
  if (message) {
    console.log(`   ${message}`);
  }
  
  testResults.tests.push({ name, passed, message });
  if (passed) {
    testResults.passed++;
  } else {
    testResults.failed++;
  }
}

/**
 * Check if file contains required validation
 */
function checkFileForValidation(filePath, validations) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const results = {};
    
    for (const [key, pattern] of Object.entries(validations)) {
      results[key] = pattern.test(content);
    }
    
    return results;
  } catch (error) {
    return null;
  }
}

/**
 * Test email validation
 */
function testEmailValidation() {
  console.log('Testing Email Validation...');
  
  const emailValidationPattern = /email.*validation|validate.*email|emailRegex|email.*pattern/i;
  const requiredFieldPattern = /required|aria-required/i;
  
  // Check validation utility
  const validationFile = path.join(process.cwd(), 'src/lib/validation.ts');
  const validationContent = checkFileForValidation(validationFile, {
    emailValidation: emailValidationPattern
  });
  
  if (validationContent && validationContent.emailValidation) {
    logTest('Email validation utility exists', true);
  } else {
    logTest('Email validation utility exists', false, 'No email validation found in src/lib/validation.ts');
  }
  
  // Check form components
  const formFiles = [
    'src/components/forms/EmailCaptureForm.tsx',
    'src/components/forms/ContactForm.tsx',
    'src/components/forms/BookingRequestForm.tsx'
  ];
  
  formFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const hasValidation = emailValidationPattern.test(content) || requiredFieldPattern.test(content);
      logTest(`${path.basename(file)} has validation`, hasValidation);
    }
  });
}

/**
 * Test form accessibility
 */
function testFormAccessibility() {
  console.log('\nTesting Form Accessibility...');
  
  const accessibilityPatterns = {
    ariaLabel: /aria-label/i,
    ariaRequired: /aria-required/i,
    ariaInvalid: /aria-invalid/i,
    ariaDescribedby: /aria-describedby/i,
    htmlFor: /htmlFor|for=/i
  };
  
  const formFiles = [
    'src/components/forms/EmailCaptureForm.tsx',
    'src/components/forms/ContactForm.tsx',
    'src/components/forms/BookingRequestForm.tsx',
    'src/components/forms/ValidatedForm.tsx'
  ];
  
  formFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      const results = checkFileForValidation(filePath, accessibilityPatterns);
      if (results) {
        const hasAccessibility = Object.values(results).some(v => v);
        logTest(`${path.basename(file)} has accessibility attributes`, hasAccessibility);
      }
    }
  });
}

/**
 * Test error handling
 */
function testErrorHandling() {
  console.log('\nTesting Error Handling...');
  
  const errorPatterns = {
    errorState: /error|Error/,
    errorMessage: /errorMessage|error.*message/i,
    tryBlock: /try\s*{/,
    catchBlock: /catch\s*\(/
  };
  
  const formFiles = [
    'src/components/forms/EmailCaptureForm.tsx',
    'src/components/forms/ContactForm.tsx',
    'src/components/forms/BookingRequestForm.tsx'
  ];
  
  formFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      const results = checkFileForValidation(filePath, errorPatterns);
      if (results) {
        const hasErrorHandling = results.errorState && (results.tryBlock || results.catchBlock);
        logTest(`${path.basename(file)} has error handling`, hasErrorHandling);
      }
    }
  });
}

/**
 * Test Netlify Forms configuration
 */
function testNetlifyForms() {
  console.log('\nTesting Netlify Forms Configuration...');
  
  const formFiles = [
    'src/components/forms/ContactForm.tsx',
    'src/components/forms/BookingRequestForm.tsx'
  ];
  
  formFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const hasNetlifyAttr = /data-netlify|netlify/i.test(content);
      const hasHoneypot = /honeypot|bot-field/i.test(content);
      
      logTest(`${path.basename(file)} has Netlify form attribute`, hasNetlifyAttr);
      logTest(`${path.basename(file)} has honeypot protection`, hasHoneypot);
    }
  });
}

/**
 * Test form validation logic
 */
function testValidationLogic() {
  console.log('\nTesting Validation Logic...');
  
  const validationFile = path.join(process.cwd(), 'src/lib/validation.ts');
  
  if (fs.existsSync(validationFile)) {
    const content = fs.readFileSync(validationFile, 'utf8');
    
    const validations = {
      'Email validation function': /validateEmail|isValidEmail/i,
      'Phone validation function': /validatePhone|isValidPhone/i,
      'Required field validation': /validateRequired|isRequired/i,
      'URL validation function': /validateUrl|isValidUrl/i
    };
    
    for (const [name, pattern] of Object.entries(validations)) {
      const exists = pattern.test(content);
      logTest(name, exists);
    }
  } else {
    logTest('Validation utility file exists', false, 'src/lib/validation.ts not found');
  }
}

/**
 * Test API route validation
 */
function testAPIValidation() {
  console.log('\nTesting API Route Validation...');
  
  const apiRoutes = [
    'app/api/subscribe/route.ts',
    'app/api/videos/route.ts'
  ];
  
  apiRoutes.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const hasValidation = /validate|validation|check|verify/i.test(content);
      const hasErrorHandling = /try\s*{/.test(content) && /catch\s*\(/.test(content);
      
      logTest(`${path.basename(file, '.ts')} has input validation`, hasValidation);
      logTest(`${path.basename(file, '.ts')} has error handling`, hasErrorHandling);
    }
  });
}

/**
 * Main execution
 */
function main() {
  testEmailValidation();
  testFormAccessibility();
  testErrorHandling();
  testNetlifyForms();
  testValidationLogic();
  testAPIValidation();
  
  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 FORM TESTING RESULTS');
  console.log('='.repeat(60) + '\n');
  
  console.log(`✅ Tests passed: ${testResults.passed}`);
  console.log(`❌ Tests failed: ${testResults.failed}`);
  console.log(`📝 Total tests: ${testResults.tests.length}\n`);
  
  if (testResults.failed > 0) {
    console.log('⚠️  Some form validation tests failed. Review the results above.\n');
    process.exit(1);
  } else {
    console.log('✨ All form validation tests passed!\n');
    process.exit(0);
  }
}

main();
