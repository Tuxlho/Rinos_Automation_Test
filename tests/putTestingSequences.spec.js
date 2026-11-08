import { test, expect } from '../Infraestructure/Dev_Environment_Initializer'
import { pathParameter } from '../Infraestructure/conectorsHub'
import { RandomNames } from '../Utils/randomNames'

test('PUT Modificar El Nombre de un Usuario Del Sistema', async ({ baseApiOnDevEnvironment }) => {
    const baseApiServices = baseApiOnDevEnvironment
    baseApiServices.showCurrentURL_AndPortConfigured()
    const resultsItems = await baseApiServices.generarRequestSimpleSinSalidasDePatalla(pathParameter.Usuarios, false)
    expect(resultsItems.Response.status()).toBe(200)
    let randomIDToModify = await baseApiServices.seleccionaID_UsuarioAleatorioDeTodosLosRegistrados(resultsItems.responseAsJson)
    console.log("ID Seleccionado para Modificar: ", randomIDToModify)
    let jsonToModify = resultsItems.responseAsJson.find(x => x.id_Usuario === randomIDToModify)
    console.log("Objeto antes de Modificarse es: ", jsonToModify)
    const randomName = new RandomNames()
    let nameObject = randomName.getRandomName().fullName
    jsonToModify.nombreUsuario = nameObject;
    delete jsonToModify.tiposRoles
    delete jsonToModify.planesDePago
    /*
    delete jsonToModify.claseImpartida
    delete jsonToModify.asistente
    delete jsonToModify.roleAsistente*/
    console.log("Objeto Despues de Modificarse: ", jsonToModify)
    let fullURI = baseApiServices.build_Full_URI(pathParameter.Usuarios)
    const response = await baseApiServices.getInternalRequestObject().put(fullURI,
        {
            data: jsonToModify
        }
    )
    let jsonBody = await response.json()
    console.log("Objeto Aceptado y Devuelto en Response", jsonBody)
    expect(jsonBody.nombreUsuario).toEqual(nameObject)
})

test('Modificacion Base', async ({ baseApiOnDevEnvironment }) => {
    const getInicial = await obtenerPorGET_ObjetosDelServicioPorActualizar(baseApiOnDevEnvironment, "Obteniendo las clases a procesar", pathParameter.clases)
    console.log("JSON Recibido: ", getInicial)
    let randomIDToModify = await baseApiOnDevEnvironment.seleccionarPorCualquierPropiedadDelJsonEligiendoUnoComoAleatorio(getInicial.responseAsJson, "id_Clase")
    console.log("ID Seleccionado para Modificar: ", randomIDToModify)
})

async function obtenerPorGET_ObjetosDelServicioPorActualizar(local_baseApiOnDevEnvironment, message, baseURI)
{
    console.log(message)
    local_baseApiOnDevEnvironment.showCurrentURL_AndPortConfigured()
    const resultsItems = await local_baseApiOnDevEnvironment.generarRequestSimpleSinSalidasDePatalla(baseURI, false)
    expect(resultsItems.Response.status()).toBe(200)
    return resultsItems
}