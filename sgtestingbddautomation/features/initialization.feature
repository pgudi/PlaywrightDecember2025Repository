Feature: Initialization of Browser and NAvigate URL

  Scenario: Launch Browser and Navigate Application URL
    When I launch chromium browser
    When I navigate Application url
    Then I find the login page
    Then I close application