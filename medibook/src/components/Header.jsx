import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Header() {
    return (
        <nav className='max-w-full px-[80px] flex py-4 '>
            <div className='flex gap-[10px] flex-1'>
                <div>
                    <Image
                        src="/logo-icon.svg"
                        alt="Doctor Icon"
                        width={36}
                        height={36}
                    />
                </div>
                <div className='text-[20px] font-bold'>Medibook</div>
            </div>
            <div className='flex flex-1 gap-[16px] items-center'>
                <Link href='/PatientDashboard/123'>
                    <div className='font-semibold text-[14px]' >Search Doctor </div>
                </Link>

                <Link href='/RegisterAsDoctor'>
                    <div className='font-semibold text-[14px]' >Register as Doctor </div>
                </Link>

                <Link href='/DoctorLogin'>
                    <div className='font-semibold text-[14px]' >Doctor Login </div>
                </Link>

                <Link href='/PatientLogin'>
                <div className=' hover:bg-blue-300 rounded-[10px] font-semibold text-[14px] text-white bg-[#2563EB] px-4 py-3' >Patient Login / Signup</div>
                </Link>

            </div>
        </nav>
    )
}
