import React from 'react'

export default function page() {
    return (
        <div className='flex justify-center bg-[#E5E7EB] items-center py-10'>
            <div className='w-[440px] bg-white py-10 px-15 rounded-2xl '>
                <div className='text-[28px] mb-2 font-bold'>
                    Doctor login
                </div>
                <div className='text-[#6B7280] text-[14px] text-wrap '>
                    Sign in to access your appointment schedule.                </div>

                <form className='my-3' action="">
                    <label className='font-semibold' htmlFor="">Username</label>
                    <input className='w-full px-3 my-2 py-2 border-2  border-[#cccccc57] outline-none rounded-xl ' placeholder='jane_smith_cardiology' type="text" />

                    <label className='font-semibold' htmlFor="">DoctorId</label>
                    <input className='  outline-none w-full px-3 my-2 py-2 border-2 border-[#cccccc57] rounded-xl ' placeholder='MD-2049-SA' type="Email" />

                    <label className='font-semibold' htmlFor="">Password</label>
                    <input className='  outline-none w-full px-3 my-2 py-2 border-2 border-[#cccccc57] rounded-xl ' placeholder='password' type="password" />



                    <button className='w-full mt-5 px-5 py-3 text-white font-semibold hover:bg-blue-300 rounded-xl text-center bg-[#2563EB]'>
                        Login
                    </button>

                    <div className="text-center mt-5"> {/* Add this div to center the text */}
                        <p>New Doctor ? <span className='text-[#2563EB]'> Register here </span></p>
                    </div>

                </form>
            </div>
        </div>
    )
}
