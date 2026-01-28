# Playwright Test Automation Framework with Page Object Model

A robust, scalable test automation framework built with Playwright and TypeScript following the Page Object Model (POM) design pattern.

## 📁 Project Structure

```
playwright-pom-project/
├── pages/                      # Page Object Models
│   ├── BasePage.ts            # Base class with common methods
│   ├── LoginPage.ts           # Login page object
│   ├── HomePage.ts            # Home page object
│   ├── ProductPage.ts         # Product page object
│   ├── PageManager.ts         # Centralized page management
│   └── index.ts               # Page exports
├── tests/                      # Test specifications
│   ├── login.spec.ts          # Login tests
│   ├── product.spec.ts        # Product tests
│   └── e2e.spec.ts           # End-to-end tests
├── fixtures/                   # Custom fixtures
│   └── pageFixture.ts         # Page manager fixture
├── utils/                      # Utility functions
│   └── helpers.ts             # Helper functions
├── data/                       # Test data
│   └── testData.ts            # Test data configurations
├── config/                     # Configuration files
├── playwright.config.ts        # Playwright configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies
├── .env.example               # Environment variables template
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd playwright-pom-project
```

2. Install dependencies
```bash
npm install
```

3. Install Playwright browsers
```bash
npx playwright install
```

4. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

## 🏃 Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Run tests in UI mode (interactive)
```bash
npm run test:ui
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests for specific browser
```bash
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

### Run specific test file
```bash
npx playwright test tests/login.spec.ts
```

### Run tests with specific tag
```bash
npx playwright test --grep @smoke
```

### View test report
```bash
npm run report
```

## 📝 Writing Tests

### Basic Test Structure

```typescript
import { test, expect } from '../fixtures/pageFixture';

test.describe('Feature Tests', () => {
  
  test.beforeEach(async ({ pageManager }) => {
    // Setup before each test
    await pageManager.navigateToLogin();
  });

  test('should perform action', async ({ pageManager }) => {
    // Arrange
    const testData = { username: 'user', password: 'pass' };
    
    // Act
    await pageManager.loginPage.login(testData.username, testData.password);
    
    // Assert
    await pageManager.homePage.verifyUserLoggedIn('User');
  });
});
```

### Using Page Manager

The PageManager provides centralized access to all page objects:

```typescript
test('example test', async ({ pageManager }) => {
  // Access page objects through pageManager
  await pageManager.loginPage.login('user', 'pass');
  await pageManager.homePage.verifyHomePageDisplayed();
  await pageManager.navigateToProduct('prod-123');
  await pageManager.productPage.addToCart();
});
```

## 🎯 Page Object Model Best Practices

### 1. Page Objects

- Each page should have its own class extending `BasePage`
- Use descriptive locator names
- Implement methods that represent user actions
- Keep verification methods in page objects
- Use lazy loading for page objects

Example:
```typescript
export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
  }

  async login(username: string, password: string) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }
}
```

### 2. Test Organization

- Group related tests using `test.describe()`
- Use `beforeEach` and `afterEach` for setup/teardown
- Keep tests independent and isolated
- Use meaningful test names
- Follow AAA pattern (Arrange, Act, Assert)

### 3. Test Data

- Store test data in separate files (`data/testData.ts`)
- Use environment variables for sensitive data
- Generate dynamic data when needed

### 4. Locator Strategy

- Prefer user-facing attributes (role, label, text)
- Use data-testid for complex scenarios
- Avoid CSS selectors tied to styling
- Make locators resilient to UI changes

Priority order:
1. `getByRole()` - Best for accessibility
2. `getByLabel()` - For form fields
3. `getByPlaceholder()` - For inputs
4. `getByText()` - For buttons/links
5. `getByTestId()` - Last resort

### 5. Waiting Strategies

- Use auto-waiting features (built into Playwright)
- Avoid hard waits (`page.waitForTimeout()`)
- Use `waitForLoadState()` for page loads
- Implement custom wait methods when needed

## 🧪 Test Patterns

### Login and Setup

```typescript
test.beforeEach(async ({ pageManager }) => {
  await pageManager.navigateToLogin();
  await pageManager.loginPage.login(
    loginTestData.validUser.username,
    loginTestData.validUser.password
  );
});
```

### Navigation Flow

```typescript
// Navigate and get page object
const productPage = await pageManager.navigateToProduct('prod-123');
await productPage.verifyProductDetailsDisplayed();
```

### Data-Driven Tests

```typescript
const testCases = [
  { size: 'S', color: 'red' },
  { size: 'M', color: 'blue' },
  { size: 'L', color: 'green' },
];

testCases.forEach(({ size, color }) => {
  test(`should select ${size} size and ${color} color`, async ({ pageManager }) => {
    await pageManager.productPage.selectSize(size);
    await pageManager.productPage.selectColor(color);
  });
});
```

## 🔧 Configuration

### Playwright Config

Key configurations in `playwright.config.ts`:
- Base URL
- Browser settings
- Timeout values
- Reporter options
- Screenshot/video settings
- Retry logic

### Environment Variables

Create a `.env` file based on `.env.example`:
```env
BASE_URL=https://your-app.com
TEST_USERNAME=user@example.com
TEST_PASSWORD=password123
```

## 📊 Reporting

### HTML Report

After test execution:
```bash
npx playwright show-report
```

### JUnit Report

Generated automatically at `test-results/junit.xml`

### Custom Reporters

Add custom reporters in `playwright.config.ts`:
```typescript
reporter: [
  ['html'],
  ['junit', { outputFile: 'results.xml' }],
  ['json', { outputFile: 'results.json' }]
]
```

## 🐛 Debugging

### Debug Mode
```bash
npx playwright test --debug
```

### Trace Viewer
```bash
npx playwright show-trace trace.zip
```

### VS Code Debugging

1. Install Playwright extension
2. Set breakpoints in code
3. Use "Debug Test" option

## 📈 CI/CD Integration

### GitHub Actions Example

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## 🎨 Code Quality

### ESLint (Optional)

```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### Prettier (Optional)

```bash
npm install --save-dev prettier
```

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-playwright)

## 🤝 Contributing

1. Create a feature branch
2. Follow the existing code structure
3. Write tests for new features
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

MIT License

---

**Happy Testing! 🎭**
