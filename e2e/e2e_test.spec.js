import { test, expect } from '@playwright/test'
import { support_utils } from '../utils/support_utils'
import { home_page } from '../page_objects/home_page'
import { registeration_page } from '../page_objects/registeration_page'
import { new_account_page } from '../page_objects/new_account_page'
import { account_overview_page } from '../page_objects/account_overview_page'
import { bill_payment_page } from '../page_objects/bill_payment_page'
import { transfer_funds_page } from '../page_objects/transfer_funds_page'

test.only('Step1: Register User on Para-Bank', async ({ page }) => {
    const username = 'Admin123' + new support_utils().generateRandomString(5)
    const password = 'Test@123'
    const overviewRows = page.locator('#accountTable tr')

    const homePage = new home_page(page)
    const registerationPage = new registeration_page(page)
    const newAccountPage = new new_account_page(page)
    const accountOverviewPage = new account_overview_page(page)
    const billPaymentPage = new bill_payment_page(page)
    const transferFundsPage = new transfer_funds_page(page)

    await homePage.launch()
    // await page.goto('https://parabank.parasoft.com/parabank/register.htm')
    // await expect(page.locator('#footerPanel p')).toContainText('Parasoft. All rights reserved.')
    await homePage.clickLeftPanelButton("register")
    // await page.locator('a[href*=register]').click()

    await registerationPage.verifyPageLoaded()
    await registerationPage.fillDetails(username, password)
    await registerationPage.clickRegiterAndVerify()
    // await expect(page.locator('#rightPanel .title')).toContainText('Signing up is easy!')
    // await expect(page).toHaveTitle('ParaBank | Register for Free Online Account Access')
    // await page.locator('#customer\\.firstName').waitFor()
    // await page.locator('#customer\\.firstName').fill('Roshan')
    // await page.locator('#customer\\.lastName').fill('Ali')
    // await page.locator('#customer\\.address\\.street').fill('Test Street')
    // await page.locator('#customer\\.address\\.city').fill('Kolhapur')
    // await page.locator('#customer\\.address\\.state').fill('MH')
    // await page.locator('#customer\\.address\\.zipCode').fill('123456')
    // await page.locator('#customer\\.phoneNumber').fill('1234567895')
    // await page.locator('#customer\\.ssn').fill('ADFT456423')
    // await page.locator('#customer\\.username').fill(username)
    // await page.locator('#customer\\.password').fill('Test@123')
    // await page.locator('#repeatedPassword').fill('Test@123')
    // await page.locator('.button').last().click()
    // await page.locator('#rightPanel .title').waitFor()
    // await expect(page.locator('#rightPanel .title')).toContainText('Welcome ' + username)
    // await expect(page.locator('#rightPanel p')).toHaveText('Your account was created successfully. You are now logged in.')
    // await expect(page.locator('#leftPanel p')).toContainText('Welcome Roshan Ali')

    await homePage.clickLeftPanelButton("logout")
    // await page.locator('#leftPanel a[href*=logout]').click()

    await homePage.loginIntoAccount(username, password)
    // await page.locator('input[name=username]').fill(userName)
    // await page.locator('input[name=password]').fill("Test@123")
    // await page.locator('input[value="Log In"]').click()
    // await expect(page.locator('#leftPanel p')).toContainText('Welcome Roshan Ali')

    await accountOverviewPage.verifyPageLoaded()
    const accountId0 = await accountOverviewPage.getAccountId(0)
    await accountOverviewPage.verifyRowDetails(accountId0, '$515.50')
    // await expect(page.locator('#showOverview .title')).toHaveText('Accounts Overview')
    // const accountId0 = await page.locator('a[href*=id]').textContent() //26775
    // await expect(overviewRows.nth(1).locator('td').nth(1)).toHaveText('$515.50')
    // await expect(overviewRows.nth(1).locator('td').last()).toHaveText('$515.50')

    await homePage.clickLeftPanelButton(openaccount)
    // await page.locator('#leftPanel a[href*=openaccount]').click()

    await newAccountPage.verifyPageLoaded()
    await newAccountPage.addNewAccount('SAVINGS')
    const accountId1 = await newAccountPage.getNewAccountId()
    // await expect(page.locator('#openAccountForm .title')).toHaveText('Open New Account')
    // await page.selectOption('select#type', { label: 'SAVINGS' })
    // await page.selectOption('select#fromAccountId', accountId0)
    // await page.locator('input.button').click()
    // await expect(page.locator('input[value="Open New Account"]')).not.toBeVisible()
    // await expect(page.locator('#openAccountResult .title')).toHaveText('Account Opened!')
    // const accountId1 = await page.locator('#newAccountId').textContent()
    await expect(accountId1).not.toBeNull()

    await homePage.clickLeftPanelButton(overview)
    await accountOverviewPage.verifyPageLoaded()
    await accountOverviewPage.verifyRowDetails(accountId0, '$415.50')
    await accountOverviewPage.verifyRowDetails(accountId1, '$100.00')
    // await page.locator('#leftPanel a[href*=overview]').click()
    // await expect(page.locator('#showOverview .title')).toContainText('Accounts Overview')
    // const rowLength = overviewRows.count()
    // for (let i = 0; i < rowLength; i++) {
    //     let rowAccountId = await overviewRows.nth(i).locator('a[href*=id]').textContent()
    //     if (rowAccountId === accountId0) {
    //         await expect(overviewRows.nth(i).locator('td').nth(1)).toHaveText('$415.50')
    //         await expect(overviewRows.nth(i).locator('td').last()).toHaveText('$415.50')
    //     } else if (rowAccountId === accountId1) {
    //         await expect(overviewRows.nth(i).locator('td').nth(1)).toHaveText('$100.00')
    //         await expect(overviewRows.nth(i).locator('td').last()).toHaveText('$100.00')
    //     }
    // }

    await homePage.clickLeftPanelButton(transfer)
    await transferFundsPage.verifyPageLoaded()
    await transferFundsPage.enterTransferDetails('10',accountId0,accountId1)
    await transferFundsPage.completeTransferAndConfirm()
    // await page.locator('#leftPanel a[href*=transfer]').click()
    // await expect(page.locator('#showForm .title')).toContainText('Transfer Funds')
    // await page.locator('#amount').first().fill("10")
    // await page.selectOption('select#fromAccountId', accountId0)
    // await page.selectOption('select#toAccountId', accountId1)
    // await page.locator('input[value="Transfer"]').click()
    // await page.locator('#showResult .title').waitFor()
    // await expect(page.locator('#showResult .title')).toHaveText('Transfer Complete!')

    await homePage.clickLeftPanelButton(overview)
    await accountOverviewPage.verifyPageLoaded()
    await accountOverviewPage.verifyRowDetails(accountId0, '$405.50')
    await accountOverviewPage.verifyRowDetails(accountId1, '$110.00')
    // await page.locator('#leftPanel a[href*=overview]').click()
    // await expect(page.locator('#showOverview .title')).toContainText('Accounts Overview')
    // for (let i = 0; i < rowLength; i++) {
    //     let rowAccountId = await overviewRows.nth(i).locator('a[href*=id]').textContent()
    //     if (rowAccountId === accountId0) {
    //         await expect(overviewRows.nth(i).locator('td').nth(1)).toHaveText('$405.50')
    //         await expect(overviewRows.nth(i).locator('td').last()).toHaveText('$405.50')
    //     } else if (rowAccountId === accountId1) {
    //         await expect(overviewRows.nth(i).locator('td').nth(1)).toHaveText('$110.00')
    //         await expect(overviewRows.nth(i).locator('td').last()).toHaveText('$110.00')
    //     }
    // }

    await homePage.clickLeftPanelButton(billpay)
    await billPaymentPage.verifyPageLoaded()
    await billPaymentPage.enterPaymentDetails(accountId0)
    await billPaymentPage.sendPaymentAndConfirm()
    // await page.locator('#leftPanel a[href*=billpay]').click()
    // await expect(page.locator('#billpayForm .title')).toHaveText('Bill Payment Service')
    // await page.locator('input[name*=name]').fill("John")
    // await page.locator('input[name*=street]').fill("New Street")
    // await page.locator('input[name*=city]').fill("New City")
    // await page.locator('input[name*=state]').fill("New State")
    // await page.locator('input[name*=zipCode]').fill("454123")
    // await page.locator('input[name*=phoneNumber]').fill("9897465623")
    // await page.locator('input[name*=accountNumber]').fill("13588")
    // await page.locator('input[name=verifyAccount]').fill("13588")
    // await page.locator('input[name=amount]').fill("15")
    // await page.selectOption('select[name=fromAccountId]', accountId0)
    // await page.locator('input[value="Send Payment"]').click()
    // await page.locator('#billpayResult .title').waitFor()
    // await expect(page.locator('#billpayResult .title')).toHaveText('Bill Payment Complete')

    await homePage.clickLeftPanelButton(overview)
    await accountOverviewPage.verifyPageLoaded()
    await accountOverviewPage.verifyRowDetails(accountId0, '$395.50')
    await accountOverviewPage.verifyRowDetails(accountId1, '$110.00')
    // await page.locator('#leftPanel a[href*=overview]').click()
    // await expect(page.locator('#showOverview .title')).toContainText('Accounts Overview')
    // for (let i = 0; i < rowLength; i++) {
    //     let rowAccountId = await overviewRows.nth(i).locator('a[href*=id]').textContent()
    //     if (rowAccountId === accountId0) {
    //         await expect(overviewRows.nth(i).locator('td').first()).toHaveText('$395.50')
    //         await expect(overviewRows.nth(i).locator('td').last()).toHaveText('$395.50')
    //     } else if (rowAccountId === accountId1) {
    //         await expect(overviewRows.nth(i).locator('td').first()).toHaveText('$110.00')
    //         await expect(overviewRows.nth(i).locator('td').last()).toHaveText('$110.00')
    //     }
    // }

    // To Do API
    // https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/14232/transactions/onDate/16-09-2025?timeout=30000


    await page.pause()
})