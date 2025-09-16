export class account_overview_page {
    constructor(page) {
        this.page = page
        this.overviewRows = page.locator('#accountTable tr')
    }

    async verifyPageLoaded() {
        await expect(page.locator('#showOverview .title')).toHaveText('Accounts Overview')
    }

    async getAccountId(position) {
        return await page.locator('a[href*=id]').nth(position).textContent()
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