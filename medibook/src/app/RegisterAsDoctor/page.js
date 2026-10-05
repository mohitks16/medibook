import React from 'react'

export default function page() {
    return (
        <div className='flex justify-center bg-[#E5E7EB] items-center py-10'>
            <div className='w-[640px] bg-white py-10 px-15 rounded-2xl '>
                <div className='text-[28px] mb-2 font-bold'>
                    Register As Doctor
                </div>
                <div className='text-[#6B7280] text-[14px] text-wrap '>
                    Join our platform and connect with thousands of patients. Submit credentials for clinical verification.
                </div>

                <form className='my-3' action="">
                    <label className='font-semibold' htmlFor="">Full name</label>
                    <input className='w-full px-3 my-2 py-2 border-2  border-[#cccccc57] outline-none rounded-xl ' type="text" />

                    <label className='font-semibold' htmlFor="">Email</label>
                    <input className='  outline-none w-full px-3 my-2 py-2 border-2 border-[#cccccc57] rounded-xl ' type="Email" />

                    <label className='font-semibold' htmlFor="">Phone Number</label>
                    <input className='  outline-none w-full px-3 my-2 py-2 border-2 border-[#cccccc57] rounded-xl ' type="number" />

                    <div className='flex'>
                        <div>
                            <label className='font-semibold ' htmlFor="">Years of Expereience</label>
                            <input className='  outline-none w-50 px-3 my-2 py-2 border-2 border-[#cccccc57] rounded-xl ' type="number" />
                        </div>
                        <div>
                            <label className='font-semibold' htmlFor="">Specialisation</label>
                            <input className='  outline-none w-50 px-3 my-2 py-2 border-2 border-[#cccccc57] rounded-xl ' type="number" />
                        </div>

                    </div>

                    <label className='font-semibold' htmlFor="">Currently Working at hospital/clinic </label>
                    <input className='  outline-none w-full px-3 my-2 py-2 border-2 border-[#cccccc57] rounded-xl ' type="text" />

                    <label className='font-semibold' htmlFor="">Education / degree </label>
                    <input className='  outline-none w-full px-3 my-2 py-2 border-2 border-[#cccccc57] rounded-xl ' type="text" />

                    <p className='font-semibold my-3 '> ID & Credential Proof Upload </p>

                    <label className="flex flex-col items-center gap-2 p-6 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer">
                        {/* Icon */}
                        <div className="w-6 h-6">
                            <img src="/vector.svg" alt="Upload Icon" className="w-full h-full" />
                        </div>

                        {/* Title */}
                        <p className="text-sm font-semibold text-blue-600">
                            Upload Certificate PDF / JPEG
                        </p>

                        {/* Subtitle */}
                        <p className="text-xs text-gray-500 text-center">
                            Upload government medical registration proof (Max 10MB)
                        </p>

                        {/* Hidden Input */}
                        <input type="file" accept=".pdf,.jpg,.jpeg" className="hidden" />

                    </label>

                <button className='w-full mt-5 px-5 py-3 text-white font-semibold hover:bg-blue-300 rounded-xl text-center bg-[#2563EB]'>
                        Submit Registration 
                </button>

                </form>
            </div>
        </div>
    )
}
