import fileUpload from 'express-fileupload';
import { validators } from './validate';
import { Document, Schema, model } from "mongoose";



export interface IVacationModel extends Document {
    destination: string;
    description: string;
    startDate: Date;
    endDate: Date;
    price: number;
}

export const VacationSchema = new Schema<IVacationModel>({
    destination: {
        type: String,
        required: [true, "Missing  destination."],
        minlength: [2, "destination name too short"],
        maxlength: [50, "destination name too short."],
        validate: validators.nameValidator,
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Missing last name."],
        minlength: [10, "description too short"],
        maxlength: [200, "description too long."],
        trim: true,
    },
    startDate: {
        type: Date,
        required: [true, "Missing start date."],
        validate: {
            validator: function (value) {
                if (this.endDate && value > this.endDate) {
                    return false;
                }
                return true;
            },
            message: 'Start date cannot be later than end date.'
        }
    },
    endDate: {
        type: Date,
        required: [true, "Missing password."],
        validate: {
            validator: function (value) {
                if (this.startDate && value > this.startDate) {
                    return false;
                }
                return true;
            },
            message: 'End date cannot be earlier than start date.'
        }
    },

}, {
    versionKey: false,
    timestamps: true,

});


export const VacationModel = model<IVacationModel>("VacationModel", VacationSchema, "vacations"); 
