import dotenv from "dotenv"

export class envFileMethods{


    readFromFile(file:string){

        //const user = process.env.user || 'users';
       // const appClient = process.env.client || 'appClient';
       
        const result = dotenv.config({path:`test-data/${file}.env`})

        if (result.error) {
            throw result.error;
        }
        return result.parsed
    }

    readData(file:string,value:string){

        if (!process.env[value]) {
            const result = dotenv.config({path: `test-data/${file}.env`});

            if (result.error) throw result.error;
        }

        const data = process.env[value];

        if (!data) {
            throw new Error(`Missing environment variable: ${value}`);
        }

        return data;

    }
}