export class Base_UI {
    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page, env_URL) {
        this.page = page
        this.runningSite = env_URL
    }

    async navigateToLandingPage() {
        await this.page.goto(this.runningSite)
    }
}