import { test, expect } from '@playwright/test';

test('capture dashboard', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Wait for login
  await page.waitForSelector('input[type="password"]');
  await page.fill('input[type="password"]', 'any');
  await page.click('button:has-text("Sign In")');

  // Wait for dashboard
  await page.waitForSelector('h2:has-text("Dashboard")');
  await page.waitForTimeout(1000); // Wait for animations

  await page.screenshot({ path: 'verification/screenshots/dashboard_v3.png', fullPage: true });
});
