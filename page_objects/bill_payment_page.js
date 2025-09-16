import { expect } from '@playwright/test';

export class bill_payment_page {
    constructor(page) {
        this.page = page
        this.billPayFormTitle = page.locator('#billpayForm .title')
        this.billPayResultTitle = page.locator('#billpayResult .title')
        this.name = page.locator('input[name*=name]')
        this.street = page.locator('input[name*=street]')
        this.city = page.locator('input[name*=city]')
        this.state = page.locator('input[name*=state]')
        this.zipCode = page.locator('input[name*=zipCode]')
        this.phoneNumber = page.locator('input[name*=phoneNumber]')
        this.accountNumber = page.locator('input[name*=accountNumber]')
        this.verifyAccount = page.locator('input[name=verifyAccount]')
        this.amount = page.locator('input[name=amount]')
        this.sendPaymentButton = page.locator('input[value="Send Payment"]')
    }

    async verifyPageLoaded() {
        await this.billPayFormTitle.waitFor()
        await expect(this.billPayFormTitle).toHaveText('Bill Payment Service')
    }

    async enterPaymentDetails(fromAccountId, amt) {
        await this.name.fill("John")
        await this.street.fill("New Street")
        await this.city.fill("New City")
        await this.state.fill("New State")
        await this.zipCode.fill("454123")
        await this.phoneNumber.fill("9897465623")
        await this.accountNumber.fill("13588")
        await this.verifyAccount.fill("13588")
        await this.amount.fill(amt)
        await this.page.selectOption('select[name=fromAccountId]', fromAccountId)
    }

    async sendPaymentAndConfirm() {
        await this.sendPaymentButton.click()
        await this.billPayResultTitle.waitFor()
        await expect(this.billPayResultTitle).toHaveText('Bill Payment Complete')
    }
}