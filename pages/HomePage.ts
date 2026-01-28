import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Home Page Object Model
 */
export class HomePage extends BasePage {
  // Locators
  readonly welcomeMessage: Locator;
  readonly userProfileIcon: Locator;
  readonly logoutButton: Locator;
  readonly navigationMenu: Locator;
  readonly searchBox: Locator;
  readonly notificationBell: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.welcomeMessage = page.locator('.welcome-message');
    this.userProfileIcon = page.locator('.user-profile');
    this.logoutButton = page.locator('button:has-text("Logout")');
    this.navigationMenu = page.locator('.nav-menu');
    this.searchBox = page.locator('input[placeholder="Search"]');
    this.notificationBell = page.locator('.notification-icon');
  }

  /**
   * Navigate to home page
   */
  async navigate() {
    await this.goto('/home');
    await this.waitForPageLoad();
  }

  /**
   * Verify user is logged in
   */
  async verifyUserLoggedIn(username: string) {
    await expect(this.welcomeMessage).toBeVisible();
    await expect(this.welcomeMessage).toContainText(username);
  }

  /**
   * Perform logout
   */
  async logout() {
    await this.click(this.userProfileIcon);
    await this.click(this.logoutButton);
  }

  /**
   * Search for content
   */
  async search(searchTerm: string) {
    await this.fill(this.searchBox, searchTerm);
    await this.pressKey('Enter');
  }

  /**
   * Navigate to specific menu item
   */
  async navigateToMenuItem(menuItem: string) {
    const menuItemLocator = this.page.locator(`a:has-text("${menuItem}")`);
    await this.click(menuItemLocator);
  }

  /**
   * Check notification count
   */
  async getNotificationCount(): Promise<string> {
    const badge = this.page.locator('.notification-badge');
    return await this.getText(badge);
  }

  /**
   * Verify home page is displayed
   */
  async verifyHomePageDisplayed() {
    await expect(this.welcomeMessage).toBeVisible();
    await expect(this.navigationMenu).toBeVisible();
  }
}
