export class new_account_page {

    constructor(page) {
        this.page = page
    }

    async verifyPageLoaded() {
        await expect(page.locator('#openAccountForm .title')).toHaveText('Open New Account')
    }

    async addNewAccount(accountType) {
        await page.selectOption('select#type', { label: accountType })
        await page.selectOption('select#fromAccountId', accountId0)
        await page.locator('input.button').click()
        await expect(page.locator('input[value="Open New Account"]')).not.toBeVisible()
        await expect(page.locator('#openAccountResult .title')).toHaveText('Account Opened!')
    }

    async getNewAccountId(){
        return await page.locator('#newAccountId').textContent()
    }


}