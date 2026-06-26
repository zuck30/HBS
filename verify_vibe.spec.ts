import { test, expect } from '@playwright/test';

test('verify multiple pages vibe', async ({ page }) => {
  const pages = [
    { name: 'home', url: '/' },
    { name: 'about', url: '/about' },
    { name: 'programs', url: '/programs' },
    { name: 'life', url: '/life' },
    { name: 'careers', url: '/careers' },
    { name: 'contact', url: '/contact' },
    { name: 'admin_login', url: '/admin' }
  ];

  for (const p of pages) {
    await page.goto(`http://localhost:3000${p.url}`);
    await page.waitForTimeout(2000); // Wait for animations/loading
    await page.screenshot({ path: `vibe_check_${p.name}.png`, fullPage: true });
  }
});
