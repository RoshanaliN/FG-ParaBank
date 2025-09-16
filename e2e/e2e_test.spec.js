import { test, expect } from '@playwright/test'
import { support_utils } from '../utils/support_utils'
import { PO_Manager } from '../page_objects/PO_Manager'

test.only('Step1: Register User on Para-Bank', async ({ page }) => {
    const username = 'Admin123' + new support_utils().generateRandomString(5)
    const password = 'Test@123'
    const poManager = new PO_Manager(page)

    await poManager.getHomePage().launch()
    await poManager.getHomePage().clickLeftPanelButton("register")

    await poManager.getRegistrationPage().verifyPageLoaded()
    await poManager.getRegistrationPage().fillDetails(username, password)
    await poManager.getRegistrationPage().clickRegiterAndVerify()

    await poManager.getHomePage().clickLeftPanelButton("logout")

    await poManager.getHomePage().loginIntoAccount(username, password)

    await poManager.getAccountOverviewPage().verifyPageLoaded()
    const accountId0 = await poManager.getAccountOverviewPage().getAccountId(0)
    await poManager.getAccountOverviewPage().verifyRowDetails(accountId0, '$515.50')
    
    await poManager.getHomePage().clickLeftPanelButton('openaccount')
    await poManager.getNewAccountPage().verifyPageLoaded()
    await poManager.getNewAccountPage().addNewAccount('SAVINGS', accountId0)
    const accountId1 = await poManager.getNewAccountPage().getNewAccountId()
    await expect(accountId1).not.toBeNull()

    await poManager.getHomePage().clickLeftPanelButton('overview')
    await poManager.getAccountOverviewPage().verifyPageLoaded()
    await poManager.getAccountOverviewPage().verifyRowDetails(accountId0, '$415.50')
    await poManager.getAccountOverviewPage().verifyRowDetails(accountId1, '$100.00')

    await poManager.getHomePage().clickLeftPanelButton('transfer')
    await poManager.getTransferFundsPage().verifyPageLoaded()
    await poManager.getTransferFundsPage().enterTransferDetails('10', accountId0, accountId1)
    await poManager.getTransferFundsPage().completeTransferAndConfirm()

    await poManager.getHomePage().clickLeftPanelButton('overview')
    await poManager.getAccountOverviewPage().verifyPageLoaded()
    await poManager.getAccountOverviewPage().verifyRowDetails(accountId0, '$405.50')
    await poManager.getAccountOverviewPage().verifyRowDetails(accountId1, '$110.00')

    await poManager.getHomePage().clickLeftPanelButton('billpay')
    await poManager.getBillPaymentPage().verifyPageLoaded()
    await poManager.getBillPaymentPage().enterPaymentDetails(accountId0, '15')
    await poManager.getBillPaymentPage().sendPaymentAndConfirm()

    await poManager.getHomePage().clickLeftPanelButton('overview')
    await poManager.getAccountOverviewPage().verifyPageLoaded()
    await poManager.getAccountOverviewPage().verifyRowDetails(accountId0, '$395.50')
    await poManager.getAccountOverviewPage().verifyRowDetails(accountId1, '$110.00')
    
    // To Do API
    // https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/14232/transactions/onDate/16-09-2025?timeout=30000
})