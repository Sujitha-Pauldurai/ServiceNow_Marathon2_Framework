import {expect, request} from "@playwright/test"
import appUrl from "../test-data/appUrl.json"

// Import the custom test fixture that provides reusable page objects.
import {test} from "../helper/customeFixture"

import dotenv from "dotenv"

let user= process.env.user || 'users' 

let appClient = process.env.client || 'appClient'

//config the environment file Details 
dotenv.config({path:`test-data/${user}.env`,override: true})

const username = process.env.Susername!
const password = process.env.password!

dotenv.config({path:`test-data/${appClient}.env`,override: true})

const clientID = process.env.client_id!
const clientSecret = process.env.client_secret!

let tokenValue:any, tokenType:string , systemId:any

test.describe.serial("Execute test in serial mode",async() =>{

test("To create barear token", async({request}) =>{

    let resBody = await request.post('https://dev400114.service-now.com/oauth_token.do',{
        headers:{
        "Content-Type" :"application/x-www-form-urlencoded"

        },
        form:{

        "grant_type":"password",
         //Update the client id and client secret before executing
        "client_id": clientID,
        "client_secret": clientSecret,
        "username":username,
        "password":password

        }
    })  
    
    //deserialization-> json to obj
    let tokenRes=await resBody.json()
    console.log(tokenRes)

    expect(resBody.status()).toBe(200)      
    console.log(resBody.status());

    expect(resBody.statusText()).toBe("OK")
    console.log(resBody.statusText());

    tokenType=tokenRes.token_type
    console.log(tokenType);

    tokenValue = tokenRes.access_token
    console.log(tokenValue);
    
    
})

test("Create a Problem ",async({request}) => {

    console.log(`${tokenType} ${tokenValue}`);
    

    let resBody =await request.post('https://dev400114.service-now.com/api/now/table/problem',{
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : `${tokenType} ${tokenValue}`
        },
        data:{
            "short_description": "Problem in Onboarding",
            "description": "Onboarding issue of new customer",
            "comments": "Updated via Playwright API request",
            "work_notes": "Checked mail server logs",
            "subcategory": "Problem",
            "impact": "3",
            "urgency": "1"
        }
    })

    let response = await resBody.json()
    console.log("New  Problem Details: \n",response);

expect(resBody.status()).toBe(201)
console.log(resBody.status())

expect(resBody.statusText()).toBe('Created')
console.log(resBody.statusText())

systemId=response.result.sys_id
console.log(systemId);
    

})

test("Get the created  Problem details",async({request})=>{

    let resBody =await request.get(`https://dev400114.service-now.com/api/now/table/problem/${systemId}`,{
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : `${tokenType} ${tokenValue}`
        }
    })

     let response = await resBody.json()
    console.log("Problem Details: \n",response);

    expect(resBody.status()).toBe(200)
    console.log(resBody.status())

    expect(resBody.statusText()).toBe('OK')
    console.log(resBody.statusText())

})

test("Update a Problem Details",async({request})=>{
    let resBody = await request.patch(`https://dev400114.service-now.com/api/now/table/problem/${systemId}`,{
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : `${tokenType} ${tokenValue}`
        },
        data:{
            "short_description": "update Onboarding issue - PW API",
            "description": "Onboarding of new customer is still pening - PW API",
            "comments": "Updated via PW - PATCH"
        }
    })
    let response = await resBody.json()
    console.log("Problem Details: \n",response);

    expect(resBody.status()).toBe(200)
    console.log(resBody.status())

    expect(resBody.statusText()).toBe('OK')
    console.log(resBody.statusText())

})

test("Verfiy the created problem in UI",async({login})=>{
    // Mark the test as slow to allow additional execution time since the application takes time to load every page
    test.slow()

    // Navigate to the application URL.
    await login.loadApplication(appUrl.url);

    console.log(process.env.Susername!, process.env.password!);
    

    // Log in using the credentials from the test data.
    await login.login(process.env.Susername!, process.env.password!)
    
})

test("Delete the  Problem",async({request})=>{
    let resBody = await request.delete(`https://dev400114.service-now.com/api/now/table/problem/${systemId}`,{
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : `${tokenType} ${tokenValue}`
        }
    })
    expect(resBody.status()).toBe(204)
    console.log(resBody.status())

    expect(resBody.statusText()).toBe('No Content')
    console.log(resBody.statusText())
})





})

