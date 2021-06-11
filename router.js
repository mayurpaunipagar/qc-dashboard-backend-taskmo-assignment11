const { Router } = require('express');
const jiomartController = require('./controller/jiomartController');
const ninjacartController = require('./controller/ninjacartController');

const router = Router()

module.exports = () =>{
    router.use('/jiomart',jiomartController())
    router.use('/ninjacart',ninjacartController())
    return router;
}