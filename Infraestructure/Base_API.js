import { Local_DEV, pathParameter } from '../Infraestructure/conectorsHub'

export class BaseAPI {
    constructor(endPoint, uriPORT, request) {
        this.baseEndPoint = endPoint
        this.baseUriPort = uriPORT
        this.request = request
    }

    showBaseEndPoint() {
        console.log("From Base API We have as baseEndPoint: " + this.baseEndPoint)
    }

    build_Full_URI(pathParameter) {
        let fullURI = this.baseEndPoint + ':' + this.baseUriPort + pathParameter
        return fullURI
    }

    getActualEndPoint() {
        return this.baseEndPoint
    }

    getActualPort() {
        return this.baseUriPort
    }

    getInternalRequestObject() {
        return this.request
    }

    showQueryParameters() {
        console.log("From Base API We have as Query_Parameter: " + this.baseUriBuilder.queryParameter)
    }

    showPathParameters() {
        console.log("From Base API We have as Path_Parameter: " + this.baseUriBuilder.pathParameter)
    }

    async enviar_Request_Simple_Sin_Parametros(pathParameter) {
        let fullURI = this.build_Full_URI(pathParameter)
        console.log("URL construida es: " + fullURI)
        let gotResults = await this.generarRequestSimpleSinSalidasDePatalla(fullURI, true)
        console.log('Status Code:', gotResults.Response.status());
        //Mostrando el contenido del Response en Texto Plano
        const rawText = await gotResults.Response.text();
        console.log('Raw Response Body:', rawText);
        //Mostrabdo el contenido como JSON
        console.log("Respuesta en formato JSON")
        console.log(gotResults.responseAsJson)
        return gotResults.Response
    }

    async enviar_Request_Incluyendo_Body_Request_Sin_Header(bodyRequest, pathParameter) {
        let fullURI = this.build_Full_URI(pathParameter)
        console.log("URL construida es: " + fullURI)
        const response = await this.request.post(fullURI,
            {
                data: bodyRequest
            }
        )
        const responseText = await response.text()
        console.log("Response by Text: " + responseText)
        console.log(await response.json())
        console.log("Se Obtuvo el codigo de Status: " + response.status())
        return response
    }

    async generarRequestSimpleSinSalidasDePatalla(test_URI, wasBuildFullURL) {
        let fullURI
        if (!wasBuildFullURL) {
            fullURI = this.build_Full_URI(test_URI)
        } else fullURI = test_URI
        const Response = await this.request.get(fullURI)
        let responseAsJson = await Response.json()
        const results =
        {
            Response,
            fullURI,
            responseAsJson
        }
        return results
    }

    async seleccionaID_UsuarioAleatorioDeTodosLosRegistrados(JsonResponse) {
        //Creando un arreglo solo con los id_Usuario de cada JSON
        const arrayTargetData = JsonResponse.map(j => j.id_Usuario)
        console.log("Estas son los IDS de Usario, para ejecutar el Random", arrayTargetData)
        const randomChoice = arrayTargetData[Math.floor(Math.random() * arrayTargetData.length)]
        return randomChoice
    }
}