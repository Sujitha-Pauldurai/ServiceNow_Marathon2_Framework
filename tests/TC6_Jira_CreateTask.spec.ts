import {test} from "../helper/customeFixture"


test("Test case 6: Jira - Create task for implementing Sanity test Suite",async({JIRAMethods,fileReader}) =>{

    const baseUrl = fileReader.readData("jiraCredentials", "baseUrl");
    const username = fileReader.readData("jiraCredentials", "email");
    const apiToken = fileReader.readData("jiraCredentials", "apiToken");
    const projectKey = fileReader.readData("jiraCredentials", "projectKey");
    const issueType = "Task"
    let summary = "Task created from PW axios API"
    let description = "Implement the auotmation Sanity test suite"

    console.log('-------------Create Task---------------')

    const typeId = await JIRAMethods.POSTRequest({baseUrl, username, apiToken, projectKey, issueType,summary,description})

    console.log('-------------Get Task details---------------')
    const response = await JIRAMethods.getRequest({baseUrl,apiToken,username,projectKey,typeId})

    console.log(await response)

    console.log('-------------Update Task details---------------')
    summary = "Task created from PW axios API - Update"
    description = "Implement the auotmation Sanity test suite - 50% Completed"
    await JIRAMethods.putRequest({baseUrl,apiToken,username,projectKey,typeId,summary,description})

    console.log('-------------Delete Task details---------------')
    await JIRAMethods.deleteRequest({baseUrl,apiToken,username,projectKey,typeId})



})