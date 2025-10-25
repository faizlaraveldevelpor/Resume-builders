import mongoose from "mongoose";
export interface DocomentSchemaType extends Document {
  docoment:string
}
const DocomentSchema=new mongoose.Schema<DocomentSchemaType>({
    docoment:{
        type:String
    }
},{timestamps:true})

export const DocomentModel=mongoose.model<DocomentSchemaType>("docoment",DocomentSchema)