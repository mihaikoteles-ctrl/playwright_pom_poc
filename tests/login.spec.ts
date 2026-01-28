import { test, expect } from '../fixtures/pageFixture';
import { loginTestData } from '../data/testData';

test.describe('Login Tests with POM', () => {
  
  test.beforeEach(async ({ pageManager }) => {
    // Navigate to login page before each test
    await pageManager.navigateToLogin();
  });

  test('should login successfully with valid credentials', async ({ pageManager }) => {
    // Arrange
    const { username, password } = loginTestData.validUser;
    
    // Act
    await pageManager.loginPage.login(username, password);
    
    // Assert
    await pageManager.homePage.verifyUserLoggedIn('Test User');
  });

  test('should show error with invalid credentials', async ({ pageManager }) => {
    // Arrange
    const { username, password } = loginTestData.invalidUser;
    
    // Act
    await pageManager.loginPage.login(username, password);
    
    // Assert
    await pageManager.loginPage.verifyErrorMessage('Invalid username or password');
  });

  test('should login with remember me option', async ({ pageManager }) => {
    // Arrange
    const { username, password } = loginTestData.validUser;
    
    // Act
    await pageManager.loginPage.loginWithRememberMe(username, password);
    
    // Assert
    await pageManager.homePage.verifyHomePageDisplayed();
  });

  test('should navigate to forgot password page', async ({ pageManager }) => {
    // Act
    await pageManager.loginPage.clickForgotPassword();
    
    // Assert
    await expect(pageManager.loginPage.page).toHaveURL(/forgot-password/);
  });

  test('should navigate to sign up page', async ({ pageManager }) => {
    // Act
    await pageManager.loginPage.clickSignUp();
    
    // Assert
    await expect(pageManager.loginPage.page).toHaveURL(/signup/);
  });
});
