export class UserAlreadyExistsError extends Error {
    constructor() {
        super('E-mail already exists')
    }
}

export class InvalidCredentialsError extends Error {
    constructor() {
        super('Invalid credentials.')
    }
}
export class UserNotExistError extends Error {
    constructor() {
        super('User not exist.')
    }
}