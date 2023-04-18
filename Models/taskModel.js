import mongoose from "mongoose";

const TasksSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    uesrId:{
        type:String
    }
    
})

export default mongoose.model("tasks",TasksSchema)