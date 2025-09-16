export class bill_payment_page {
    constructor(page) {
        this.page = page
    }

    async verifyPageLoaded() {
        await expect(page.locator('#billpayForm .title')).toHaveText('Bill Payment Service')
    }

    async enterPaymentDetails(fromAccountId) {
        await page.locator('input[name*=name]').fill("John")
        await page.locator('input[name*=street]').fill("New Street")
        await page.locator('input[name*=city]').fill("New City")
        await page.locator('input[name*=state]').fill("New State")
        await page.locator('input[name*=zipCode]').fill("454123")
        await page.locator('input[name*=phoneNumber]').fill("9897465623")
        await page.locator('input[name*=accountNumber]').fill("13588")
        await page.locator('input[name=verifyAccount]').fill("13588")
        await page.locator('input[name=amount]').fill("15")
        await page.selectOption('select[name=fromAccountId]', fromAccountId)
    }

    async sendPaymentAndConfirm() {
        await page.locator('input[value="Send Payment"]').click()
        await page.locator('#billpayResult .title').waitFor()
        await expect(page.locator('#billpayResult .title')).toHaveText('Bill Payment Complete')
    }
}