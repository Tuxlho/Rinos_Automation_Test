import { test } from '@playwright/test'
import { Local_DEV, pathParameter } from '../Infraestructure/conectorsHub'

test('Obtener las Clases Existentes en Base de Datos', async ({ request }) => {
    console.log("Iniciando la prueba para Obtener las Clases de la Base de Datos")
    let fullURI = Local_DEV.baseURI + ':' + Local_DEV.port + pathParameter.clases
    console.log("Url To Test was: " + fullURI)
    const response = await request.get(fullURI)
    console.log(await response.json())
})

test('Obtener Todos los Planes de Pago Existentes', async ({ request }) => {
    console.log("Iniciando Prueba Para Obtener Todos los Planes de Pago Existentes")
    let fullURI = Local_DEV.baseURI + ':' + Local_DEV.port + pathParameter.PlanesDePago
    console.log("URL construida es: " + fullURI)
    const response = await request.get(fullURI)
    //Comentar en Reunion que los Planes de Pago Necesitan una descripcion
    console.log(await response.json())
})