const {test, expect} = require('@playwright/test');
const { request } = require('node:http');
let accessToken;
let custId;
test("Generate Token", async({request})=>{
    const response=request.post("https://sgtestinginstitute.onrender.com/api/v1/authenticate",
        {
            data:{
                "username": "pgudi",
                "password": "pgudi"
            }
        }
    )
    accessToken=(await (await response).text()).toString();
    console.log("Token Value :"+accessToken);
    
})
test("Create Customer Endpoint", async({request})=>{
    console.log("This Function is responsible for Creating Customer");
    
    const response=await request.post("https://sgtestinginstitute.onrender.com/api/v1/customers",
        {
            data:{
                    "customerName": "TestCustomer001",
                    "emailId": "testcustomer004@gmail.com",
                    "location": "Belguam",
                    "customerDescription": "Provides suppport on Education Sector"
            },
            headers:{
                "Content-Type":"application/json",
                "authorization": "Bearer "+accessToken
            }
        }
    )
    const customerResposne=await response.json()
    custId = customerResposne.customerId;
    console.log("Customer ID :"+custId);
    console.log("Customer Response :"+(await response.text()).toString())
    await expect(response.status()).toBe(201)
    
})

test("display a Specific Customer", async({request})=>{
    console.log("This Function is responsible for displaying Customer");
    const response=await request.get("https://sgtestinginstitute.onrender.com/api/v1/customers/"+custId,
        {
            headers:{
                "Content-Type":"application/json",
                "authorization": "Bearer "+accessToken
            }
        }
    )
    const responseContent = (await response.text()).toString()
    console.log("Customer Display Content :"+responseContent);
    
})

test("Deelte a Specific Customer", async({request})=>{
    console.log("This Function is responsible for deleting Customer");
    const response=await request.delete("https://sgtestinginstitute.onrender.com/api/v1/customers/"+custId,
        {
            headers:{
                "Content-Type":"application/json",
                "authorization": "Bearer "+accessToken
            }
        }
    )
    const responseContent = (await response.text()).toString()
    console.log("Customer Delete Content :"+responseContent);
    
})