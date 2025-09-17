import { expect, request } from '@playwright/test'
export class api_test {
    constructor() {
        this.apiContext;
    }

    async transactionSerachUsingAmount(accountId, amount, jsessionCookie) {
        this.apiContext = await request.newContext()
        const payload = "https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/" + accountId
            + "/transactions/amount/" + amount + "?timeout=30000"
        const transactionSearchResponse = await this.apiContext.get(
            payload,
            {
                headers: {
                    'Cookie': "JSESSIONID=" + jsessionCookie
                }
            }
        );
        expect(transactionSearchResponse.ok()).toBeTruthy();
        return transactionSearchResponse.json();
    }
}