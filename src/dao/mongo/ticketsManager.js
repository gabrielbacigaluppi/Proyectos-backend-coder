import {ticketsModel} from "./models/tickets.model.js"
import BasicManager from "./BasicManager.js"

class TicketsManager extends BasicManager{
    constructor(){
        super(ticketsModel)
    }
}

export const ticketsManager = new TicketsManager()