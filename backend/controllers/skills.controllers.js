
const skillsModel = require('../models/skills.model');
const imgUniueName = require('../utility/helper');
const fs = require('fs')




const skillsControllers = {
    async getSkills(req, res) {
        try {
            let skillData = null;
            const {id}=req.params;
            id ?skillData = await skillsModel.findById(id) : skillData = await skillsModel.find()
            return res.status(201).json({ success: true, msg: "all the skills.", data: skillData })
        } catch (error) {
            console.log(error)
             return res.status(500).json({ msg: "Internal server error.", success: false })
        }
    },
    async createSkills(req, res) {
        try {
            const { skill, category, proficiency, colorCode, active } = req.body
            const icon = req.files?.icon;
            if (!skill || !category || !proficiency || !colorCode) {
                return res.status(400).json({ success: false, msg: "All fields are required." });
            }



            const exiting = await skillsModel.findOne({ skill });
            if (exiting) {
                return res.status(409).json({ success: false, msg: "Skill already exists." });
            }
            const iconName = imgUniueName(icon.name);
            const destination = 'public/images/icons/' + iconName;
            icon.mv(destination, async (error) => {
                if (error) {
                    return res.status(500).json({ msg: "File upload failed.", success: false });
                }
            })
            const skillData = await skillsModel.create({
                skill,
                category,
                proficiency,
                colorCode,
                active,
                icon: iconName
            })
            skillData.save();
            return res.status(201).json({ msg: "Skill added successfully.", success: true, data: skillData });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Internal server error.", success: false })

        }
    },
    async updateSkills(req, res) {
        try {
            console.log("first")
        } catch (error) {
            console.log(error)
        }
    },
    async deleteSkills(req, res) {
        try {
            const { id } = req.params;
            const exiting = await skillsModel.findById(id);
            if (!exiting) {
                return res.status(404).json({ msg: "Skill not found.", success: false })
            }
            fs.unlinkSync(`./public/images/icons/${exiting.icon}`)
            await skillsModel.findByIdAndDelete(id)
            return res.status(201).json({ msg: "Skill delete successfully.", success: true, });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Internal server error.", success: false })
        }
    }

}

module.exports = skillsControllers;
