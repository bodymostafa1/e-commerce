export class AppErorr extends Error{
    constructor(message , statusCode){
        super(message)
        this.statusCode = statusCode
    }
}