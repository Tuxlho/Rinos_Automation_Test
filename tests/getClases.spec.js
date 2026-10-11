import { test, expect } from '@playwright/test'
import { Local_DEV, pathParameter } from '../Infraestructure/conectorsHub'
import { BaseAPI } from '../Infraestructure/Base_API'

test('Obtener las Clases Existentes en Base de Datos', async ({ request }) => {
    console.log("Iniciando la prueba para Obtener las Clases de la Base de Datos")
    let fullURI = Local_DEV.baseURI + ':' + Local_DEV.port + pathParameter.clases
    console.log("Url To Test was: " + fullURI)
    const response = await request.get(fullURI)
    console.log('Status Code:', response.status());
    console.log(await response.json())
})

test('Obtener Todos los Planes de Pago Existentes', async ({ request }) => {
    console.log("Iniciando Prueba Para Obtener Todos los Planes de Pago Existentes")
    let fullURI = Local_DEV.baseURI + ':' + Local_DEV.port + pathParameter.PlanesDePago
    console.log("URL construida es: " + fullURI)
    const response = await request.get(fullURI)
    console.log('Status Code:', response.status());
    //Mostrando el contenido del Response en Texto Plano
    const rawText = await response.text();
    console.log('Raw Response Body:', rawText);
    //Mostrabdo el contenido como JSON
    console.log('Status Code:', response.status());
    console.log(await response.json())
})

test('Obtener Todos los Roles que tenemos en el sistema', async ({ request }) => {
    const baseApiServices = new BaseAPI(Local_DEV.baseURI, Local_DEV.port, request)
    const getResponse = await
        baseApiServices.enviar_Request_Simple_Sin_Parametros(pathParameter.Roles)
    expect(getResponse.status()).toBe(200);
})