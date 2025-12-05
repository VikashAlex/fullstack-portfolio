const mongoose = require('mongoose');
const settingSchema = new mongoose.Schema({
    githubLink: {
        type: String,
        required: true,
        trim: true,
    },

    linkedinLink: {
        type: String,
        required: true,
        trim: true,
    },

    cvUrl: {
        type: String,
        trim: true,
    },

    siteTitle: {
        type: String,
        required: true,
        trim: true,
    },

    contactEmail: {
        type: String,
        required: true,
        trim: true,
    },

    contactPhone: {
        type: String,
        required: true,
        trim: true,
    },

    Experience: {
        type: String,
        default: "0 Month",
        trim: true,
    },

    happyUser: {
        type: String,
        default: "0 Users",
        trim: true,
    },
});





module.exports = mongoose.model("setting", settingSchema);
