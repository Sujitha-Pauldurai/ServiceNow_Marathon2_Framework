import dotenv from "dotenv"

export class envFileMethods{


    async readFromFile(file:string){

        //const user = process.env.user || 'users';
       // const appClient = process.env.client || 'appClient';
       
        const result = dotenv.config({path:`test-data/${file}.env`})

        if (result.error) {
            throw result.error;
        }
        return result.parsed
    }

    readData(file:string,value:string){

        const userName = process.env[value] || file

        const result = dotenv.config({path:`test-data/${file}.env`})

        console.log(`${value} is ${process.env[value]}`);
        
        return process.env[value]!

    }
}