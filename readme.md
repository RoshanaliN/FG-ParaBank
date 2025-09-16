Test Scenarios are under `e2e` directory
`api_test` directory contains api methods that are called in e2e test case
`page_objects` directory contains different class for each page along with its locators and methods
`utils` directory contains support methods. Currently `generateRandomString()` to help generate unique username on every run

To execute in headed mode use `npx playwright test --headed`