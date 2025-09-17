import { Given, When, Then } from "@cucumber/cucumber";
import playwright from 'playwright'
import { expect } from "@playwright/test"
import { PO_Manager } from "../../page_objects/PO_Manager.js";
import { support_utils } from "../../utils/support_utils.js";

Given('user navigate to ParaBank homepage', async function () {
    const browser = await playwright.chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    this.page = await context.newPage()
    this.poManager = await new PO_Manager(this.page)
    await this.poManager.getHomePage().launch()
});

When('user navigate to registeration page', async function () {
    await this.poManager.getHomePage().clickLeftPanelButton("register")
    await this.poManager.getRegistrationPage().verifyPageLoaded()
});

When('user fill registeration details with {string} and {string}', async function (username, password) {
    this.username = username + new support_utils().generateRandomString(5)
    await this.poManager.getRegistrationPage().fillDetails(this.username, password)
});

Then('user click on register button and verify user registered', async function () {
    await this.poManager.getRegistrationPage().clickRegiterAndVerify()
    await this.poManager.getHomePage().clickLeftPanelButton("logout")
});

When('user log in with created username and {string}', async function (password) {
    await this.poManager.getHomePage().loginIntoAccount(this.username, password)

});


Then('user verify login successful', async function () {
    await this.poManager.getAccountOverviewPage().verifyPageLoaded()
    this.accountId0 = await this.poManager.getAccountOverviewPage().getAccountId(0)
    await this.poManager.getAccountOverviewPage().verifyRowDetails(this.accountId0, '$500.00')
});

Then('user verify global navigation button', async function () {
    await this.poManager.getHomePage().verifyGlobalNavigation()
});


When('user create new {string} bank account', async function (accountType) {
    await this.poManager.getHomePage().clickLeftPanelButton('openaccount')
    await this.poManager.getNewAccountPage().verifyPageLoaded()
    await this.poManager.getNewAccountPage().addNewAccount(accountType, this.accountId0)
});


Then('user get the new accountId', async function () {
    this.accountId1 = await this.poManager.getNewAccountPage().getNewAccountId()
    await expect(this.accountId1).not.toBeNull()
});

Then('user verify account overview details having {string} and {string}', async function (amount0, amount1) {
    await this.poManager.getHomePage().clickLeftPanelButton('overview')
    await this.poManager.getAccountOverviewPage().verifyPageLoaded()
    await this.poManager.getAccountOverviewPage().verifyRowDetails(this.accountId0, amount0)
    await this.poManager.getAccountOverviewPage().verifyRowDetails(this.accountId1, amount1)
});

When('user pays bill of {string} from new account', async function (billAmount) {
    await this.poManager.getHomePage().clickLeftPanelButton('billpay')
    await this.poManager.getBillPaymentPage().verifyPageLoaded()
    await this.poManager.getBillPaymentPage().enterPaymentDetails(this.accountId1, billAmount)
    await this.poManager.getBillPaymentPage().sendPaymentAndConfirm()
});

When('user transfer {string} between accounts', async function (transferAmount) {
    await this.poManager.getHomePage().clickLeftPanelButton('transfer')
    await this.poManager.getTransferFundsPage().verifyPageLoaded()
    await this.poManager.getTransferFundsPage().enterTransferDetails(transferAmount, this.accountId1, this.accountId0)
    await this.poManager.getTransferFundsPage().completeTransferAndConfirm()
});

When('user search transaction of {string} for new account', async function (searchAmount) {
    this.searchAmount = searchAmount
    await this.poManager.getHomePage().clickLeftPanelButton('findtrans')
    await this.poManager.getFindTransactionPage().selectAccountAndEnterAmount(this.accountId1, searchAmount)
    this.response = await this.poManager.getFindTransactionPage().getApiResponse()
});

Then('user verify content of api response from network', function () {
    expect(this.response[0].type).toBe('Debit')
    expect(this.response[0].accountId).toBe(Number(this.accountId1))
    expect(this.response[0].amount).toBe(Number(this.searchAmount))
    expect(this.response[0].description).toBe('Bill Payment to John')
});