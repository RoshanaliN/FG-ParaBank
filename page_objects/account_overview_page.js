const { expect } = require('@playwright/test');

export class account_overview_page {
    constructor(page) {
        this.page = page
        this.overviewRows = page.locator('#accountTable tr')
        this.overviewTitle = page.locator('#showOverview .title')
        this.accountId = page.locator('a[href*=id]')
    }

    async verifyPageLoaded() {
        await expect(this.overviewTitle).toHaveText('Accounts Overview')
    }

    async getAccountId(position) {
        return await this.accountId.nth(position).textContent()
    }

    async verifyRowDetails(accountId, amount) {
        const rowLength = this.overviewRows.count()
        for (let i = 0; i < rowLength; i++) {
            let rowAccountId = await this.overviewRows.nth(i).locator('a[href*=id]').textContent()
            if (rowAccountId === accountId) {
                await expect(this.overviewRows.nth(i).locator('td').nth(1)).toHaveText(amount)
                await expect(this.overviewRows.nth(i).locator('td').last()).toHaveText(amount)
                break
            }
        }
    }
}