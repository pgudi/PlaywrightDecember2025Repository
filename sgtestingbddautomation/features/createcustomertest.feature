Feature: Verify and validate Create Customer functionalities

  Scenario: Verify Create Customer functioanlities
    When I launch chromium browser
    When I navigate Application url
    Then I find the login page
    When I enter username in username text field
    When I enter password in password text field
    When I click on SignIn button
    Then I find the Home page
    When I click on Customer Menu
    When I click on Add Customer button
    When I enter customerName in customer Name text field
    When I enter emailId in emailID text field
    When I enter location in location text field
    When I enter description in description text field
    When I click on save button
    Then I find newly created Customer
    When I delete the newly created Cuustomer
    When I click on Logout option
    Then I find the login page
    Then I close application
