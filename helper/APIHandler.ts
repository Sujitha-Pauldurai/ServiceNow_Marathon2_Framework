import { expect, APIRequestContext } from "@playwright/test"
import client from "../test-data/apiClient.json"

export class APIMethods{

    protected request

    constructor(request:APIRequestContext){
        this.request = request
    }

    async generateAccessToken(){

    }
    
}