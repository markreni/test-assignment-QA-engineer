import { test, expect } from '@playwright/test';
import { cookieConsent, dismissCartDialog, parsePrice, searchForProduct, sortProducts } from './helper';

test.describe('Verkkokauppa test scenarios', () => { 
  test.beforeEach(async ({ page }) => {
    // Open the website and consent to cookies before each test
    await page.goto('/');
    await cookieConsent(page);
  })
  
  test('should show Nikon Z30 as second result', async ({ page }) => {
    // Search for "Nikon"
    await searchForProduct(page, 'Nikon');

    // Sort the results from highest to lowest price.
    await sortProducts(page, 'Kalleimmat');

    // Select the second product from the sorted results and click on it for more details.
    const productLinks = page.locator('article[data-product-id] h3 a');
    await productLinks.nth(1).waitFor();
    await productLinks.nth(1).click();
      
    // In the product details, verify (using assert) that the product title includes the text "Nikon Z30".
    await expect(page.locator('h1')).toContainText('Nikon Z30');
  });

  test('should display the total price correctly in the cart', async ({ page }) => {
    // Search for "Pelikone"
    await searchForProduct(page, 'Pelikone');

    // Select the first three products from the search results and add them to the shopping cart directly from the listing page (without going to the product details page).
    const productLinks = page.locator('article[data-product-id]');
    await productLinks.first().waitFor();

    const productPrices = productLinks.locator('span.bd_0');
    const productButtons = productLinks.getByRole('button', { name: 'Lisää ostoskoriin' });
    
    const priceFirst = parsePrice(await productPrices.nth(0).textContent());
    const priceSecond = parsePrice(await productPrices.nth(1).textContent());
    const priceThird = parsePrice(await productPrices.nth(2).textContent());

    const expectedTotal = priceFirst + priceSecond + priceThird;
    
    // Add first product   
    await productLinks.nth(0).hover();
    await productButtons.nth(0).click(); 
    await dismissCartDialog(page);

    // Add second product
    await productLinks.nth(1).hover();
    await productButtons.nth(1).click(); 
    await dismissCartDialog(page);

    // Add third product
    await productLinks.nth(2).hover();
    await productButtons.nth(2).click(); 
    await dismissCartDialog(page);

    // Navigate to the cart and verify that the total price of the products in the cart matches the sum of the prices of the three products added.
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole('button', { name: 'Tarkastele ostoskoria' }).waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Tarkastele ostoskoria' }).click();

    await expect(page.getByText(`${expectedTotal}`).first()).toBeVisible();
  });

  test('should checkout successfully', async ({ page }) => {
    test.slow();
    // Search for "Ableton"
    await searchForProduct(page, 'Ableton');
    const productLinks = page.locator('article[data-product-id]');
    await productLinks.first().waitFor();

    await productLinks.first().getByText('Lisää ostoskoriin').click();
    await page.locator('text=Siirry kassalle').click();
    await page.locator('text=Siirry kassalle').click();
  });
});

