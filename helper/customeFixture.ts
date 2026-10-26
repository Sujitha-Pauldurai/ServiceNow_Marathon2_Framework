// Import page object classes used by the test framework.
import {test as base} from "@playwright/test"
import {LoginPage} from "../pages/login"
import { HomePage } from "../pages/homePage"
import { ServiceNow } from "../pages/serviceNow"
import { APIMethods } from "./APIHandler"
import { envFileMethods } from "./envFileHandler"

// Define the custom fixture types and their corresponding page objects.
type myFixture={
    login : LoginPage
    home : HomePage
    serviceNow : ServiceNow
    apiRequest : APIMethods
    fileReader : envFileMethods

}

// Extend the base Playwright test with reusable custom fixtures.
export const test=base.extend<myFixture>({

    // Create a instance's using the current browser page.
    login:async({page},use)=>{
    let objlp=new LoginPage(page)
    await use(objlp)

    },
    home:async({page},use)=>{
    let homelp=new HomePage(page)
    await use(homelp)

    },
    serviceNow:async({page},use)=>{
    let service=new ServiceNow(page)
    await use(service)

    },
    apiRequest:async({request},use)=>{
    let api=new APIMethods(request)
    await use(api)

    },
    fileReader:async({},use) =>{
        let envFile= new envFileMethods()
        await use(envFile)
    }



})