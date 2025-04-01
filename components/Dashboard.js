'use client'
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchuser } from '@/actions/useraction'
import { updateprofile } from '@/actions/useraction'
import { useState } from 'react'
import { useEffect } from 'react'

const Dashboard = () => {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [form, setform] = useState({})
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push('/Login')
        } else {
            getData()
        }
    }, [session, status])

    const getData = async () => {
        try {
            if (!session?.user?.name) return;
            let u = await fetchuser(session.user.name)
            if (u) setform(u)
        } catch (error) {
            console.error("Error fetching user:", error)
        } finally {
            setLoading(false)
        }
    }

    const handelchange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
        console.log("Form data:", form)
    }

    const handelsubmit = async (formData) => {
        try {
            console.log("Submitting form data:", Object.fromEntries(formData))
            const result = await updateprofile(formData, session.user.name)
            console.log("Update response:", result)
            
            if (result.success) {
                setform(result.user)
                alert("Profile updated successfully!")
            } else {
                alert(result.error || "Failed to update profile")
            }
        } catch (error) {
            console.error("Error updating profile:", error)
            alert("Error updating profile")
        }
    }

    return (
        <>
            <div className='container mx-auto py-5 px-6'>
                <h1 className='text-center my-5 text-3xl font-bold'>Welcome to your Dashboard</h1>

                <form className='max-w-2xl mx-auto' action={handelsubmit}>
                    <div className='my-2'>
                        <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Name</label>
                        <input onChange={handelchange} value={form.name ? form.name : ""} type='text' name='name' id='name' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>

                    <div className='my-2'>
                        <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</label>
                        <input onChange={handelchange} value={form.email ? form.email : ""} type='email' name='email' id='email' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>

                    <div className='my-2'>
                        <label htmlFor='username' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Username</label>
                        <input onChange={handelchange} value={form.username ? form.username : ""} type='text' name='username' id='username' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>

                    <div className='my-2'>
                        <label htmlFor='profilepic' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Profile Picture URL</label>
                        <input onChange={handelchange} value={form.profilepic ? form.profilepic : ""} type='text' name='profilepic' id='profilepic' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>

                    <div className='my-2'>
                        <label htmlFor='coverpic' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Cover Picture</label>
                        <input onChange={handelchange} value={form.coverpic ? form.coverpic : ""} type='text' name='coverpic' id='coverpic' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>

                    <div className='my-2'>
                        <label htmlFor='razorpayid' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Razorpay Id</label>
                        <input onChange={handelchange} value={form.razorpayid ? form.razorpayid : ""} type='text' name='razorpayid' id='razorpayid' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>

                    <div className='my-2'>
                        <label htmlFor='razorpaysecret' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Razorpay Secret</label>
                        <input onChange={handelchange} value={form.razorpaysecret ? form.razorpaysecret : ""} type='text' name='razorpaysecret' id='razorpaysecret' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </div>

                    <div className='my-6'>
                        <button type='submit' className='block w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-blue-500 focus:ring-4 focus:outline-none dark:focus:ring-blue-800 font-medium text-sm'>Save</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Dashboard
