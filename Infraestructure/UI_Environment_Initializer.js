import { Rinos_UI_Production } from '../Infraestructure/conectorsHub'
import { Base_UI } from '../Infraestructure/Base_UI'
import { test as ui_OnProd } from '@playwright/test'

/**
 * Define the type for your custom fixtures
 * @typedef {Object} UI_Environment_Initializer
 * @property {Base_UI} ui_Production
 * @param {import('@playwright/test').Page} page
/** */

/** @type {import('@playwright/test').TestType<UI_Environment_Initializer, {} & import('@playwright/test').PlaywrightWorkerOptions>} */
export const test = ui_OnProd.extend({
    ui_Production: async ({ page }, use) => {
        const prodEnv = new Base_UI(page, Rinos_UI_Production.URL)
        use(prodEnv)
        return prodEnv
    }
})