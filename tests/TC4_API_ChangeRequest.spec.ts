import {expect, request} from "@playwright/test"

import appUrl from "../test-data/appUrl.json"
import {test} from "../helper/customeFixture"
import changeRequest from "../test-data/changeRequest.json"


let username:string
let password:string

let clientID:string
let clientSecret:any
let access_token:any
let newRecord:any
let table = "change_request"
const instanceUrl = appUrl.APIinstanceUrl


let tokenValue:any, tokenType:string , systemId:any

test("Create,Update and Delete Change request from API",async({apiRequest,fileReader})=>{

    username =   fileReader.readData("users", "Susername")
    password =  fileReader.readData("users", "password")
    clientID =  fileReader.readData("appClient", "client_id")
    clientSecret = fileReader.readData("appClient", "client_secret")

    await test.step("API methods to GET Access Token",async()=>{

        console.log("------------Generate Access Token--------------");
        
        access_token = await apiRequest.generateAccessToken(username,password,clientID,clientSecret)

    })
    await test.step("API methods Create and View Change request",async()=>{

        console.log("------------Create chnage Request--------------");

        newRecord = await apiRequest.POSTRequest(table, instanceUrl, access_token.tokenType, access_token.tokenValue,changeRequest.new)

        const getDetails = await apiRequest.getRequest(table, instanceUrl, access_token.tokenType, access_token.tokenValue, newRecord.sysid)
        console.log(getDetails)

    })

    await test.step("API methods to UPDATE change Request",async()=>{
        console.log("------------Update change request--------------");
        const updatedDetail = await apiRequest.patchRequest(table, instanceUrl,  access_token.tokenType, access_token.tokenValue, newRecord.sysid,changeRequest.update)


    })

    await test.step("API  Method to delete the change request",async()=>{
        console.log("------------Delete change request--------------");
        //Delete the created record
        await apiRequest.deleteRequest(table, instanceUrl, access_token.tokenType, access_token.tokenValue, newRecord.sysid)
    })


})

