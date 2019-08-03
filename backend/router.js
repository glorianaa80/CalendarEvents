const {Router} = require('./core/router');

const EventsController = require('./controllers/events.controller');
const BrandsController = require('./controllers/brands.controller');
const events = new EventsController();
const brands = new BrandsController();

const router = new Router([
    {
        path: '/api/v1/events',
        method: 'GET',
        callback: events.getAll.bind(events)
    },
    {
        path: '/api/v1/events/:id',
        method: 'GET',
        callback: events.getOne.bind(events)
    },
    {
        path: '/api/v1/events',
        method: 'POST',
        callback: events.postOne.bind(events)
    },
    {
        path: '/api/v1/events/:id',
        method: 'PUT',
        callback: events.putOne.bind(events)
    },
    {
        path: '/api/v1/events/:id',
        method: 'DELETE',
        callback: events.deleteOne.bind(events)
    },
    {
        path: '/api/v1/brands',
        method: 'GET',
        callback: brands.getAll.bind(brands)
    },
    {
        path: '/api/v1/brands',
        method: 'POST',
        callback: brands.createOne.bind(brands)
    },
]);

module.exports = router;



