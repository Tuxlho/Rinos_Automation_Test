import {test, expect} from '@playwright/test'
import { Local_DEV } from '../Infraestructure/conectorsHub'

test('Obtener las Clases Existentes en Base de Datos', async({ request }) => {
    console.log("Iniciando la prueba para Obtener las Clases de la Base de Datos")
    let urlConnect = Local_DEV.baseURI + ':' + Local_DEV.port
    console.log("Url To Test was: " + urlConnect)
})