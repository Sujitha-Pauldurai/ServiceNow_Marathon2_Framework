import { expect } from "@playwright/test";
import ElementHandler from "../helper/elementHandler";
import { Locator } from "../locators/locators";
import { it } from "node:test";


export class ServiceNow extends ElementHandler{

/**
     * Description: Adds the selected mobile product to the cart by navigating through the catalog,
     * selecting the required options, and clicking the Order Now button.
*/
async addToCart(category:string,item:string){
    await this.waitUntilPageLoad()

    // Locate the main iframe containing the ServiceNow catalog.
    let frame = this.findFrame(Locator.serviceNow.mainFrame)
    
   
    // Locate and click on the given category.
    const itemCategory = await this.findElement(Locator.serviceNow.category,undefined,undefined,frame)
    await this.filterElement(itemCategory, category).click()
    await this.waitUntilPageLoad()

    // Reacquire the iframe locator and wait for the mobile model to appear.
    frame = this.findFrame(Locator.serviceNow.mainFrame)
    await expect(frame.getByText(item,{exact:true})).toBeVisible()

    // Select the required mobile model.
    await this.click(Locator.PWLocators.text,item,undefined,frame)

    await this.waitUntilPageLoad()
     // Locate the Order Now button and verify that it is visible to confirm the page is loaded
    let targetEle = await this.findElement(Locator.serviceNow.OrderNowBut,undefined,undefined,frame)
    await expect(targetEle).toBeVisible({timeout : 90000})

    
    // Select the required replacement option.
    await frame.getByText(Locator.serviceNow.replacement_Text,{exact:true}).check()
    //locator('iframe[name="gsft_main"]').contentFrame().getByRole('textbox', { name: '   What was the original' })
    const dropdown = await this.findElement(Locator.PWLocators.label,Locator.serviceNow.mon_allowance_Label,undefined,frame)
    console.log(await dropdown.allInnerTexts());
    
    // Locate and select the required monthly allowance option.
    await dropdown.selectOption(Locator.serviceNow.mon_allowance_Option)

    // Submit the selection by clicking Order Now.
    await targetEle.click()


}

 /**
     * Description: Verifies the order summary by checking the confirmation message,
     * selected product description, and product quantity.
*/
async verifyOrderSummary(item:string,qty:string){

    // Locate the iframe containing the order summary.
    let frame = this.findFrame(Locator.serviceNow.mainFrame)

    // Verify that the order confirmation message is visible.
    await expect(await this.findElement(Locator.PWLocators.text,Locator.serviceNow.confirmText,undefined,frame)).toBeVisible()
    // Verify that the order summary contains the selected mobile model.
    await expect(await this.findElement(Locator.serviceNow.product_desc,undefined,undefined,frame)).toContainText(item)
   // Verify that the order quantity is one.
    await expect(await this.findElement(Locator.serviceNow.poduct_Qty,undefined,undefined,frame)).toContainText(qty)
}

}


//             
