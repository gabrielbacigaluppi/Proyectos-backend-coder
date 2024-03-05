import {ticketsManager} from "../dao/mongo/ticketsManager.js"

export const newTicket = (obj) => {
    const ticketCreated = ticketsManager.createOne(obj)
    return ticketCreated
}