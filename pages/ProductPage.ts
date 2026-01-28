import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Product Page Object Model
 */
export class ProductPage extends BasePage {
  // Locators
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly quantityInput: Locator;
  readonly productDescription: Locator;
  readonly productImage: Locator;
  readonly reviewsSection: Locator;
  readonly addToWishlistButton: Locator;
  readonly sizeDropdown: Locator;
  readonly colorOptions: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.productTitle = page.locator('.product-title');
    this.productPrice = page.locator('.product-price');
    this.addToCartButton = page.locator('button:has-text("Add to Cart")');
    this.quantityInput = page.locator('input[name="quantity"]');
    this.productDescription = page.locator('.product-description');
    this.productImage = page.locator('.product-image img');
    this.reviewsSection = page.locator('.reviews-section');
    this.addToWishlistButton = page.locator('button:has-text("Add to Wishlist")');
    this.sizeDropdown = page.locator('select[name="size"]');
    this.colorOptions = page.locator('.color-option');
  }

  /**
   * Navigate to product page
   */
  async navigate(productId: string) {
    await this.goto(`/product/${productId}`);
    await this.waitForPageLoad();
  }

  /**
   * Add product to cart
   */
  async addToCart(quantity: number = 1) {
    if (quantity > 1) {
      await this.fill(this.quantityInput, quantity.toString());
    }
    await this.click(this.addToCartButton);
  }

  /**
   * Select product size
   */
  async selectSize(size: string) {
    await this.selectOption(this.sizeDropdown, size);
  }

  /**
   * Select product color
   */
  async selectColor(color: string) {
    const colorOption = this.page.locator(`.color-option[data-color="${color}"]`);
    await this.click(colorOption);
  }

  /**
   * Add product to wishlist
   */
  async addToWishlist() {
    await this.click(this.addToWishlistButton);
  }

  /**
   * Get product title
   */
  async getProductTitle(): Promise<string> {
    return await this.getText(this.productTitle);
  }

  /**
   * Get product price
   */
  async getProductPrice(): Promise<string> {
    return await this.getText(this.productPrice);
  }

  /**
   * Verify product details displayed
   */
  async verifyProductDetailsDisplayed() {
    await expect(this.productTitle).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.productImage).toBeVisible();
    await expect(this.addToCartButton).toBeVisible();
  }

  /**
   * Read product reviews
   */
  async getReviewsCount(): Promise<string> {
    const reviewCount = this.page.locator('.review-count');
    return await this.getText(reviewCount);
  }
}
