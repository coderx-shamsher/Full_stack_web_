
import mongoose from 'mongoose';

const Sub_Todo_Schema = new mongoose.Schema({
   content : {
     type : String,
     required : true,
   },
   complete : {
      type : Boolean,
      default : false
   },
   // optional jab need hogi uncomment krluga 
  //  createBy: {
  //     type : mongoose.Schema.Types.ObjectId,
  //     ref : "User"
  //  }
}, { timestamps: true });

export const SubTodo = mongoose.model('SubTodo', Sub_Todo_Schema);
