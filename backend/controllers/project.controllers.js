const { ReadableStreamDefaultController } = require('stream/web');
const projectModel = require('../models/project.model');
const imgUniueName = require('../utility/helper');
const fs = require('fs')

const projectControllers = {
    async getProject(req, res) {
        try {
            let AllProject = null;
            const { id } = req.params;
            id ? AllProject = await projectModel.findById(id) : AllProject = await projectModel.find()
            return res.status(201).json({ success: true, msg: "all the skills.", data: AllProject })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Internal server error.", success: false })
        }
    },
    async createProject(req, res) {
        try {
            const { projectname, description, livelink, repogithub, active } = req.body
            let tech = req.body.tech;
            if (typeof tech === "string") {
                tech = JSON.parse(tech)
            }
            const thumbnail = req.files?.thumbnail;
            if (!projectname || !livelink || !repogithub) {
                return res.status(400).json({ success: false, msg: "All fields are required." });
            }

            const exiting = await projectModel.findOne({ repogithub });
            if (exiting) {
                return res.status(409).json({ success: false, msg: "project already exists." });
            }
            const thumbnailName = imgUniueName(thumbnail.name);
            const destination = 'public/images/projects/' + thumbnailName;
            thumbnail.mv(destination, async (error) => {
                if (error) {
                    return res.status(500).json({ msg: "File upload failed.", success: false });
                }
            })
            const projectData = await projectModel.create({
                projectname,
                tech,
                description,
                livelink,
                repogithub,
                thumbnail: thumbnailName,
                active
            })
            projectData.save();
            return res.status(201).json({ msg: "Project added successfully.", success: true, data: projectData });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Internal server error.", success: false })

        }

    },
    async updateProject(req, res) {

    },
    async deleteProject(req, res) {
        try {
            const { id } = req.params;
            const exiting = await projectModel.findById(id);
            if (!exiting) {
                return res.status(404).json({ msg: "project Not Found...", success: false })
            }
            fs.unlinkSync(`./public/images/projects/${exiting.thumbnail}`)
            await projectModel.findByIdAndDelete(id);
            return res.status(201).json({ msg: "Project delete successfully.", success: true });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Internal server error.", success: false })
        }
    }

}

module.exports = projectControllers
