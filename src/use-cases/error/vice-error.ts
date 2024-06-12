export class ViceExistError extends Error {
    constructor() {
        super('Vice exist.')
    }
}

export class ViceNoExistError extends Error {
    constructor() {
        super('Vice no exist.')
    }
}