import { test, expect } from '../Infraestructure/Dev_Environment_Initializer'
import { pathParameter } from '../Infraestructure/conectorsHub'
import { RandomNames } from '../Utils/randomNames'
import { getRandomBirthdate } from '../Utils/randomBirthDate'
import crearUsuarios from '../Payloads/crearUsuarios.json'
import crearClase from '../Payloads/crearClase.json'

test('Dar de Alta un Usuario del Tipo Administrador en el Sistema', async ({ baseApiOnDevEnvironment }) => {
    const baseApiServices = baseApiOnDevEnvironment
    console.log("Actual Base URL: " + baseApiServices.getActualEndPoint())
    console.log("Puerto Actual: " + baseApiServices.getActualPort())
    const randomName = new RandomNames()
    let nameObject = randomName.getRandomName()
    let bodyRequest =
    {
        Fk_IdRol: 1,
        Fk_IdPlanPago: 1,
        NombreUsuario: nameObject.fullName,
        FechaCumpleaños: getRandomBirthdate(16, 65)
    }
    let fullURI = baseApiServices.build_Full_URI(pathParameter.Usuarios)
    console.log("URL de la prueba es: " + fullURI)
    const response = await baseApiServices.getInternalRequestObject().post(fullURI,
        {
            data: bodyRequest
        }
    )
    const responseText = await response.text()
    console.log("Response by Text: " + responseText)
    console.log(await response.json())
    console.log("Se Obtuvo el codigo de Status: " + response.status())
    expect(response.status()).toBe(201);
})

test('Dar de Alta un Usuario del Tipo Miembro en el Sistema', async ({ baseApiOnDevEnvironment }) => {
    const baseApiServices = baseApiOnDevEnvironment
    console.log("Actual Base URL: " + baseApiServices.getActualEndPoint())
    console.log("Puerto Actual: " + baseApiServices.getActualPort())
    const randomName = new RandomNames()
    let nameObject = randomName.getRandomName()
    let localBodyRequestFromPayloadDirectory = crearUsuarios
    localBodyRequestFromPayloadDirectory.Fk_IdRol = 2
    localBodyRequestFromPayloadDirectory.Fk_IdPlanPago = 1
    localBodyRequestFromPayloadDirectory.NombreUsuario = nameObject.fullName
    localBodyRequestFromPayloadDirectory.FechaCumpleaños = getRandomBirthdate(16, 65)

    let fullURI = baseApiServices.build_Full_URI(pathParameter.Usuarios)
    console.log("URL de la prueba es: " + fullURI)
    const response = await baseApiServices.getInternalRequestObject().post(fullURI,
        {
            data: localBodyRequestFromPayloadDirectory
        }
    )
    const responseText = await response.text()
    console.log("Response by Text: " + responseText)
    console.log(await response.json())
    console.log("Se Obtuvo el codigo de Status: " + response.status())
    expect(response.status()).toBe(201);
})

test('Dar de Alta una Clase en el Sistema', async ({ baseApiOnDevEnvironment }) => {
    const baseApiServices = baseApiOnDevEnvironment
    console.log("Actual Base URL: " + baseApiServices.getActualEndPoint())
    console.log("Puerto Actual: " + baseApiServices.getActualPort())
    const randomName = new RandomNames()
    let nameObject = randomName.getRandomName()
    let tmpBodyCrearClase = crearClase
    tmpBodyCrearClase.Descripcion = "Estar en mejor forma Fisica del corazon"
    tmpBodyCrearClase.NombreClase = "Gimnasia Vertical"

    let fullURI = baseApiServices.build_Full_URI(pathParameter.clases)
    console.log("URL de la prueba es: " + fullURI)
    const response = await baseApiServices.getInternalRequestObject().post(fullURI,
        {
            data: tmpBodyCrearClase
        }
    )
    const responseText = await response.text()
    console.log("Response by Text: " + responseText)
    console.log(await response.json())
    console.log("Se Obtuvo el codigo de Status: " + response.status())
    expect(response.status()).toBe(201);
})