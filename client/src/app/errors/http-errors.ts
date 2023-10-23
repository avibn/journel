export class HttpError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

/**
 * Status code: 400
 */
export class BadRequestError extends HttpError {}

/**
 * Status code: 401
 */
export class UnauthorizedError extends HttpError {}

/**
 * Status code: 404
 */
export class NotFoundError extends HttpError {}

/**
 * Status code: 409
 */
export class ConflictError extends HttpError {}

export const statusCodeErrorMap: {
    [key: number]: new (message?: string) => HttpError;
} = {
    400: BadRequestError,
    401: UnauthorizedError,
    404: NotFoundError,
    409: ConflictError,
};
