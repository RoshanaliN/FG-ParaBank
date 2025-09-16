import { expect } from '@playwright/test';

export class new_account_page {

    constructor(page) {
        this.page = page
        this.button = page.locator('input.button')
        this.openNewAccountButton = page.locator('input[value="Open New Account"]')
        this.openAcctResultTitle = page.locator('#openAccountResult .title')
        this.openAcctFormTitle = page.locator('#openAccountForm .title')
        this.newAccountId = page.locator('#newAccountId')
    }

    async verifyPageLoaded() {
        await this.openAcctFormTitle.waitFor()
        await expect(this.openAcctFormTitle).toHaveText('Open New Account')
    }

    async addNewAccount(accountType,accountId) {
        await this.page.selectOption('select#type', { label: accountType })
        await this.page.selectOption('select#fromAccountId', accountId)
        await this.button.click()
        await expect(this.openNewAccountButton).not.toBeVisible()
        await expect(this.openAcctResultTitle).toHaveText('Account Opened!')
    }

    async getNewAccountId() {
        return await this.newAccountId.textContent()
    }


}