const { expect } = require('@playwright/test');

export class transfer_funds_page {
    constructor(page) {
        this.page = page
        this.showFormTitle = page.locator('#showForm .title')
        this.showResultTitle = page.locator('#showResult .title')
        this.amountElement = page.locator('#amount')
        this.trasferButton = page.locator('input[value="Transfer"]')
    }

    async verifyPageLoaded() {
        await expect(this.showFormTitle).toContainText('Transfer Funds')
    }

    async enterTransferDetails(amount, fromAccountId, toAccountId) {
        await this.amountElement.first().fill(amount)
        await this.page.selectOption('select#fromAccountId', fromAccountId)
        await this.page.selectOption('select#toAccountId', toAccountId)
    }

    async completeTransferAndConfirm() {
        await this.trasferButton.click()
        await this.showResultTitle.waitFor()
        await expect(this.showResultTitle).toHaveText('Transfer Complete!')
    }
}