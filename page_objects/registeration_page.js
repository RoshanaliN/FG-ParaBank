export class registeration_page {
    constructor(page) {
        this.page = page
    }

    async verifyPageLoaded() {
        await expect(page.locator('#rightPanel .title')).toContainText('Signing up is easy!')
        await expect(page).toHaveTitle('ParaBank | Register for Free Online Account Access')
    }

    async fillDetails(username,password) {
        this.username = username
        await page.locator('#customer\\.firstName').waitFor()
        await page.locator('#customer\\.firstName').fill('Roshan')
        await page.locator('#customer\\.lastName').fill('Ali')
        await page.locator('#customer\\.address\\.street').fill('Test Street')
        await page.locator('#customer\\.address\\.city').fill('Kolhapur')
        await page.locator('#customer\\.address\\.state').fill('MH')
        await page.locator('#customer\\.address\\.zipCode').fill('123456')
        await page.locator('#customer\\.phoneNumber').fill('1234567895')
        await page.locator('#customer\\.ssn').fill('ADFT456423')
        await page.locator('#customer\\.username').fill(username)
        await page.locator('#customer\\.password').fill(password)
        await page.locator('#repeatedPassword').fill(password)
    }
    async clickRegiterAndVerify() {
        await page.locator('.button').last().click()
        await page.locator('#rightPanel .title').waitFor()
        await expect(page.locator('#rightPanel .title')).toContainText('Welcome ' + this.username)
        await expect(page.locator('#rightPanel p')).toHaveText('Your account was created successfully. You are now logged in.')
        await expect(page.locator('#leftPanel p')).toContainText('Welcome Roshan Ali')
    }
}