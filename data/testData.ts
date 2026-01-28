/**
 * Test data for login scenarios
 */
export const loginTestData = {
  validUser: {
    username: 'testuser@example.com',
    password: 'SecurePass123!',
  },
  invalidUser: {
    username: 'invalid@example.com',
    password: 'wrongpassword',
  },
  adminUser: {
    username: 'admin@example.com',
    password: 'AdminPass123!',
  },
};

/**
 * Test data for products
 */
export const productTestData = {
  product1: {
    id: 'prod-001',
    name: 'Test Product 1',
    price: '$99.99',
  },
  product2: {
    id: 'prod-002',
    name: 'Test Product 2',
    price: '$149.99',
  },
};

/**
 * Error messages
 */
export const errorMessages = {
  invalidCredentials: 'Invalid username or password',
  requiredField: 'This field is required',
  serverError: 'An error occurred. Please try again.',
};
