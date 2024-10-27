import { IResponse } from "../interfaces/response.interface";

export class ResponseError implements IResponse {
    constructor(infoMessage: string, data?: any, statusCode = 400) {
        this.success = false;
        this.message = infoMessage;
        this.statusCode = statusCode;
        this.data = data;
        console.warn(
            new Date().toString() +
                " - [Response]: " +
                infoMessage +
                (data ? " - " + JSON.stringify(data) : "")
        );
    }
    message: string;
    data: any[];
    errorMessage: any;
    statusCode: number;
    error: any;
    success: boolean;
}

export class ResponseSuccess implements IResponse {
    constructor(infoMessage: string, data?: any, statusCode = 200) {
        this.success = true;
        this.message = infoMessage;
        this.statusCode = statusCode;
        this.data = data;
    }
    message: string;
    data: any[];
    errorMessage: any;
    statusCode: number;
    error: any;
    success: boolean;
}
export class ApiResponseSuccess implements IResponse {
    constructor(infoMessage: string, data?: any, statusCode = 201) {
        this.success = true;
        this.message = infoMessage;
        this.statusCode = statusCode;
        this.data = data;
    }
    message: string;
    data: any[];
    errorMessage: any;
    statusCode: number;
    error: any;
    success: boolean;
}
