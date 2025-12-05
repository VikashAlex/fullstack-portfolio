const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        projectname: {
            type: String,
            trim: true,
            required: [true, "project name is required"],
        },
        tech: {
            type: [String],   
            trim: true,
            required: [true, "Tech is required"],
        },
        description: {
            type: String,
            trim: true,
            default: null,
        },
        livelink: {
            type: String,
            trim: true,
            default: null,
        },
        repogithub: {
            type: String,
            trim: true,
            default: null,
        },
        thumbnail: {
            type: String,
            trim: true,
            default: null,
        },
        active: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("project", projectSchema);
