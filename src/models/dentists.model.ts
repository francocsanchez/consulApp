import mongoose, { Schema, Document } from "mongoose";

export interface IDentist extends Document {
  name: string;
  fee: number;
  enable: boolean;
}

const dentistSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    dni: {
      type: Number,
      required: true,
      unique: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    enable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Dentist = mongoose.model<IDentist>("Dentist", dentistSchema);
export default Dentist;
