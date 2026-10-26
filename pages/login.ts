import { expect } from "@playwright/test";
import ElementHandler from "../helper/elementHandler";
import { Locator } from "../locators/locators";


export class LoginPage extends ElementHandler{

    /**
     * Description: Opens the application by calling the reusable navigation method from the base class.
     * @param url - The URL of the application to open.
     
    async loadUrl(url:string){

    //from Base Page
    await this.loadApplication(url)

   }*/

    /**
     * Description: Logs in to the application by entering the username and password, then clicking the login button.
     * @param username - The username used to log in.
     * @param password - The password used to log in.
     */
   async login(username:string,password:string){

    await this.enterText(Locator.PWLocators.role, username,Locator.role.textbox,Locator.login.username_Name)
    await this.enterText(Locator.login.password, password)
    await this.click(Locator.login.loginButton)
    await this.waitUntilBodyLoad()
    const targetElement = await this.findElement(Locator.instacePage.search)
    await targetElement.waitFor({state:'visible', timeout: 10000})

   }

}