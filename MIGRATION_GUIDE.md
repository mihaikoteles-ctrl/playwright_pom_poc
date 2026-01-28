# Migration Guide: From Hardcoded Tests to Page Object Model

## ❌ BEFORE: Hardcoded Test (Anti-Pattern)

```typescript
import { test, expect } from '@playwright/test';

test('user login and purchase', async ({ page }) => {
  // Navigate to login
  await page.goto('https://example.com/login');
  
  // Login
  await page.locator('#username').fill('testuser@example.com');
  await page.locator('#password').fill('SecurePass123!');
  await page.locator('button[type="submit"]').click();
  
  // Wait for home page
  await page.waitForLoadState('networkidle');
  
  // Verify login
  expect(await page.locator('.welcome-message').textContent()).toContain('Test User');
  
  // Search for product
  await page.locator('input[placeholder="Search"]').fill('laptop');
  await page.keyboard.press('Enter');
  
  // Click first product
  await page.locator('.product-item').first().click();
  
  // Select size
  await page.locator('select[name="size"]').selectOption('M');
  
  // Select color
  await page.locator('.color-option[data-color="blue"]').click();
  
  // Add to cart
  await page.locator('button:has-text("Add to Cart")').click();
  
  // Verify cart
  expect(await page.locator('.cart-count').textContent()).toBe('1');
  
  // Logout
  await page.locator('.user-profile').click();
  await page.locator('button:has-text("Logout")').click();
});
```

### Problems with this approach:
1. ❌ Locators are duplicated across tests
2. ❌ Hard to maintain when UI changes
3. ❌ Not reusable
4. ❌ Poor readability
5. ❌ Difficult to debug
6. ❌ No separation of concerns
7. ❌ Cannot easily update selectors in one place

---

## ✅ AFTER: Page Object Model (Best Practice)

```typescript
import { test, expect } from '../fixtures/pageFixture';
import { loginTestData } from '../data/testData';

test('user login and purchase', async ({ pageManager }) => {
  // Login
  await pageManager.navigateToLogin();
  await pageManager.loginPage.login(
    loginTestData.validUser.username,
    loginTestData.validUser.password
  );
  
  // Verify login
  await pageManager.homePage.verifyUserLoggedIn('Test User');
  
  // Search for product
  await pageManager.homePage.search('laptop');
  
  // Navigate to first product (would use SearchResultsPage in real scenario)
  await pageManager.navigateToProduct('prod-001');
  
  // Configure product
  await pageManager.productPage.selectSize('M');
  await pageManager.productPage.selectColor('blue');
  
  // Add to cart
  await pageManager.productPage.addToCart();
  
  // Verify cart (would use CartPage in real scenario)
  // await pageManager.cartPage.verifyItemCount(1);
  
  // Logout
  await pageManager.homePage.logout();
});
```

### Benefits of POM:
1. ✅ Centralized locator management
2. ✅ Easy to maintain and update
3. ✅ Highly reusable
4. ✅ Excellent readability
5. ✅ Easy to debug
6. ✅ Clear separation of concerns
7. ✅ Single source of truth for UI elements

---

## 🔄 Step-by-Step Migration

### Step 1: Identify Pages

From your hardcoded test, identify distinct pages:
- Login Page
- Home Page
- Search Results Page
- Product Page
- Cart Page

### Step 2: Create Page Objects

For each page, create a class in `pages/`:

```typescript
// pages/LoginPage.ts
export class LoginPage extends BasePage {
  readonly usernameInput = this.page.locator('#username');
  readonly passwordInput = this.page.locator('#password');
  readonly loginButton = this.page.locator('button[type="submit"]');
  
  async login(username: string, password: string) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }
}
```

### Step 3: Extract Test Data

Move hardcoded values to `data/testData.ts`:

```typescript
export const loginTestData = {
  validUser: {
    username: 'testuser@example.com',
    password: 'SecurePass123!',
  },
};
```

### Step 4: Update Tests

Replace hardcoded actions with page object methods:

**Before:**
```typescript
await page.locator('#username').fill('testuser@example.com');
await page.locator('#password').fill('SecurePass123!');
await page.locator('button[type="submit"]').click();
```

**After:**
```typescript
await pageManager.loginPage.login(
  loginTestData.validUser.username,
  loginTestData.validUser.password
);
```

### Step 5: Add PageManager

Register new pages in `PageManager.ts`:

```typescript
get searchResultsPage(): SearchResultsPage {
  if (!this._searchResultsPage) {
    this._searchResultsPage = new SearchResultsPage(this.page);
  }
  return this._searchResultsPage;
}
```

---

## 📊 Comparison Table

| Aspect | Hardcoded | POM |
|--------|-----------|-----|
| Maintainability | Low | High |
| Reusability | Low | High |
| Readability | Low | High |
| Scalability | Poor | Excellent |
| Debugging | Difficult | Easy |
| Refactoring | Hard | Simple |
| Test Independence | Poor | Good |
| Learning Curve | Easy | Moderate |

---

## 🎯 Migration Checklist

- [ ] Identify all pages in your application
- [ ] Create page classes extending BasePage
- [ ] Define locators in page classes
- [ ] Create action methods in page objects
- [ ] Extract test data to separate files
- [ ] Update PageManager with new pages
- [ ] Refactor tests to use pageManager
- [ ] Remove hardcoded locators from tests
- [ ] Add verification methods to page objects
- [ ] Update test assertions to use page methods

---

## 💡 Tips for Successful Migration

1. **Start Small**: Migrate one test file at a time
2. **Reuse**: If similar pages exist, extend or compose them
3. **Keep It Simple**: Don't over-engineer page objects
4. **Test Often**: Run tests after each migration step
5. **Document**: Add comments for complex interactions
6. **Review**: Have team members review page objects
7. **Consistency**: Follow naming conventions consistently

---

## 🚀 Next Steps

After migrating to POM:
1. Add more page objects as needed
2. Create component objects for reusable UI components
3. Implement data-driven testing
4. Set up CI/CD pipelines
5. Add visual regression testing
6. Implement API testing alongside UI tests
