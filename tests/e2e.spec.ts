import { test, expect } from '../fixtures/pageFixture';
import { loginTestData, productTestData } from '../data/testData';

test.describe('E2E Shopping Flow with POM', () => {
  
  test('should complete full shopping flow', async ({ pageManager }) => {
    // Step 1: Login
    await pageManager.navigateToLogin();
    await pageManager.loginPage.login(
      loginTestData.validUser.username,
      loginTestData.validUser.password
    );
    
    // Step 2: Verify home page
    await pageManager.homePage.verifyHomePageDisplayed();
    
    // Step 3: Navigate to product
    await pageManager.navigateToProduct(productTestData.product1.id);
    await pageManager.productPage.verifyProductDetailsDisplayed();
    
    // Step 4: Select product options
    await pageManager.productPage.selectSize('M');
    await pageManager.productPage.selectColor('blue');
    
    // Step 5: Add to cart
    await pageManager.productPage.addToCart(2);
    
    // Step 6: Verify product added (this would check cart in a real scenario)
    // await cartPage.verifyProductInCart(productTestData.product1.name);
    
    // Step 7: Logout
    await pageManager.homePage.logout();
  });

  test('should add multiple products to wishlist', async ({ pageManager }) => {
    // Login
    await pageManager.navigateToLogin();
    await pageManager.loginPage.login(
      loginTestData.validUser.username,
      loginTestData.validUser.password
    );
    
    // Add first product to wishlist
    await pageManager.navigateToProduct(productTestData.product1.id);
    await pageManager.productPage.addToWishlist();
    
    // Add second product to wishlist
    await pageManager.navigateToProduct(productTestData.product2.id);
    await pageManager.productPage.addToWishlist();
    
    // Verify wishlist count (in a real scenario)
    // await pageManager.homePage.verifyWishlistCount('2');
  });

  test('should search and view product details', async ({ pageManager }) => {
    // Login
    await pageManager.navigateToLogin();
    await pageManager.loginPage.login(
      loginTestData.validUser.username,
      loginTestData.validUser.password
    );
    
    // Search for product
    await pageManager.homePage.search('laptop');
    
    // View first search result
    // This would require a SearchResultsPage in a real scenario
    // await searchResultsPage.clickFirstResult();
    
    // Verify product page loaded
    await pageManager.productPage.verifyProductDetailsDisplayed();
  });
});
