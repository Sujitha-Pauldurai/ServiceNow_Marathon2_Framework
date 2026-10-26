import dotenv from "dotenv"

export class envFileMethods{


    async readFromFile(file:string){
       
        const result = dotenv.config({path:`test-data/${file}.env`,override: true})

        if (result.error) {
            throw result.error;
        }
        return result.parsed
    }
}