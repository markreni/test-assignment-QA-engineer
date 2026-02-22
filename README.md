# Test Assignment for QA Engineer Summer Trainee Position

## Setup

**Prerequisites:** Node.js (LTS)

```bash
npm install
npx playwright install --with-deps
```

## Running the tests

```bash
npm test
```

By default the tests run against `https://www.verkkokauppa.com`. To use a different URL:

```bash
BASE_URL=https://www.verkkokauppa.com npm test
```

To view the HTML report after a run:

```bash
npm run test:report
```

## CI

Tests run automatically on every push and pull request to `main` via GitHub Actions. The HTML report is uploaded as an artifact and retained for 30 days.

## PART 1: Core Test Automation

Automated browser tests for [verkkokauppa.com](https://www.verkkokauppa.com) using [Playwright](https://playwright.dev/).

### What the test does

1. Opens the website and searches for "Nikon"
2. Sorts the results from highest to lowest price
3. Clicks the second product in the sorted results (result depends on live pricing, so the assertion may fail if inventory 
  changes)
4. Asserts that the product title contains "Nikon Z30"


## PART 2: Test Design & Additional Automation

### Additional test scenario: Adding to Cart

#### What the test does

1. Searches for "Pelikone" on the listing page
2. Reads the prices of the first tfree products directly from the search results
3. Adds products to the cart from the listing page, dismissing the confirmation dialog after the each add
4. Navigates to the cart and asserts that the displayed total equals the sum of the product prices

#### Why it is a good candidate for automation

The add-to-cart flow is the most critical path in any e-commerce site, if it is broken, no purchases happen at all. It involves multiple sequential steps (search, price capture, separate cart additions, dialog handling, cart navigation, and a numeric assertion) that are tedious and error-prone to verify manually on every release. The total price calculation also requires precise arithmetic across dynamically loaded prices, making it easy for a human tester to make mistakes or skip the verification entirely. Automation runs this exact sequence consistently on every push, catches regressions immediately, and does so far faster than any manual test cycle.

### Additional test scenario: Checkout Flow

#### What the test does

1. Searches for "Ableton" on the listing page
2. Adds the first result to the cart directly from the listing page
3. Navigates to the checkout by clicking "Siirry kassalle"
4. Verifies the checkout flow completes without errors or unexpected state changes

#### Why it is a good candidate for automation

The checkout flow is the final and most business-critical step of any purchase, a failure here means lost revenue regardless of how well the rest of the site works. It involves multiple navigations and state transitions that are time-consuming to verify manually on every release. Automation can run this flow repeatedly across different product types and catch regressions in routing, cart state persistence, or checkout page rendering before they reach production.

### Additional test scenario: Discounts


