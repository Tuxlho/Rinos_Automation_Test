export class Base_UI {
    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page, env_URL) {
        this.page = page
        this.runningSite = env_URL
    }

    async navigateToLandingPage() {
        this.showEnv_URL()
        console.log("Checar si 'Page' Fixture esta inicializado: ", (this.page != null))
        await this.page.goto(this.runningSite)
    }

    showEnv_URL() {
        console.log("El ambiente de Pruebas esta apuntando a env_URL: ", this.runningSite)
    }
}