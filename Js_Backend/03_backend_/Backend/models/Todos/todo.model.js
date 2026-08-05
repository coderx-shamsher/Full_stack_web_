import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
    content : {
       type : String,
       required : true,
    },
    complete : {
       type : Boolean,
       default : false 
    },
    // now ham yana declare krenge ki kisne todo create kiya
    createBy : {
      // first hame type main mongoose.schema.types.objectid lete hai next important hai, jo ki hai reference 
       type : mongoose.Schema.Types.ObjectId,
       // give the ref name jo hamen model mein pass kr hai line mere user model main "User" tha 
       ref : "User"
    },
    // subtodo 
    // array of object of subtodos
    subTodos : [
       {
         type : mongoose.Schema.Types.ObjectId,
         ref : "SubTodo"
       }
    ]
}, { timeseries: true });

export const Todo = mongoose.model('Todo', TodoSchema);
