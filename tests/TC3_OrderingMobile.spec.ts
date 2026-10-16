import { LoginPage } from "../pages/login";
// Import the custom test fixture that provides reusable page objects.
import {test} from "../helper/customeFixture"

// Import login credentials and app_URL from the test data file.
import users from "../test-data/users.json"
import appUrl from "../test-data/appUrl.json"
import item from "../test-data/items.json"

// Define a test scenario for ordering a mobile through ServiceNow.
test("Service Now : Ordering a mobile", async({login,home,serviceNow}) =>{

    // Mark the test as slow to allow additional execution time since the application takes time to load every page
    test.slow()

    // Navigate to the application URL.
    await login.loadUrl(appUrl.url);

    // Log in using the credentials from the test data.
    await login.login(users.username, users.password)

    // Open the Service Catalog using the specified search text.
    await home.openServiceCatalog("service catalog")

    // Select the mobile product and submit the order.
    await serviceNow.addToCart(item.category,item.item)

    // Verify the order confirmation and summary details.
    await serviceNow.verifyOrderSummary(item.item,item.quantity)

    // Capture a full-page screenshot for evidence.
    await serviceNow.takeScreenshot()

})