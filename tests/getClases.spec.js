import { test } from '@playwright/test'
import { Local_DEV, pathParameter } from '../Infraestructure/conectorsHub'

test('Obtener las Clases Existentes en Base de Datos', async ({ request }) => {
    console.log("Iniciando la prueba para Obtener las Clases de la Base de Datos")
    let fullURI = Local_DEV.baseURI + ':' + Local_DEV.port + pathParameter.clases
    console.log("Url To Test was: " + fullURI)
    const response = await request.get(fullURI)
    console.log(await response.json())
})