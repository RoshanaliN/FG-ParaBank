Feature: E2E Scenario
    UI and API automation for ParaBank

Scenario: Testing ParaBank E2E features
Given user navigate to ParaBank homepage
When user navigate to registeration page 
And user fill registeration details with "Admin123" and "Test@123"
Then user click on register button and verify user registered
When user log in with created username and "Test@123"
Then user verify login successful
Then user verify global navigation button
When user create new "SAVINGS" bank account
Then user get the new accountId
Then user verify account overview details having "$400.00" and "$100.00"
When user transfer "10" between accounts
Then user verify account overview details having "$410.00" and "$90.00"
When user pays bill of "15" from new account
Then user verify account overview details having "$410.00" and "$75.00"
When user search transaction of "15" for new account
Then user verify content of api response from network