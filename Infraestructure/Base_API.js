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
        const response = await this.request.get(fullURI)
        console.log('Status Code:', response.status());
        //Mostrando el contenido del Response en Texto Plano
        const rawText = await response.text();
        console.log('Raw Response Body:', rawText);
        //Mostrabdo el contenido como JSON
        console.log("Respuesta en formato JSON")
        console.log(await response.json())
        return response
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
}