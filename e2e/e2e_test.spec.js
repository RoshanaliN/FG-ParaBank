import { test, expect, request } from '@playwright/test'
import { support_utils } from '../utils/support_utils'
import { PO_Manager } from '../page_objects/PO_Manager'
import { api_test } from '../api_test/api_test'

test('E2E Para Bank', async ({ context }) => {
    const page = await context.newPage()
    const username = 'Admin123' + new support_utils().generateRandomString(5)
    const password = 'Test@123'
    const poManager = new PO_Manager(page)
    const apiTest = new api_test(request)

    // UI - Step 1
    await poManager.getHomePage().launch()
    await poManager.getHomePage().clickLeftPanelButton("register")

    // UI - Step 2
    await poManager.getRegistrationPage().verifyPageLoaded()
    await poManager.getRegistrationPage().fillDetails(username, password)
    await poManager.getRegistrationPage().clickRegiterAndVerify()
    await poManager.getHomePage().clickLeftPanelButton("logout")

    // UI - Step 3
    await poManager.getHomePage().loginIntoAccount(username, password)
    await poManager.getAccountOverviewPage().verifyPageLoaded()
    const accountId0 = await poManager.getAccountOverviewPage().getAccountId(0)
    await poManager.getAccountOverviewPage().verifyRowDetails(accountId0, '$500.00')

    // UI - Step 4
    await poManager.getHomePage().verifyGlobalNavigation()

    // UI - Step 5
    await poManager.getHomePage().clickLeftPanelButton('openaccount')
    await poManager.getNewAccountPage().verifyPageLoaded()
    await poManager.getNewAccountPage().addNewAccount('SAVINGS', accountId0)
    var accountId1 = await poManager.getNewAccountPage().getNewAccountId()
    await expect(accountId1).not.toBeNull()

    // UI - Step 6
    await poManager.getHomePage().clickLeftPanelButton('overview')
    await poManager.getAccountOverviewPage().verifyPageLoaded()
    await poManager.getAccountOverviewPage().verifyRowDetails(accountId0, '$400.00')
    await poManager.getAccountOverviewPage().verifyRowDetails(accountId1, '$100.00')

    // UI - Step 7
    await poManager.getHomePage().clickLeftPanelButton('transfer')
    await poManager.getTransferFundsPage().verifyPageLoaded()
    await poManager.getTransferFundsPage().enterTransferDetails('10', accountId1, accountId0)
    await poManager.getTransferFundsPage().completeTransferAndConfirm()

    await poManager.getHomePage().clickLeftPanelButton('overview')
    await poManager.getAccountOverviewPage().verifyPageLoaded()
    await poManager.getAccountOverviewPage().verifyRowDetails(accountId0, '$410.00')
    await poManager.getAccountOverviewPage().verifyRowDetails(accountId1, '$90.00')

    // UI - Step 8
    await poManager.getHomePage().clickLeftPanelButton('billpay')
    await poManager.getBillPaymentPage().verifyPageLoaded()
    await poManager.getBillPaymentPage().enterPaymentDetails(accountId1, '15')
    await poManager.getBillPaymentPage().sendPaymentAndConfirm()

    await poManager.getHomePage().clickLeftPanelButton('overview')
    await poManager.getAccountOverviewPage().verifyPageLoaded()
    await poManager.getAccountOverviewPage().verifyRowDetails(accountId0, '$410.00')
    await poManager.getAccountOverviewPage().verifyRowDetails(accountId1, '$75.00')

    // API - Step 1
    await poManager.getHomePage().clickLeftPanelButton('findtrans')
    await poManager.getFindTransactionPage().selectAccountAndEnterAmount(accountId1, '15')
    const response = await poManager.getFindTransactionPage().getApiResponse()
    // API - Step 2
    expect(response[0].type).toBe('Debit')
    expect(response[0].accountId).toBe(Number(accountId1))
    expect(response[0].amount).toBe(15)
    expect(response[0].description).toBe('Bill Payment to John')

    // API - Step 1
    const cookies = await context.cookies();
    const jsessionCookie = cookies.find(cookie => cookie.name === 'JSESSIONID');
    const apiResponse = await apiTest.transactionSerachUsingAmount(accountId1, '15', jsessionCookie.value)
    // API - Step 2
    expect(apiResponse[0].type).toBe('Debit')
    expect(apiResponse[0].accountId).toBe(Number(accountId1))
    expect(apiResponse[0].amount).toBe(15)
    expect(apiResponse[0].description).toBe('Bill Payment to John')
})