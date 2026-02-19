# test-assignment-QA-engineer

Automated browser tests for [verkkokauppa.com](https://www.verkkokauppa.com) using [Playwright](https://playwright.dev/).

## What the test does

1. Opens the website and searches for "Nikon"
2. Sorts the results from highest to lowest price
3. Clicks the second product in the sorted results (result depends on live pricing, so the assertion may fail if inventory 
  changes)
4. Asserts that the product title contains "Nikon Z30"

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
