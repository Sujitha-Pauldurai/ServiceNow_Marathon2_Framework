# ServiceNow Playwright Automation Framework

A TypeScript-based automation framework using Playwright to test ServiceNow UI workflows and REST APIs with reusable components, custom fixtures, and data-driven testing.

## Tech Stack

- **Language:** TypeScript
- **Automation:** Playwright
- **Platform:** ServiceNow
- **API Testing:** Playwright APIRequestContext
- **Test Data:** JSON and environment variables
- **Version Control:** Git and GitHub
- **CI:** GitHub Actions

## Framework Design

This project follows a **Hybrid Automation Framework** approach, combining:

- **Page Object Model (POM):** Separates page-specific actions from test scripts.
- **Custom Fixtures:** Manages shared test dependencies and setup.
- **Reusable Methods:** Centralizes element interactions for maintainability.
- **Data-Driven Testing:** Uses external JSON and environment files for test data.
- **API Testing:** Supports REST API operations through reusable API methods.

## Key Features

- **Reusable methods:** Centralized element handling for consistent UI interactions.
- **Custom fixtures:** Shared setup and dependencies across tests.
- **Shadow DOM handling:** Interactions with elements inside shadow roots.
- **Iframe handling:** Frame interactions using Playwright frame locators.
- **Dynamic synchronization:** Visibility checks and reliable element interactions.
- **Locator parametrization:** Reusable locators for maintainable tests.
- **Data parametrization:** Externalized test data using JSON and environment variables.
- **API automation:** OAuth access-token generation and REST API operations.
- **Assertions and cleanup:** Validate API responses and clean up records created during tests.
- **Continuous integration:** GitHub Actions workflow for automated test execution.

## Project Structure

```text
ServiceNow_Marathon2_Framework/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── helper/
│   ├── APIHandler.ts
│   ├── customeFixture.ts
│   ├── elementHandler.ts
│   └── envFileHandler.ts
├── locators/
│   └── locators.ts
├── pages/
│   ├── homePage.ts
│   ├── login.ts
│   └── serviceNow.ts
├── test-data/
│   ├── apiClient.json
│   ├── appClient.env
│   ├── appUrl.json
│   ├── changeRequest.json
│   ├── items.json
│   ├── problem.json
│   └── users.env
├── tests/
│   ├── TC05_API_problem.spec.ts
│   ├── TC3_OrderingMobile.spec.ts
│   └── TC4_API_ChangeRequest.spec.ts
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

## Folder Overview

- **`helper/`** – API methods, custom fixtures, reusable element handling, and environment-file management.
- **`locators/`** – Centralized UI locators.
- **`pages/`** – Page objects for login, home, and ServiceNow workflows.
- **`test-data/`** – Application configuration, test data, and environment files.
- **`tests/`** – UI automation and REST API test scenarios.
- **`.github/workflows/`** – GitHub Actions workflow for automated test execution.

## Test Scenarios

### UI Automation

- Navigate through the ServiceNow Service Catalog.
- Select and order a mobile device.
- Interact with dynamic elements, shadow DOM, and iframes.

### API Automation

- Generate OAuth access tokens.
- Create and retrieve Change Request records.
- Update and delete created records.
- Exercise Problem record API operations.
- Validate responses and clean up test data.

## Getting Started

### Prerequisites

- Node.js and npm
- Access to a ServiceNow instance
- Valid ServiceNow API credentials and permissions

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Sujitha-Pauldurai/ServiceNow_Marathon2_Framework.git
cd ServiceNow_Marathon2_Framework
npm ci
npx playwright install
```

### Configure Test Data

Configure the instance URL and test data in the appropriate files under `test-data/`.

Set credentials through environment variables or local environment files, following the names expected by `envFileHandler.ts` and the tests. Example variable names may include:

```text
Susername=your_username
password=your_password
client_id=your_client_id
client_secret=your_client_secret
```

Do not commit real credentials, tokens, or secret environment files to GitHub. If credentials have been exposed, rotate them.

### Run Tests

Run all tests:

```bash
npx playwright test
```

Run a specific test:

```bash
npx playwright test tests/TC4_API_ChangeRequest.spec.ts
```

Run UI tests in headed mode:

```bash
npx playwright test --headed
```

### View the HTML Report

```bash
npx playwright show-report
```

## GitHub Actions

The workflow is located at `.github/workflows/playwright.yml`. Configure required credentials as GitHub Actions repository secrets and map them to environment variables in the workflow. The workflow can then install dependencies and browsers and execute the test suite.

## Best Practices

- Keep locators and reusable methods centralized.
- Separate test data from test logic.
- Use assertions to validate expected outcomes.
- Keep credentials in environment variables or secret storage.
- Clean up records created during API tests.
- Keep the framework modular and maintainable.

## Author

**Sujitha Pauldurai**

GitHub: [Sujitha-Pauldurai](https://github.com/Sujitha-Pauldurai)

---

This project demonstrates hands-on practice in UI automation, REST API testing, reusable framework design, and TypeScript-based Playwright automation.
