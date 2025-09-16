export class transfer_funds_page {
    constructor(page) {
        this.page = page
    }

    async verifyPageLoaded() {
        await expect(page.locator('#showForm .title')).toContainText('Transfer Funds')
    }

    async enterTransferDetails(amount, fromAccountId, toAccountId) {
        await page.locator('#amount').first().fill(amount)
        await page.selectOption('select#fromAccountId', fromAccountId)
        await page.selectOption('select#toAccountId', toAccountId)
    }

    async completeTransferAndConfirm() {
        await page.locator('input[value="Transfer"]').click()
        await page.locator('#showResult .title').waitFor()
        await expect(page.locator('#showResult .title')).toHaveText('Transfer Complete!')
    }
}