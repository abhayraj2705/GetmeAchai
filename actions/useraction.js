"use server"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDb from "@/db/connectdb"
import User from "@/models/User"
import { error } from "console"

export const initiate = async(amount,to_Username,paymentform)=>{
  await connectDb()
  var instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_key_id, key_secret:process.env.key_secret })

  let options={
      amount : Number.parseInt(amount),
      currency:"INR"
  }

  let x=await instance.orders.create(options)

  // create an Payment object which shows the pending object 
  console.log("Payment form:", paymentform) // Add logging to debug

  const newPayment = await Payment.create({
    oid: x.id, 
    amount: amount,
    to_user: to_Username,
    name: paymentform.name,
    message: paymentform.message // This should now work correctly
  })

  console.log("Created payment:", newPayment) // Add logging to debug
  return x 
}

export const fetchuser = async (username) => {
  await connectDb()
  console.log(username)
  let u = await User.findOne({ username: username }).lean() // Use lean() to get plain object
  if (!u) {
    return null
  }
  
  // Convert _id to string and create a clean object
  return {
    email: u.email,
    username: u.username,
    name: u.name || '',
    profilepic: u.profilepic || '',
    coverpic: u.coverpic || '',
    razorpayid: u.razorpayid || '',
    razorpaysecret: u.razorpaysecret || ''
  }
}

export const fetchpayment = async (username) => {
  await connectDb()
  // find all payments sorted by decreasing order of amount and flatten object ids
  let p = await Payment.find({ to_user: username, done:true }).sort({ amount: -1 }).lean()
  console.log(p)
  return p
}

export const updateprofile = async (data, oldusername) => {
    await connectDb()
    try {
        let ndata = Object.fromEntries(data)

        if(oldusername !== ndata.username) {
            let u = await User.findOne({username: ndata.username})
            if(u) {
                return {error: "username already exists"}
            }
        }

        const updatedUser = await User.findOneAndUpdate(
            {email: ndata.email},
            {
                username: ndata.username,
                name: ndata.name,
                profilepic: ndata.profilepic,
                coverpic: ndata.coverpic,
                razorpayid: ndata.razorpayid,
                razorpaysecret: ndata.razorpaysecret
            },
            {new: true, lean: true}
        )

        if (!updatedUser) {
            return {error: "Failed to update user"}
        }

        // Return clean serialized object
        return {
            success: true,
            user: {
                email: updatedUser.email,
                username: updatedUser.username,
                name: updatedUser.name || '',
                profilepic: updatedUser.profilepic || '',
                coverpic: updatedUser.coverpic || '',
                razorpayid: updatedUser.razorpayid || '',
                razorpaysecret: updatedUser.razorpaysecret || ''
            }
        }
    } catch (err) {
        console.error("Error updating profile:", err)
        return {error: err.message}
    }
}