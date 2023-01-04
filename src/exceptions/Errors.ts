class ApiError extends Error {
    status: number;
    errors: unknown[];

    constructor(status: number, message: string, errors: unknown[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'The user is not logged in');
    }

    static BadRequest(message: string, errors: unknown[] = []) {
        return new ApiError(400, message, errors);
    }

    static AccessDenied() {
        return new ApiError(403, 'Access denied');
    }

    static NotFound() {
        return new ApiError(404, 'Such record ain\'t found');
    }
}

export { ApiError };