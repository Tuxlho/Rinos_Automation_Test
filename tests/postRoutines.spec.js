import { test, expect } from '../Infraestructure/Dev_Environment_Initializer'
import { pathParameter } from '../Infraestructure/conectorsHub'
import { RandomNames } from '../Utils/randomNames'
import { getRandomBirthdate } from '../Utils/randomBirthDate'
import { getRandomTime, getRandomEndTime } from '../Utils/randomEventTime'
import crearUsuarios from '../Payloads/crearUsuarios.json'
import crearClase from '../Payloads/crearClase.json'
import nuevoHorarioClase from '../Payloads/clasesHorario.json'
import fs from 'fs'
import path from 'path'

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
    expect(response.status()).toBe(201)
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
    expect(response.status()).toBe(201)
})

test('Crear un Nuevo Registro de Asistencia,' +
    'usando JSON por Lectura de archivo en lugar de importarlo',
    async ({ baseApiOnDevEnvironment }) => {
        const baseApiServices = baseApiOnDevEnvironment
        //Rutinas para traer el Archivo en lugar de usar sentencia IMPORT nativa de JavaScript
        const filePath = path.resolve(__dirname, '../Payloads/nuevaAsistencia.json')
        const rawData = fs.readFileSync(filePath, 'utf8')
        let objectNuevaAsistencia = JSON.parse(rawData)
        //Rutinas para Verificar Todos Los Usuarios Registrados en el Sistema
        const usersResults = await baseApiServices.generarRequestSimpleSinSalidasDePatalla(pathParameter.Usuarios, false)
        let userRandomIdSelected = await baseApiServices.seleccionaID_UsuarioAleatorioDeTodosLosRegistrados(usersResults.responseAsJson)
        console.log("Selected Random Choice User_ID: ", userRandomIdSelected)

        //Rutina para Seleccionar Una Clase Aleatoria
        const classAvailableResults = await baseApiServices.generarRequestSimpleSinSalidasDePatalla(pathParameter.clases, false)
        let claseAleatoriaElegida = baseApiServices.seleccionarPorCualquierPropiedadDelJsonEligiendoUnoComoAleatorio(classAvailableResults.responseAsJson, "id_Clase")
        console.log("Clase Aleatoria Seleccionado: " + claseAleatoriaElegida)

        //Rutina para seleccionar un Role Aleatorio
        const datosDeRolesDisponibles = await baseApiServices.generarRequestSimpleSinSalidasDePatalla(pathParameter.Roles, false)
        let roleAleatorioElegido = baseApiServices.seleccionarPorCualquierPropiedadDelJsonEligiendoUnoComoAleatorio(datosDeRolesDisponibles.responseAsJson, "id_Rol")
        console.log("Perfil Aleatorio Seleccionada: " + roleAleatorioElegido)

        //Rutinas Generales para modificar el JSON antes de enviarlo
        objectNuevaAsistencia.Fk_id_clase = claseAleatoriaElegida
        objectNuevaAsistencia.Fk_id_usuario = userRandomIdSelected
        objectNuevaAsistencia.Fk_tipo_rol = roleAleatorioElegido
        console.log('Contenido del JSON: ', + objectNuevaAsistencia)
        console.log(objectNuevaAsistencia)

        console.log("Actual Base URL: " + baseApiServices.getActualEndPoint())
        console.log("Puerto Actual: " + baseApiServices.getActualPort())
        const gotResponse = await baseApiServices.
            enviar_Request_Incluyendo_Body_Request_Sin_Header(objectNuevaAsistencia,
                pathParameter.Asistencias)
        expect(gotResponse.status()).toBe(201)
    })

test('Crear un Horario Para Una Clase De Forma Aleatoria', async ({ baseApiOnDevEnvironment }) => {
    const baseApiServices = baseApiOnDevEnvironment
    let usuarioAleatorio = await baseApiServices.generarDatoAleatorioDeCualquierAPIDelSistema(pathParameter.Usuarios, "id_Usuario")
    let claseAleatoria = await baseApiServices.generarDatoAleatorioDeCualquierAPIDelSistema(pathParameter.clases, "id_Clase")
    let horaInicioAleatoria = getRandomTime(7, 23)
    let horaTerminoAleatoria = getRandomEndTime(horaInicioAleatoria, 30, 120)
    console.log("El ID de Usario Aleatorio Escogido Fue:", usuarioAleatorio)
    console.log("La Clase Aleatoria Elegida Es: ", claseAleatoria)
    console.log("Hora Aleatoria Generada es: ", horaInicioAleatoria)
    console.log("La hora de Termino de la Clase es: ", horaTerminoAleatoria)
    const altaHorarioAleatorioClase = nuevoHorarioClase
    altaHorarioAleatorioClase.Fk_id_clase = claseAleatoria
    altaHorarioAleatorioClase.Fk_id_usuario = usuarioAleatorio
    altaHorarioAleatorioClase.GetTime = horaInicioAleatoria
    altaHorarioAleatorioClase.Duracion = horaTerminoAleatoria
    console.log("El JSON que se enviara es: ")
    console.log(altaHorarioAleatorioClase)
    const gotResponse = await baseApiServices.
        enviar_Request_Incluyendo_Body_Request_Sin_Header(altaHorarioAleatorioClase,
            pathParameter.HorariosClase)
    expect(gotResponse.status()).toBe(201)
})