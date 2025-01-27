const mongoose = require("mongoose")
const min = 10000000;
const max = 91273843;
function generateRandom7DigitNumber() {
    return Math.floor(1000000 + Math.random() * 9000000);
}
const schemaDef = new mongoose.Schema({
    "name": {
        type: String,
        required: true,
    },
    "date_of_birth": {
        type: Date,
        required: [true, "date is compulsory"],
        validate: {
            validator: function (v) {

                const diff = Date.now() - v.getTime();
                const age = new Date(diff).getUTCFullYear() - 1970;
                return age >= 10;
            },
            message: props => `${props.value} is not a valid age. Age must be at least 10 years.`
        }
    },
    "mobile_number": {
        type: Number,
        required: [true, "mobile number is compulsory"],
        validate: {
            validator: function (v) {
                return v.toString().length === 10;
            },
            message: props => `${props.value} is not a valid number. Number must be 10 digits.`
        }
    },
    "profile_photo": {

        filename: { type: String },
        file: { type: Buffer },
        uploaded_at: { type: Date, default: Date.now }

    },
    "address": {
        type: String,
        required: true,

    },
    "city": {
        type: String,
        required: true,
        validate: {
            validator: function (v) {

                return /^[a-z A-Z]+$/.test(v);
            },
            message: props => `${props.value} is not a city`
        }
    },
    "state": {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[a-z A-Z]+$/.test(v);
            },
            message: props => `${props.value} is not a state`
        }
    },
    "country": {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[a-z A-Z]+$/.test(v);
            },
            message: props => `${props.value} is not a country`
        }
    },
    "identity_number": {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return v.toString().length >= 5;
            },
            message: props => `${props.value} is not a valid identity number. Number must be 5 digits.`
        }
    },
    "favourites": [{
        "reference_number": {
            type: Number
        }

    }],
    "reports": [{
        "postid": {
            type: String
        }
    }],
    "language": {
        type: String,
    },
    "password": {
        type: String,
        default: function() {
            return this.mobile_number;
        }
    },
    "identity_proof": {

        filename: { type: String, required: true },
        file: { type: Buffer, required: true },
        uploaded_at: { type: Date, default: Date.now }

    }
})
const conschema = new mongoose.Schema({
    "name": {
        type: String,
        required: true,
    },
    "mobile_number": {
        type: Number,
        required: [true, "mobile number is compulsory"],
        validate: {
            validator: function (v) {
                return v.toString().length === 10;
            },
            message: props => `${props.value} is not a valid number. Number must be 10 digits.`
        }
    },
    "profile_photo": {

        filename: { type: String },
        file: { type: Buffer },
        uploaded_at: { type: Date, default: Date.now }

    },
    "company_name": {
        type: String,
        required: true,
    },
    "address": {
        type: String,
        required: true,

    },
    "city": {
        type: String,
        required: true,
        validate: {
            validator: function (v) {

                return /^[a-z A-Z]+$/.test(v);
            },
            message: props => `${props.value} is not a city`
        }
    },
    "state": {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[a-z A-Z]+$/.test(v);
            },
            message: props => `${props.value} is not a state`
        }
    },
    "country": {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[a-z A-Z]+$/.test(v);
            },
            message: props => `${props.value} is not a country`
        }
    },
    "identity_number": {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return v.toString().length >= 5;
            },
            message: props => `${props.value} is not a valid identity number. Number must be 5 digits.`
        }
    },
    "posts": [{
        "project_name": {
            type: String,
            required: true,
        },
        "project_location": {
            type: String,
            required: true,
        },
        "salary": {
            type: Number,
            required: true,

        },
        "job_description": {
            type: String,
            required: true,

        },
        "workers_type": {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^[a-z A-Z]+$/.test(v);
                },
                message: props => `${props.value} is not a type`
            }

        },
        "workers": {
            "applied": {
                "individual": [
                    {
                        "mobile_number": {
                            type: Number
                        }
                    }
                ],
                "group": [{
                    "reference_number": {
                        type: Number
                    }
                }]
            },
            "current": {
                "individual": [
                    {
                        "mobile_number": {
                            type: Number
                        }
                    }
                ],
                "group": [{
                    "reference_number": {
                        type: Number
                    }
                }]
            },
            "completed": {
                "individual": [
                    {
                        "mobile_number": {
                            type: Number
                        }
                    }
                ],
                "group": [{
                    "reference_number": {
                        type: Number
                    }
                }]
            },
        }

    }],
    "favourites": [{
        "reference_number": {
            type: Number
        }

    }],

    "identity_proof": {

        filename: { type: String, required: true },
        file: { type: Buffer, required: true },
        uploaded_at: { type: Date, default: Date.now }

    },
    "institution_proof": {

        filename: { type: String, required: true },
        file: { type: Buffer, required: true },
        uploaded_at: { type: Date, default: Date.now }

    },
    "password": {
        type: String,
        default: function() {
            return this.mobile_number;
        }
    },
})
const groups = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    admin: {
        type: Number,
        required: true,
    },
    members: {
        type: [{
            mobile_number: {
                type: Number,
                required: true 
            }
        }],
        validate: {
            validator: function (members) {
                
                return members.length <= this.size;
            },
            message: 'The group is full. no more members can be added'
        }
    },
    reference_number: {
        type: Number,
        default: generateRandom7DigitNumber,
    },
    "profile_photo": {

        filename: { type: String },
        file: { type: Buffer },
        uploaded_at: { type: Date, default: Date.now }

    },
})
module.exports = { schemaDef, conschema, groups }