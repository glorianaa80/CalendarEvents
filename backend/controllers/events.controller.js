const ObjectId = require('mongodb').ObjectId;

const Response = require('../core/response');
const Utils = require('../core/utils');
const Controller = require('../core/controller');

class EventsController extends Controller {
    constructor() {
        super('Events');
    }

    getAll (req, res, route) {
        this.find({}, route.query)
            .then(events => Response.Send(res, events))
            .catch(error => Response.ApplicationError(res, error));
    }

    getOne (req, res, route) {
        let id = route.params.id;
        this.findOne(id)
            .then(event => Response.Send(res, event))
            .catch(error => Response.ApplicationError(res, error));
    }

    postOne (req, res, route) {
        let event = Utils.sanitize(route.data, ['name', 'date', 'hour', 'notes', 'favorite']) || {};

        let error = this._validEvent(event);
        if(error) return Response.BadRequest(res, error);

        this.insertOne(event)
            .then(newEvent => Response.Send(res, newEvent))
            .catch(error => Response.ApplicationError(res, error));
    }

    _validEvent (event = {}) {
        if(Utils.isEmpty(event) || !event.name || !event.date || !event.hour)
            return new Error(`event name, date and hour are required.`);
        return null;
    }

    putOne (req, res, route) {
        let id = route.params.id || null;

        if(!Utils.isId(id))
            Response.BadRequest(res, new Error(`Invalid id`));

        let event = Utils.sanitize(route.data, ['name', 'color', 'year', 'description']) || {};
        if(Utils.isEmpty(event))
            return Response.BadRequest(new Error(`Invalid event`));

        this.updateOne(id, event)
            .then(updatedEvent => Response.Send(res, updatedEvent))
            .catch(error => Response.ApplicationError(res, error));
    }

    deleteOne (req, res, route) {
        let id = route.params.id || null;

        if(!Utils.isId(id))
            Response.BadRequest(res, new Error(`Invalid id`));

        this.removeOne(id)
            .then(result => Response.Send(res, result))
            .catch(error => Response.ApplicationError(res, error));
    }
}

module.exports = EventsController;