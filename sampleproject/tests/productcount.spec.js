const {test, expect} = require("@playwright/test")
const { request } = require("http")

test("Find Number of Products ", async({request})=>{
    const resposne = await request.get("https://fakestoreapi.com/products",{
        headers:{
            "Content-Type": "application/json"
        }
    })

    const productResposne=(await resposne.text()).toString()
    console.log("Product Resposne :"+productResposne);
    let count=0
    for(let product of await resposne.json()){
        count+=1
    }
    console.log("Number of Product :"+count);
    
})