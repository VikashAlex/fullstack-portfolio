const fileUpload = require('express-fileupload');
const skillsRoutes = require('express').Router();
const { getSkills, createSkills, updateSkills, deleteSkills } = require('../controllers/skills.controllers');
const authMiddleware = require('../middleware/authmiddleware');
skillsRoutes.get('/get/:id?', getSkills)
skillsRoutes.post('/create',fileUpload({createParentPath: true}),authMiddleware, createSkills)
skillsRoutes.put('/update/:id?', updateSkills)
skillsRoutes.delete('/delete/:id?', deleteSkills)

module.exports = skillsRoutes;