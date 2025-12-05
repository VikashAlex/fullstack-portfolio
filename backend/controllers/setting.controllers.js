const settingModel = require('../models/setting.model');
const settingControllers = {
    async getSetting(req, res) {
        try {
            let AllSetting = await settingModel.find();
            return res.status(201).json({ success: true, msg: "all the setting.", data: AllSetting })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Internal server error.", success: false })
        }
    },
    async updateSetting(req, res) {
        const { id } = req.params;
        const update = req.body
        const exiting = await settingModel.findById(id);
        if (JSON.stringify(update) === JSON.stringify(exiting.toObject())) {
            return res.status(301).json({ success: false, msg: "setting up to date...." })
        }

        const updated = await settingModel.findByIdAndUpdate(
            req.params.id,
            { $set: update },
            { new: true }
        );
        return res.status(201).json({ success: true, msg: "setting update....",data:updated})
    },
}

module.exports = settingControllers
