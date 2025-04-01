import mongoose, { mongo } from "mongoose";
const {Schema,model,models} = mongoose;

const UserSchema=new Schema({
 email:{required:true, type:String},
 username:{required:true, type:String},
 name:{type:String},
 profilepic:{type:String},
 coverpic:{type:String},
 razorpayid:{type:String},
 razorpaysecret:{type:String}
})

const User = models.User || model("User", UserSchema);
export default User;