import { account_overview_page } from "./account_overview_page.js"
import { bill_payment_page } from "./bill_payment_page.js"
import { home_page } from "./home_page.js"
import { new_account_page } from "./new_account_page.js"
import { registeration_page } from "./registeration_page.js"
import { transfer_funds_page } from "./transfer_funds_page.js"
import { find_transaction_page } from "./find_transaction_page.js"

export class PO_Manager {
    constructor(page) {
        this.page = page
        this.homePage = new home_page(page)
        this.registerationPage = new registeration_page(page)
        this.newAccountPage = new new_account_page(page)
        this.accountOverviewPage = new account_overview_page(page)
        this.billPaymentPage = new bill_payment_page(page)
        this.transferFundsPage = new transfer_funds_page(page)
        this.findTransactionPage = new find_transaction_page(page)
    }

    getHomePage() {
        return this.homePage
    }
    getRegistrationPage() {
        return this.registerationPage
    }
    getNewAccountPage() {
        return this.newAccountPage
    }
    getAccountOverviewPage() {
        return this.accountOverviewPage
    }
    getBillPaymentPage() {
        return this.billPaymentPage
    }
    getTransferFundsPage() {
        return this.transferFundsPage
    }
    getFindTransactionPage() {
        return this.findTransactionPage
    }
}