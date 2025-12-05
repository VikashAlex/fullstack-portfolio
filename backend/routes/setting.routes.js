const { getSetting, updateSetting } = require('../controllers/setting.controllers');
const authMiddleware = require('../middleware/authmiddleware');

const settingRoutes = require('express').Router();
settingRoutes.get('/get', getSetting)
settingRoutes.put('/update/:id?', authMiddleware, updateSetting)



module.exports = settingRoutes;


