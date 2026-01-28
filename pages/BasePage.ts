import { Page, Locator, expect } from '@playwright/test';

/**
 * Base Page class containing common methods for all page objects
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   */
  async goto(url: string) {
    await this.page.goto(url);
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click on an element
   */
  async click(locator: Locator) {
    await locator.click();
  }

  /**
   * Fill input field
   */
  async fill(locator: Locator, text: string) {
    await locator.fill(text);
  }

  /**
   * Type text with delay (simulates real typing)
   */
  async type(locator: Locator, text: string, delay: number = 100) {
    await locator.pressSequentially(text, { delay });
  }

  /**
   * Select option from dropdown
   */
  async selectOption(locator: Locator, value: string) {
    await locator.selectOption(value);
  }

  /**
   * Check checkbox
   */
  async check(locator: Locator) {
    await locator.check();
  }

  /**
   * Uncheck checkbox
   */
  async uncheck(locator: Locator) {
    await locator.uncheck();
  }

  /**
   * Get text content
   */
  async getText(locator: Locator): Promise<string> {
    return await locator.textContent() || '';
  }

  /**
   * Wait for element to be visible
   */
  async waitForVisible(locator: Locator, timeout: number = 5000) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   */
  async waitForHidden(locator: Locator, timeout: number = 5000) {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Check if element is visible
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Check if element is enabled
   */
  async isEnabled(locator: Locator): Promise<boolean> {
    return await locator.isEnabled();
  }

  /**
   * Scroll to element
   */
  async scrollToElement(locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  /**
   * Press keyboard key
   */
  async pressKey(key: string) {
    await this.page.keyboard.press(key);
  }

  /**
   * Hover over element
   */
  async hover(locator: Locator) {
    await locator.hover();
  }

  /**
   * Get current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Verify page title
   */
  async verifyTitle(expectedTitle: string) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  /**
   * Verify URL contains text
   */
  async verifyUrlContains(text: string) {
    await expect(this.page).toHaveURL(new RegExp(text));
  }

  /**
   * Wait for specific time (use sparingly)
   */
  async wait(milliseconds: number) {
    await this.page.waitForTimeout(milliseconds);
  }

  /**
   * Reload page
   */
  async reload() {
    await this.page.reload();
  }

  /**
   * Go back
   */
  async goBack() {
    await this.page.goBack();
  }

  /**
   * Go forward
   */
  async goForward() {
    await this.page.goForward();
  }
}
