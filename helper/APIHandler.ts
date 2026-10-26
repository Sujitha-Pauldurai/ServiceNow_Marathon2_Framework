import { expect, APIRequestContext } from "@playwright/test"


export class APIMethods{

    protected request

    constructor(request:APIRequestContext){
        this.request = request
    }

    async generateAccessToken(username:string,password:string,clientID:string,clientSecret:any){
 

    let tokenValue:any, tokenType:string , systemId:any
    

    let resBody = await this.request.post('https://dev400114.service-now.com/oauth_token.do',{
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

    expect(resBody.status()).toBe(200)  
    expect(resBody.statusText()).toBe("OK")

    return {tokenType:tokenRes.token_type,tokenValue:tokenRes.access_token}
    }

    async POSTRequest(table:string,instanceUrl:string,tokenType:string,tokenValue:string,data:object){

        let resBody =await this.request.post(`${instanceUrl}${table}`,{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `${tokenType} ${tokenValue}`
                },
                data:data
            })
        
        let response = await resBody.json()
        
        expect(resBody.status()).toBe(201)
        expect(resBody.statusText()).toBe('Created')

        const newRecordId = response.result.sys_id
        const number = response.result.number

        return {sysid:newRecordId,itemid:number}
    }

    async getRequest(table:string,instanceUrl:string,tokenType:string,tokenValue:string,id:string){

         let resBody =await this.request.get(`${instanceUrl}${table}/${id}`,{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `${tokenType} ${tokenValue}`
                }
            })
        
            let response = await resBody.json()
            expect(resBody.status()).toBe(200)
            expect(resBody.statusText()).toBe('OK')
            
        return response

    }

    async patchRequest(table:string,instanceUrl:string,tokenType:string,tokenValue:string,id:string,data:object){
         let resBody = await this.request.patch(`${instanceUrl}${table}/${id}`,{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `${tokenType} ${tokenValue}`
                },
                data:data
            })
            let response = await resBody.json()
            expect(resBody.status()).toBe(200)
            expect(resBody.statusText()).toBe('OK')

            return response
    }

    async deleteRequest(table:string,instanceUrl:string,tokenType:string,tokenValue:string,id:string){
        let resBody = await this.request.delete(`${instanceUrl}${table}/${id}`,{
                headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `${tokenType} ${tokenValue}`
                }
            })
            expect(resBody.status()).toBe(204)
            console.log(resBody.status())
        
            expect(resBody.statusText()).toBe('No Content')
            console.log(resBody.statusText())
    }

    
    
}