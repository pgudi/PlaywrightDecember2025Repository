const {Given, When, Then, setDefaultTimeout} = require('@cucumber/cucumber')
const {expect, chromium} = require('@playwright/test')
setDefaultTimeout(6000)
let browser,context, page
const {CustomerPage} = require('./../../pages/CustomerPage')
When("I launch chromium browser", async ()=> {
    browser =await chromium.launch({
        headless:false,
    })
    context = await browser.newContext()
    this.page=await context.newPage()
    this.customerPage = new CustomerPage(this.page)
    
});

When("I navigate Application url", async()=>{
    await this.page.goto("https://sgtestinginstituteapp.onrender.com/")
})

Then("I find the login page", async()=>{
    await expect(this.page).toHaveTitle("S G Software Testing Institute")
})

Then("I close application", async()=>{
    await this.page.close()
    await context.close()
})

When("I enter username in username text field", async()=>{
    await this.page.locator('input[name="username"]').fill("pgudi")
})

When("I enter password in password text field", async()=>{
    await this.page.locator('input[name="password"]').fill("pgudi")
})

When("I click on SignIn button", async()=>{
    await this.page.locator("//button[normalize-space()='Sign In']").click()
})

Then("I find the Home page", async()=>{
    await expect(this.page).toHaveURL("https://sgtestinginstituteapp.onrender.com/home")
})

When("I click on Logout option", async()=>{
    await this.page.locator("//button[normalize-space()='Logout']")
})

When("I click on Customer Menu", async()=>{
    await this.customerPage.clickOnCustomerMenu()
})

When("I click on Add Customer button", async()=>{
    await this.customerPage.clickOnAddCustomer()
})

When("I enter customerName in customer Name text field", async()=>{
    await this.customerPage.setCustomerName("Samsung1")
})

When("I enter emailId in emailID text field", async()=>{
    await this.customerPage.setCustomerEmailId("info1@samsung.com")
})

When("I enter location in location text field", async() =>{
    await this.customerPage.setCustomerLocation("Bangalore")
})
When("I enter description in description text field", async()=>{
    await this.customerPage.setCustomerDescription("Provides support on Smart phones")
})

When("I click on save button", {timeout:2000}, async()=>{
    await this.customerPage.saveCustomerRecord()
})

Then("I find newly created Customer", async()=>{
    const customerName=await this.page.locator("//td[normalize-space()='Samsung1']").textContent()
    console.log("Customer Name :"+ customerName)
    await expect(customerName).toContain("Samsung1")
})

When("I delete the newly created Cuustomer",{timeout:2000}, async()=>{
    await this.page.on("dialog", async(dialog)=>{
        const message=await dialog.message()
        console.log("Message :"+message);
        await dialog.accept()
        
    })
    await this.page.locator("//td[text()='Samsung1']/following-sibling::td/following-sibling::td/following-sibling::td/following-sibling::td/button[2]").click()
    
})

When("I enter {string} in username text field", async(username)=>{
    await this.page.locator('input[name="username"]').fill(username)
})

When("I enter {string} in password text field", async(password)=>{
    await this.page.locator('input[name="password"]').fill(password)
})