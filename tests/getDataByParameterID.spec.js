import { test, test_UAT, expect } from '../Infraestructure/Dev_Environment_Initializer'
import { pathParameter } from '../Infraestructure/conectorsHub'

test('Obtener una Clase Basado en su ID', async ({ baseApiOnDevEnvironment }) => {
    const baseApiServices = baseApiOnDevEnvironment
    const getResponse = await
        baseApiServices.enviar_Request_Simple_Sin_Parametros(pathParameter.clases + "/1")
    expect(getResponse.status()).toBe(200)
})

test_UAT('Other way to get Data', async ({ UAT_Preparation }) => {
    const baseApiServices = UAT_Preparation
    const getResponse = await
        baseApiServices.enviar_Request_Simple_Sin_Parametros(pathParameter.clases + "/1")
    expect(getResponse.status()).toBe(200)
})

test('Obtener una Plan de Pago Basado en su ID', async ({ baseApiOnDevEnvironment }) => {
    const baseApiServices = baseApiOnDevEnvironment
    const getResponse = await
        baseApiServices.enviar_Request_Simple_Sin_Parametros(pathParameter.PlanesDePago + "/1")
    expect(getResponse.status()).toBe(200)
})

test('Obtener un Rol Epecifico del Sistema Basado en su ID', async ({ baseApiOnDevEnvironment }) => {
    const baseApiServices = baseApiOnDevEnvironment
    const getResponse = await
        baseApiServices.enviar_Request_Simple_Sin_Parametros(pathParameter.Roles + "/1")
    expect(getResponse.status()).toBe(200)
})

test('Obtener un Usuario Epecifico del Sistema Basado en su ID', async ({ baseApiOnDevEnvironment }) => {
    const baseApiServices = baseApiOnDevEnvironment
    const getResponse = await
        baseApiServices.enviar_Request_Simple_Sin_Parametros(pathParameter.Roles + "/1")
    expect(getResponse.status()).toBe(200)
})