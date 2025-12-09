const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const skillsRoutes = require('./routes/skills.routes');
const projectRoutes = require('./routes/project.routes');
const settingRoutes = require('./routes/setting.routes');
const adminRoutes = require('./routes/admin.routes');
const server = express();

server.use(express.json());
mongoose.set('strictQuery', true);

server.use(cors({
    origin: ["http://localhost:3000",],
    credentials: true
}));


server.use('/skills',skillsRoutes)
server.use('/project',projectRoutes)
server.use('/setting',settingRoutes)
server.use('/admin', adminRoutes)

server.use(express.static('./public'));
mongoose.connect(process.env.DATABASE_URL, { dbName: process.env.DB_NAME }).then(() => {
    console.log("Database is connected...")
    server.listen(process.env.PORT, () => {
        console.log("Server is running...")
    })
}).catch((err) => {
    console.log(err)
});