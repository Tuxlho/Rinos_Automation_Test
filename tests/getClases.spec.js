import { test, expect } from '@playwright/test'
import { Local_DEV, pathParameter } from '../Infraestructure/conectorsHub'
import { BaseAPI } from '../Infraestructure/Base_API'

let baseApiServices

test('Obtener las Clases Existentes en Base de Datos', async ({ request }) => {
    console.log("Iniciando la prueba para Obtener las Clases de la Base de Datos")
    const getResponse = await
        baseApiServices.enviar_Request_Simple_Sin_Parametros(pathParameter.clases)
    expect(getResponse.status()).toBe(200);
})

test('Obtener Todos los Planes de Pago Existentes', async ({ request }) => {
    console.log("Iniciando Prueba Para Obtener Todos los Planes de Pago Existentes")
    const getResponse = await
        baseApiServices.enviar_Request_Simple_Sin_Parametros(pathParameter.PlanesDePago)
    expect(getResponse.status()).toBe(200);
})

test('Obtener Todos los Roles que tenemos en el sistema', async ({ request }) => {
    const getResponse = await
        baseApiServices.enviar_Request_Simple_Sin_Parametros(pathParameter.Roles)
    expect(getResponse.status()).toBe(200);
})

test('Obtener Todos los Usuarios que tenemos en el sistema', async ({ request }) => {
    const getResponse = await
        baseApiServices.enviar_Request_Simple_Sin_Parametros(pathParameter.Usuarios)
    expect(getResponse.status()).toBe(200);
})

test.beforeEach('Definir el baseApiServices requerido por todas las pruebas',
    async ({ request }) => {
        baseApiServices = new BaseAPI(Local_DEV.baseURI, Local_DEV.port, request)
        return baseApiServices
    })