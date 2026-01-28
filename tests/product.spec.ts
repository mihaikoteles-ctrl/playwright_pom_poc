import { test, expect } from '../fixtures/pageFixture';
import { loginTestData, productTestData } from '../data/testData';

test.describe('Product Page Tests with POM', () => {
  
  test.beforeEach(async ({ pageManager }) => {
    // Login before each test
    await pageManager.navigateToLogin();
    await pageManager.loginPage.login(
      loginTestData.validUser.username,
      loginTestData.validUser.password
    );
    
    // Navigate to product page
    await pageManager.navigateToProduct(productTestData.product1.id);
  });

  test('should display all product details', async ({ pageManager }) => {
    // Verify all elements are visible
    await pageManager.productPage.verifyProductDetailsDisplayed();
    
    // Verify product title
    const title = await pageManager.productPage.getProductTitle();
    expect(title).toBeTruthy();
    
    // Verify product price
    const price = await pageManager.productPage.getProductPrice();
    expect(price).toContain('$');
  });

  test('should add product to cart with default quantity', async ({ pageManager }) => {
    // Add to cart
    await pageManager.productPage.addToCart();
    
    // Verify success message or cart update
    // In a real scenario, you would check cart icon or success message
  });

  test('should add product to cart with custom quantity', async ({ pageManager }) => {
    // Add 5 items to cart
    await pageManager.productPage.addToCart(5);
    
    // Verify cart updated with correct quantity
  });

  test('should select different product sizes', async ({ pageManager }) => {
    // Test different sizes
    const sizes = ['S', 'M', 'L', 'XL'];
    
    for (const size of sizes) {
      await pageManager.productPage.selectSize(size);
      // Verify size is selected
    }
  });

  test('should select different product colors', async ({ pageManager }) => {
    // Test different colors
    const colors = ['red', 'blue', 'green'];
    
    for (const color of colors) {
      await pageManager.productPage.selectColor(color);
      // Verify color is selected
    }
  });

  test('should add product to wishlist', async ({ pageManager }) => {
    // Add to wishlist
    await pageManager.productPage.addToWishlist();
    
    // Verify wishlist icon changes or count increases
  });

  test('should view product reviews', async ({ pageManager }) => {
    // Get review count
    const reviewCount = await pageManager.productPage.getReviewsCount();
    
    // Verify review count is displayed
    expect(reviewCount).toBeTruthy();
  });
});
