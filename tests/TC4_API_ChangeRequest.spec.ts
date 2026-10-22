import {test,expect, request} from "@playwright/test"

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

    console.log(username,password,clientID,clientSecret);
    

    let resBody = await request.post('https://dev400114.service-now.com/oauth_token.do',{
        headers:{
        "Content-Type" :"application/x-www-form-urlencoded"

        },
        form:{

        "grant_type":"password",
            //Update the client id and client secret before executing
        "client_id":clientID,
        "client_secret":clientSecret,
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

test("Create Change Request",async({request}) => {

    console.log(`${tokenType} ${tokenValue}`);
    

    let resBody =await request.post('https://dev400114.service-now.com/api/now/table/change_request',{
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : `${tokenType} ${tokenValue}`
        },
        data:{
            "short_description": "Laptop not working",
            "description": "Laptop change Request created from API Playwright",
            "comments": "Updated via POSTMAN",
            "work_notes": "Checked mail server logs",
            "subcategory": "Change request",
            "impact": "2",
            "urgency": "2"
        }
    })

    let response = await resBody.json()
    console.log("New Change Request Details: \n",response);

expect(resBody.status()).toBe(201)
console.log(resBody.status())

expect(resBody.statusText()).toBe('Created')
console.log(resBody.statusText())

systemId=response.result.sys_id
console.log(systemId);
    

})

test("Get the created Change request details",async({request})=>{

    let resBody =await request.get(`https://dev400114.service-now.com/api/now/table/change_request/${systemId}`,{
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : `${tokenType} ${tokenValue}`
        }
    })

     let response = await resBody.json()
    console.log("Change Request Details: \n",response);

    expect(resBody.status()).toBe(200)
    console.log(resBody.status())

    expect(resBody.statusText()).toBe('OK')
    console.log(resBody.statusText())

})

test("Update change request Details",async({request})=>{
    let resBody = await request.patch(`https://dev400114.service-now.com/api/now/table/change_request/${systemId}`,{
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : `${tokenType} ${tokenValue}`
        },
        data:{
            "short_description": "Laptop not working - PW API",
            "description": "Laptop change Request  Updated from PW API",
            "comments": "Updated via PW - PATCH"
        }
    })
    let response = await resBody.json()
    console.log("Change Request Details: \n",response);

    expect(resBody.status()).toBe(200)
    console.log(resBody.status())

    expect(resBody.statusText()).toBe('OK')
    console.log(resBody.statusText())

})

test("Delete the change request",async({request})=>{
    let resBody = await request.delete(`https://dev400114.service-now.com/api/now/table/change_request/${systemId}`,{
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

