Feature: Verify and validate Login and Logout functionalities

  Scenario: Verify Login and Logout functioanlities
    When I launch chromium browser
    When I navigate Application url
    Then I find the login page
    When I enter username in username text field
    When I enter password in password text field
    When I click on SignIn button
    Then I find the Home page
    When I click on Logout option
    Then I find the login page
    Then I close application
