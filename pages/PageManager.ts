import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';
import { ProductPage } from './ProductPage';

/**
 * PageManager - Centralized management of all page objects
 * This provides a single point to access all pages
 */
export class PageManager {
  private page: Page;
  private _loginPage?: LoginPage;
  private _homePage?: HomePage;
  private _productPage?: ProductPage;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Get LoginPage instance (lazy loading)
   */
  get loginPage(): LoginPage {
    if (!this._loginPage) {
      this._loginPage = new LoginPage(this.page);
    }
    return this._loginPage;
  }

  /**
   * Get HomePage instance (lazy loading)
   */
  get homePage(): HomePage {
    if (!this._homePage) {
      this._homePage = new HomePage(this.page);
    }
    return this._homePage;
  }

  /**
   * Get ProductPage instance (lazy loading)
   */
  get productPage(): ProductPage {
    if (!this._productPage) {
      this._productPage = new ProductPage(this.page);
    }
    return this._productPage;
  }

  /**
   * Navigate to a specific page and return its page object
   */
  async navigateToLogin(): Promise<LoginPage> {
    await this.loginPage.navigate();
    return this.loginPage;
  }

  async navigateToHome(): Promise<HomePage> {
    await this.homePage.navigate();
    return this.homePage;
  }

  async navigateToProduct(productId: string): Promise<ProductPage> {
    await this.productPage.navigate(productId);
    return this.productPage;
  }
}
