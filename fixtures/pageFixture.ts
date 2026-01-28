import { test as base } from '@playwright/test';
import { PageManager } from '../pages/PageManager';

/**
 * Custom test fixture that provides PageManager
 * This allows us to use pageManager in all tests
 */
type MyFixtures = {
  pageManager: PageManager;
};

export const test = base.extend<MyFixtures>({
  pageManager: async ({ page }, use) => {
    const pageManager = new PageManager(page);
    await use(pageManager);
  },
});

export { expect } from '@playwright/test';
