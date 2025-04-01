'use client'
import React, { useEffect } from 'react'
import Script from 'next/script'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayment, initiate } from '@/actions/useraction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation'


const Paymentpage = ({username}) => {

    // const {data:session}=useSession()

    const [paymentform, setpaymentform] = useState({})
    const [currentuser, setCurrentuser] = useState({})
    const [payments, setPayments] = useState([])
    const Searchparams=useSearchParams()
    
    useEffect(() => {
      getdata()
    }, [])

    useEffect(() => {
    if(Searchparams.get("paymentdone")==true ){
      toast('thank fo ryour donation', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
    }, [])
    
    const handelchange=(e)=>{
        setpaymentform({...paymentform,[e.target.name]:e.target.value})
    }

    const getdata = async ()=>{
      let u = await fetchuser(username)
      if (!u) {
        console.log("User not found")
        // Handle user not found case - maybe show an error message
        return
      }
      setCurrentuser(u)
      let dbpayments = await fetchpayment(username)
      setPayments(dbpayments)
      console.log(u)
      console.log(dbpayments)
    }

    const pay= async (amount)=>{
        let a=await initiate(amount,username,paymentform)
       let orderId=a.id
        var options = {
            "key": process.env.NEXT_PUBLIC_key_id, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "ByMeAchai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id":orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url":`${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);     
            rzp1.open();
        
    }
    return (
        <>

<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
             
    <div className="cover w-full relative min-h-[100vh]:">
      <img className='object-cover' src={currentuser.coverpic} alt="" />

      <div className='absolute -bottom-14 right-[46%] rounded-full '>
        <img className='flex justify-center items-center rounded-full' width={100} height={100} src={currentuser.profilepic}alt="" />
      </div>

    </div>
      <div className="info flex justify-center items-center my-19 flex-col gap-2  ">
        <div className='font-bold text-lg text-center rigth-[46%]'>

         @{username}
        </div>
      
      <div className='text-slate-400'>
      Lets help {username} get a chai!
      </div>
      <div className='flex space-x-4 text-slate-400'>
      {payments.length} Payments .   ₹{payments.reduce((a, b) => a + b.amount, 0)} raised
     
      </div>

      <div className="payment flex gap-3 w-[80%] mt-11">
        <div className="supporters w-1/2 bg-slate-800 rounded-lg p-10">
          {/* showing the list of all the contributer as a leader bord */}
            <h2 className='text-2xl my-5  font-bold'>Suppoters</h2>
          <ul className='mx-5 text-lg'>
          {payments.length ==0 && <li>No payments yet </li>}
          {payments.map((p,i)=>{
            return <li key={i} className='my-4 flex gap-2 items-center'>     
              <img width={33} src="/avatar.gif" alt="" />
              <span>{p.name}<span className='font-bold '>paid{p.amount} </span>with a messages :{p.message}</span>
            </li>
            
            })}

          </ul>

        </div>

        <div className="makepayment w-1/2 bg-slate-800 rounded-lg p-10">
            <h2 className='text-2xl  font-bold my-5'>Make a Payment</h2>
            <div className='flex gap-2 flex-col'>

              <input onChange={handelchange} value={paymentform.name} type="text" className='w-full  p-3 rounded-lg bg-slate-800' name="name" id="" placeholder='Enter Name'/>
              <input  onChange={handelchange} value={paymentform.message} type="text" className='w-full p-3 rounded-lg bg-slate-800' name="message" id="" placeholder='Enter Message'/>
              <input  onChange={handelchange} value={paymentform.amount} type="text" className='w-full p-3 rounded-lg bg-slate-800 ' placeholder='Enter Amount' name="amount" id="" />
              <button onClick={()=>{pay(paymentform.amount)}} type="button" className="text-white bg-gradient-to-br from-purple-900 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-900 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Pay</button>

            </div>

            {/* choose from these amounts  */}

            <div className='flex gap-2 mt-5'>
              <button className='bg-slate-800 rounded-lg p-3 'onClick={()=>pay(1000)}>Pay ₹10</button>
              <button className='bg-slate-800 rounded-lg p-3 'onClick={()=>pay(2000)}>Pay ₹20</button>
              <button className='bg-slate-800 rounded-lg p-3 'onClick={()=>pay(3000)}>Pay ₹30</button>
            </div>
        </div>

      </div>


      </div>
        </>
    )
}

export default Paymentpage
