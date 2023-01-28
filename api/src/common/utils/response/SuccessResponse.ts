/**
 * 
 */
export class SuccessResponse {

    isSuccess = true;
    message: any;

    constructor(response: any) {
        this.message = response;
    }
}