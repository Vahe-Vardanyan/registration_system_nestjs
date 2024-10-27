export interface IResponse {
    success: boolean;
    message: string;
    errorMessage: string;
    statusCode: number;
    data: any[];
    error: any;
}
