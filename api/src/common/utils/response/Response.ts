import { SuccessResponse } from './SuccessResponse';
import { ErrorResponse } from './ErrorResponse';

export class ResponseUtility {

    static generateSuccessResponse(message: string | any) {
        return new SuccessResponse(message);
    }

    static generateErrorResponse(message: string) {
        return new ErrorResponse(message);
    }
}