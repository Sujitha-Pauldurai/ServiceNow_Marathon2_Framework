import appUrl from "../test-data/appUrl.json"
import problemData from "../test-data/problem.json"

// Import the custom test fixture that provides reusable page objects.
import {test} from "../helper/customeFixture"
import { expect } from "@playwright/test"

test("Problem module",async({login,fileReader,apiRequest,home}) =>{

    
    //const user = await fileReader.readFromFile("users")
    const username =   fileReader.readData("users", "Susername")
    //user?.Susername!
    const password =  fileReader.readData("users", "password")

    //const client = await fileReader.readFromFile("appClient")
    const clientID =  fileReader.readData("appClient", "client_id")
    const clientSecret =fileReader.readData("appClient", "client_secret")

    const access_token = await apiRequest.generateAccessToken(username,password,clientID,clientSecret)

    console.log(access_token.tokenType, access_token.tokenValue);

    const instanceUrl = appUrl.APIinstanceUrl
    const table = "problem"

    const newRecord = await apiRequest.POSTRequest(table, instanceUrl, access_token.tokenType, access_token.tokenValue,problemData.new)

    const getDetails = await apiRequest.getRequest(table, instanceUrl, access_token.tokenType, access_token.tokenValue, newRecord.sysid)
    console.log(getDetails)

    const updatedDetail = await apiRequest.patchRequest(table, instanceUrl,  access_token.tokenType, access_token.tokenValue, newRecord.sysid,problemData.update)
    if(updatedDetail.status === 200){
        console.log("Value updated successfully");
        
    } 

    // UI side validation 
    await login.loadApplication(appUrl.url);

    const userResult = await fileReader.readFromFile("users")

    await login.login(userResult?.Susername!,userResult?.password!)

    //await home.searchItem('PRB0000051')
    
    await home.searchItem(newRecord.itemid)

    //Delete the created record

    await apiRequest.deleteRequest(table, instanceUrl, access_token.tokenType, access_token.tokenValue, newRecord.sysid)


})