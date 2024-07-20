import mongoose, { Document, ObjectId, Schema, model } from "mongoose";
import { UserModel } from "./user-model";
import { VacationModel } from "./vacation-model";

// 1. Interface describing our model:
export interface ILikeModel extends Document { // Document = a single object in a JSON collection.
    // We have _id from the Document
    userId: ObjectId;
    vacationId: ObjectId;
}

// 2. Schema describing more data, validation and more:
export const LikeSchema = new Schema<ILikeModel>({

    userId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Missing name id"]
    },
    vacationId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Missing vacation id"]
    }
}, {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true }, // Fill virtual fields.
    id: false // Don't duplicate _id to id.
});

// Virtual field - שדה שלא באמת קיים באוסף, אלא נבנה בזמן החזרת המידע
LikeSchema.virtual("user", {
    ref: UserModel, // Which other model we're connecting to.
    localField: "userId", // In our model (LikeModel) which field name belongs to the relation.
    foreignField: "_id", // In the other model (UserModel) which field name belongs to the relation.
});
LikeSchema.virtual("vacation", {
    ref: VacationModel, // Which other model we're connecting to.
    localField: "vacationId", // In our model (LikeModel) which field name belongs to the relation.
    foreignField: "_id", // In the other model (VacationModel) which field name belongs to the relation.
    justOne: true
});

// 3. Creating the model:
export const LikeModel = model<ILikeModel>("LikeModel", LikeSchema, "likes"); // model name, schema, collection name
