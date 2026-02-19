import { test, expect } from '@playwright/test';

test('Nikon Z30 can be found in the product catalogue', async ({ page }) => {

  // Open the website and search for "Nikon"
  await page.goto('/');
  await page.getByRole('button', { name: 'Hyväksy kaikki' }).click(); // Cookie consent
  const searchLocator = page.getByPlaceholder('Hae kaupasta');
  await searchLocator.fill('Nikon');
  const searchButton = page.locator('[aria-label="Etsi"]');
  await searchButton.click();

  // Sort the results from highest to lowest price.
  await page.getByLabel('Tuotteiden järjestys').selectOption('Kalleimmat');

  // Select the second product from the sorted results and click on it for more details.
  const productLinks = page.locator('article[data-product-id] h3 a');
  await productLinks.first().waitFor();
  await productLinks.nth(1).click();
    
  // In the product details, verify (using assert) that the product title includes the text "Nikon Z30".
  await expect(page.locator('h1')).toContainText('Nikon Z30');

});

