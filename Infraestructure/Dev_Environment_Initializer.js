import { test as testsOnDev } from '@playwright/test'
import { BaseAPI } from '../Infraestructure/Base_API'
import { Local_DEV, UAT } from '../Infraestructure/conectorsHub'

/**
 * Define the type for your custom fixtures
 * @typedef {Object} Dev_Environment_Initializer
 * @property {BaseAPI} baseApiOnDevEnvironment
 * @property {BaseAPI} UAT_Preparation
/** */

/** @type {import('@playwright/test').TestType<Dev_Environment_Initializer, {} & import('@playwright/test').PlaywrightWorkerOptions>} */
export const test = testsOnDev.extend({
    baseApiOnDevEnvironment: async ({ request }, use) => {
        const devAPI = new BaseAPI(Local_DEV.baseURI, Local_DEV.port, request)
        //await use(devAPI)
        use(devAPI)
        return devAPI
    }
})

//Second Example To Have a Separate Inicialization for UAT Environment
/** @type {import('@playwright/test').TestType<Dev_Environment_Initializer, {} & import('@playwright/test').PlaywrightWorkerOptions>} */
export const test_UAT = testsOnDev.extend({
    UAT_Preparation: async ({ request }, use) => {
        const devAPI = new BaseAPI(UAT.baseURI, UAT.port, request)
        //await use(devAPI)
        use(devAPI)
        return devAPI
    }
})

export { expect } from '@playwright/test';