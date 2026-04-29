import { test, expect } from '@playwright/test';

test('verify dashboard design', async ({ page }) => {
  await page.goto('http://localhost:3002');

  // Login
  await page.selectOption('#usuario', 'ASESOR 1');
  await page.fill('input[type="password"]', '1234');
  await page.click('button:has-text("INGRESAR")');

  // Wait for dashboard
  await page.waitForSelector('h2:has-text("Dashboard")');

  // Take screenshot
  await page.screenshot({ path: 'dashboard_final_check.png', fullPage: true });
  console.log('Screenshot saved as dashboard_final_check.png');
});
