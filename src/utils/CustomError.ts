class CustomError extends Error {
    statusCode: Number;
    constructor(statusCode: Number, message: string) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

export {
    CustomError
}