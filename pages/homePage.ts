import { expect } from "@playwright/test";
import ElementHandler from "../helper/elementHandler";
import { Locator } from "../locators/locators";


export class HomePage extends ElementHandler{

     /**
     * Description: Opens the application menu, filters the available options,
     * and navigates to the Service Catalog.
     * @param value - The search text used to filter the application menu.
     */
    async openServiceCatalog(value:string){

        await this.waitUntilPageLoad()

        // Open the All menu using its menu item role and accessible name.
        await this.click(Locator.PWLocators.role,Locator.role.menuitem,Locator.menu.all_Name)
        await expect(await this.findElement(Locator.menu.filter)).toBeVisible()
        await this.enterText(Locator.menu.filter,value)
        
        // Click the Service Catalog link within the identified list.
        const sc1 = await this.findElement(Locator.PWLocators.role,Locator.role.list,Locator.menu.scListName)
        await this.click(Locator.PWLocators.role,Locator.role.link,Locator.menu.serviceCatalogName,sc1)
        //await sc1.getByRole('link',{name : Locator.menu.serviceCatalogName}).click()

    }

    async searchItem(searchText:string){
        const searchBox = await this.findElement(Locator.instacePage.search)
        
        await searchBox.waitFor({state:'visible'})
        await searchBox.focus()
        await searchBox.click()
        await (await this.findElement(Locator.instacePage.searchResultDIv)).first().waitFor({state:'visible'})
        //await searchBox.focus()
        await searchBox.fill(searchText)
       
        const searchResultDiv = await this.findElement(Locator.instacePage.searchResultDIv)
        await searchResultDiv.waitFor({state:"visible"})
        if(searchResultDiv.filter({hasText : `${searchText}`})){
         await searchResultDiv.filter({hasText : `${searchText}`}).click()
        }
        else{
            console.log(`The item ${searchText} not found`);
            
        }

        
    
    }

}