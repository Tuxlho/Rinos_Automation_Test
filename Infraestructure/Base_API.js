export class BaseAPI
{
    constructor(endPoint, uriBuilder)
    {
        this.baseEndPoint = endPoint
        this.baseUriBuilder = uriBuilder
    }

    showBaseEndPoint()
    {
        console.log("From Base API We have as baseEndPoint: " + this.baseEndPoint)
    }

    showQueryParameters()
    {
        console.log("From Base API We have as Query_Parameter: " + this.baseUriBuilder.queryParameter)
    }

    showPathParameters()
    {
       console.log("From Base API We have as Path_Parameter: " + this.baseUriBuilder.pathParameter) 
    }
}