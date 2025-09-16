export class find_transaction_page {
    constructor(page) {
        this.page = page
        this.findByAmountButton = page.locator('#findByAmount')
        this.amountElement = page.locator('#amount')
    }

    async selectAccountAndEnterAmount(accountId, amount) {
        await this.page.selectOption('#accountId', accountId)
        await this.amountElement.fill(amount)
    }

async getApiResponse() {
    const responsePromise = this.page.waitForResponse(response =>
        response.url().includes('/transactions/amount/') &&
        response.request().method() === 'GET'
    );
    await this.findByAmountButton.click();
    const response = await responsePromise;
    return response.json();
}

}