const mongoose = require('mongoose');

const skillsSchema = new mongoose.Schema(
    {
        skill: {
            type: String,
            trim: true,
            required: [true, "skill name is required"],
            unique: true,
        },

        category: {
            type: String,
            trim: true,
            required: [true, "Category is required"],
        },
        icon: {
            type: String,
            trim: true,
            default: null,
        },
        proficiency: {
            type: Number,
            trim: true,
            default: 0
        },
        colorCode: {
            type: String,
            trim: true,
            default: null,
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("skills", skillsSchema);
