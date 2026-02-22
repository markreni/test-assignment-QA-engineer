import { Page } from "@playwright/test";

const cookieConsent = async (page: Page) => {
  await page.getByRole('button', { name: 'Hyväksy kaikki' }).click(); // Cookie consent
  
}

const searchForProduct = async (page: Page, productName: string) => {
  const searchLocator = page.getByRole('combobox', { name: 'Hae kaupasta' })
  await searchLocator.fill(productName);
  await page.locator('.sc-dCFHLb').click();

}

const sortProducts = async (page: Page, sortOption: string) => {
  await page.getByLabel('Tuotteiden järjestys').selectOption(sortOption);
}

const parsePrice = (text: string | null) => parseFloat(text?.replace('Hinta ', '').replace(/\s/g, '').replace(',', '.').replace('€.', '') ?? '0');

const dismissCartDialog = async (page: Page) => {
  await page.getByRole('button', { name: 'Jatka ostoksia' }).click();
}

export { cookieConsent, searchForProduct, sortProducts, parsePrice, dismissCartDialog };