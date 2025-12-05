const fileUpload = require('express-fileupload');
const { getProject, createProject, updateProject, deleteProject } = require('../controllers/project.controllers');
const authMiddleware = require('../middleware/authmiddleware');

const projectRoutes = require('express').Router();


projectRoutes.get('/get/:id?', getProject)
projectRoutes.post('/create',fileUpload({createParentPath: true}),authMiddleware, createProject)
projectRoutes.put('/update/:id?', updateProject)
projectRoutes.delete('/delete/:id', deleteProject)


module.exports = projectRoutes;