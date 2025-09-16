import { expect, request } from '@playwright/test'
export class api_test {
    constructor() {
        this.apiContext;
    }

    async transactionSerachUsingAmount(accountId, amount) {
        this.apiContext = await request.newContext()
        const transactionSearchResponse = await this.apiContext.get("https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/" + accountId
            + "/transactions/amount/" + amount + "?timeout=30000")
        expect(transactionSearchResponse.ok()).toBeTruthy();
        return transactionSearchResponse.json();
    }
}