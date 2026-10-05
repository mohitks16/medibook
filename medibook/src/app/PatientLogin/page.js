import React from 'react'

export default function page() {
  return (
    
     <div className='flex justify-center bg-[#E5E7EB] items-center py-10 my-3'>
            <div className='w-[440px] bg-white py-10 px-15 rounded-2xl '>

                <div className='text-[28px] mb-2 font-bold'>
                    Patient Login 
                </div>

                <form className='my-3' action="">

                    <label className='font-semibold' htmlFor="">Phone Number</label>
                    <input className='w-full px-3 my-2 py-2 border-2  border-[#cccccc57] outline-none rounded-xl ' placeholder='+91 8824987634' type="number" />

                    <button className='w-full mt-5 px-5 py-3 text-white font-semibold hover:bg-blue-300 rounded-xl text-center bg-[#2563EB]'>
                        Request OTP
                    </button>

                    <div className="text-center mt-5">
                        <p>Don't have an account ? <span className='text-[#2563EB]'> Register here </span></p>
                    </div>

                </form>
            </div>
        </div>
  )
}
