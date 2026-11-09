import { test, expect } from '../Infraestructure/Dev_Environment_Initializer'
import { pathParameter } from '../Infraestructure/conectorsHub'
import { RandomNames } from '../Utils/randomNames'
import { getRandomBirthdate } from '../Utils/randomBirthDate'

async function obtenerPorGET_ObjetosDelServicioPorActualizar(local_baseApiOnDevEnvironment, message, baseURI) {
    console.log(message)
    local_baseApiOnDevEnvironment.showCurrentURL_AndPortConfigured()
    const resultsItems = await local_baseApiOnDevEnvironment.generarRequestSimpleSinSalidasDePatalla(baseURI, false)
    expect(resultsItems.Response.status()).toBe(200)
    return resultsItems
}

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

test('PUT Modificar el Horario de una Clase Existente', async ({ baseApiOnDevEnvironment }) => {
    const getInicial = await obtenerPorGET_ObjetosDelServicioPorActualizar(baseApiOnDevEnvironment, "Obteniendo las clases a procesar", pathParameter.clases)
    console.log("JSON Recibido: ", getInicial)
    let catchedRandomData = await baseApiOnDevEnvironment.seleccionarPorCualquierPropiedadDelJsonEligiendoUnoComoAleatorio(getInicial.responseAsJson, "id_Clase")
    console.log("ID Seleccionado para Modificar: ", catchedRandomData)
    let jsonToModify = getInicial.responseAsJson.find(x => x.id_Clase === catchedRandomData)
    console.log("Json que sera modificado: ", jsonToModify)
    jsonToModify.descripcion = "PUT Mejorar la condicion Cardiovascular de la persona"
    jsonToModify.nombreClase = "PUT Gimnasia Artistica"
    console.log("Json Antes de Ser Enviado al PUT: ", jsonToModify)
    let fullURI = baseApiOnDevEnvironment.build_Full_URI(pathParameter.Usuarios)
    const response = await baseApiOnDevEnvironment.getInternalRequestObject().put(fullURI,
        {
            data: jsonToModify
        }
    )
    let jsonBody = await response.json()
    console.log("Objeto Aceptado y Devuelto en Response", jsonBody)

})

test('PUT Modificar un Plan de Pago una Existente', async ({ baseApiOnDevEnvironment }) => {
    const getInicial = await obtenerPorGET_ObjetosDelServicioPorActualizar(baseApiOnDevEnvironment, "Obteniendo los Planes de Pago a procesar", pathParameter.PlanesDePago)
    console.log("JSON Recibido: ", getInicial)
    let catchedRandomData = await baseApiOnDevEnvironment.seleccionarPorCualquierPropiedadDelJsonEligiendoUnoComoAleatorio(getInicial.responseAsJson, "id_Plan")
    console.log("ID Seleccionado para Modificar: ", catchedRandomData)
    let jsonToModify = getInicial.responseAsJson.find(x => x.id_Plan === catchedRandomData)
    console.log("Json que sera modificado: ", jsonToModify)
    jsonToModify.vigencia = getRandomBirthdate(-1, 2)
    jsonToModify.descripcion_plan = "Plan Basico"

    console.log("Json Antes de Ser Enviado al PUT: ", jsonToModify)
    let fullURI = baseApiOnDevEnvironment.build_Full_URI(pathParameter.PlanesDePago)
    const response = await baseApiOnDevEnvironment.getInternalRequestObject().put(fullURI,
        {
            data: jsonToModify
        }
    )
    let jsonBody = await response.json()
    console.log("Objeto Aceptado y Devuelto en Response", jsonBody)
})