import appUrl from "../test-data/appUrl.json"
import problemData from "../test-data/problem.json"

// Import the custom test fixture that provides reusable page objects.
import {test} from "../helper/customeFixture"
import { expect } from "@playwright/test"

test("Problem module",async({login,fileReader,apiRequest,home}) =>{

    let username: string;
    let password: string;
    let clientID: string;
    let clientSecret: string;
    const instanceUrl = appUrl.APIinstanceUrl
    const table = "problem"
    let access_token:any
    let newRecord:any
    await test.step("Read secret data from Environment files",async() =>{
        //const user = await fileReader.readFromFile("users")
        username =   fileReader.readData("users", "Susername")
        //user?.Susername!
        password =  fileReader.readData("users", "password")

        //const client = await fileReader.readFromFile("appClient")
        clientID =  fileReader.readData("appClient", "client_id")
        clientSecret =fileReader.readData("appClient", "client_secret")
    })

    await test.step("API methods GET Access Token/ POST,GET and UPDATE Problem",async()=>{
        access_token = await apiRequest.generateAccessToken(username,password,clientID,clientSecret)

        newRecord = await apiRequest.POSTRequest(table, instanceUrl, access_token.tokenType, access_token.tokenValue,problemData.new)

        const getDetails = await apiRequest.getRequest(table, instanceUrl, access_token.tokenType, access_token.tokenValue, newRecord.sysid)
        console.log(getDetails)

        const updatedDetail = await apiRequest.patchRequest(table, instanceUrl,  access_token.tokenType, access_token.tokenValue, newRecord.sysid,problemData.update)
        if(updatedDetail.status === 200){
            console.log("Value updated successfully");
            
        } 

    })

    await test.step("Verify the created problem in UI",async()=>{

        // UI side validation 
        await login.loadApplication(appUrl.url);

        await login.login(username,password)

        //await home.searchItem('PRB0000051')
        
        await home.searchItem(newRecord.itemid)
    })

    await test.step("Delete the created problem from API",async()=>{

        //Delete the created record
        await apiRequest.deleteRequest(table, instanceUrl, access_token.tokenType, access_token.tokenValue, newRecord.sysid)
    })

})