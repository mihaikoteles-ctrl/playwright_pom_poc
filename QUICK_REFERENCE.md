# Quick Reference Guide

## 🎯 Common Patterns & Snippets

### Creating a New Page Object

```typescript
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class YourPage extends BasePage {
  // Define locators
  readonly element: Locator;
  
  constructor(page: Page) {
    super(page);
    this.element = page.locator('selector');
  }
  
  // Add methods
  async performAction() {
    await this.click(this.element);
  }
  
  async verifyState() {
    await expect(this.element).toBeVisible();
  }
}
```

### Adding Page to PageManager

```typescript
// In PageManager.ts
private _yourPage?: YourPage;

get yourPage(): YourPage {
  if (!this._yourPage) {
    this._yourPage = new YourPage(this.page);
  }
  return this._yourPage;
}

async navigateToYourPage(): Promise<YourPage> {
  await this.yourPage.navigate();
  return this.yourPage;
}
```

### Writing a Test

```typescript
import { test, expect } from '../fixtures/pageFixture';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ pageManager }) => {
    // Setup
  });
  
  test('should do something', async ({ pageManager }) => {
    // Arrange
    const data = { key: 'value' };
    
    // Act
    await pageManager.yourPage.performAction();
    
    // Assert
    await pageManager.yourPage.verifyState();
  });
});
```

## 📋 Locator Strategies

### Priority Order

```typescript
// 1. Role (Best for accessibility)
page.getByRole('button', { name: 'Submit' })

// 2. Label (Forms)
page.getByLabel('Email')

// 3. Placeholder
page.getByPlaceholder('Enter your name')

// 4. Text
page.getByText('Click here')

// 5. Test ID (Last resort)
page.getByTestId('submit-button')
```

### Common Locators

```typescript
// ID
page.locator('#elementId')

// Class
page.locator('.className')

// CSS Selector
page.locator('button[type="submit"]')

// XPath
page.locator('//button[@type="submit"]')

// Text content
page.locator('text=Submit')

// Combining
page.locator('button:has-text("Submit")')
```

## 🎬 Common Actions

### Navigation
```typescript
await this.goto('/path');
await this.waitForPageLoad();
await this.reload();
await this.goBack();
await this.goForward();
```

### Interactions
```typescript
await this.click(locator);
await this.fill(locator, 'text');
await this.type(locator, 'text', 100); // with delay
await this.selectOption(locator, 'value');
await this.check(locator);
await this.uncheck(locator);
await this.hover(locator);
```

### Waits
```typescript
await this.waitForVisible(locator);
await this.waitForHidden(locator);
await locator.waitFor({ state: 'visible' });
await page.waitForLoadState('networkidle');
await page.waitForURL('**/dashboard');
```

### Assertions
```typescript
await expect(locator).toBeVisible();
await expect(locator).toBeHidden();
await expect(locator).toBeEnabled();
await expect(locator).toBeDisabled();
await expect(locator).toHaveText('text');
await expect(locator).toContainText('text');
await expect(locator).toHaveValue('value');
await expect(page).toHaveURL('url');
await expect(page).toHaveTitle('title');
```

## 🔍 Debugging Tips

### Debug Single Test
```bash
npx playwright test login.spec.ts --debug
```

### Show Browser
```bash
npx playwright test --headed
```

### Slow Down
```bash
npx playwright test --headed --slow-mo=1000
```

### Trace Viewer
```bash
npx playwright test --trace on
npx playwright show-trace trace.zip
```

### Console Logs
```typescript
console.log(await locator.textContent());
await page.pause(); // Pause execution
```

## 🧪 Test Organization

### Test Structure
```typescript
test.describe('Feature', () => {
  test.describe.configure({ mode: 'parallel' });
  
  test.beforeAll(async ({ browser }) => {
    // Runs once before all tests
  });
  
  test.beforeEach(async ({ page }) => {
    // Runs before each test
  });
  
  test('test name', async ({ pageManager }) => {
    // Test body
  });
  
  test.afterEach(async ({ page }) => {
    // Runs after each test
  });
  
  test.afterAll(async ({ browser }) => {
    // Runs once after all tests
  });
});
```

### Test Tags
```typescript
test('login @smoke @critical', async ({ pageManager }) => {
  // Test
});

// Run: npx playwright test --grep @smoke
```

### Skip/Only
```typescript
test.skip('not ready', async ({ pageManager }) => {});
test.only('run only this', async ({ pageManager }) => {});
test.fixme('known issue', async ({ pageManager }) => {});
```

## 📦 Data-Driven Testing

### Array of Test Cases
```typescript
const testCases = [
  { input: 'test1', expected: 'result1' },
  { input: 'test2', expected: 'result2' },
];

testCases.forEach(({ input, expected }) => {
  test(`should handle ${input}`, async ({ pageManager }) => {
    // Test
  });
});
```

### Using Test Data
```typescript
import { loginTestData } from '../data/testData';

test('login test', async ({ pageManager }) => {
  await pageManager.loginPage.login(
    loginTestData.validUser.username,
    loginTestData.validUser.password
  );
});
```

## 🔐 Authentication

### Save Auth State
```typescript
test('save auth', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#username', 'user');
  await page.fill('#password', 'pass');
  await page.click('button[type="submit"]');
  
  await page.context().storageState({ 
    path: 'auth.json' 
  });
});
```

### Reuse Auth State
```typescript
// In playwright.config.ts
use: {
  storageState: 'auth.json',
}
```

## 📸 Screenshots & Videos

### Screenshot
```typescript
await page.screenshot({ path: 'screenshot.png' });
await page.screenshot({ path: 'full.png', fullPage: true });
```

### Video
```typescript
// In playwright.config.ts
use: {
  video: 'on', // 'off' | 'on' | 'retain-on-failure'
}
```

## 🌐 Multiple Contexts

### Multiple Pages
```typescript
const page1 = await context.newPage();
const page2 = await context.newPage();
```

### Multiple Contexts
```typescript
const context1 = await browser.newContext();
const context2 = await browser.newContext();
```

## 📱 Mobile Testing

```typescript
import { devices } from '@playwright/test';

const iPhone = devices['iPhone 12'];
const context = await browser.newContext({
  ...iPhone,
});
```

## 🎨 Custom Fixtures

```typescript
import { test as base } from '@playwright/test';

export const test = base.extend({
  customFixture: async ({ page }, use) => {
    // Setup
    const fixture = new CustomClass(page);
    await use(fixture);
    // Teardown
  },
});
```

## ⚡ Performance

### Parallel Execution
```typescript
test.describe.configure({ mode: 'parallel' });
```

### Workers
```bash
npx playwright test --workers=4
```

### Retries
```bash
npx playwright test --retries=2
```

## 🔗 Useful Commands

```bash
# Generate tests
npx playwright codegen https://example.com

# Show report
npx playwright show-report

# Open trace
npx playwright show-trace trace.zip

# Update snapshots
npx playwright test --update-snapshots

# List all tests
npx playwright test --list

# Run in specific browser
npx playwright test --project=chromium
```

## 📚 Resources

- **Playwright Docs**: https://playwright.dev
- **API Reference**: https://playwright.dev/docs/api/class-playwright
- **Best Practices**: https://playwright.dev/docs/best-practices
- **Selectors**: https://playwright.dev/docs/selectors
- **Assertions**: https://playwright.dev/docs/test-assertions
