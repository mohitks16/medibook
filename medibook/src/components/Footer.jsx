import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 px-20 pt-[60px] pb-10 flex flex-col gap-10">
      {/* Top Section */}
      <div className="flex justify-between w-full">
        {/* Logo + Description */}
        <div className="w-80 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 flex items-center justify-center bg-blue-600 rounded-md">
              <Image src="/ambulance.svg" alt="Ambulance Icon" width={14} height={14} />
            </div>
            <div className="text-lg font-bold text-white">MedConnect</div>
          </div>
          <p className="text-sm text-gray-500">
            Connecting patients with trusted healthcare professionals instantly.
            Simple scheduling, verified credentials.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-16">
          <div className="flex flex-col gap-3">
            <div className="text-sm font-semibold text-white">For Patients</div>
            <div className="text-[13px] text-gray-500">Search for Doctors</div>
            <div className="text-[13px] text-gray-500">Book Appointments</div>
            <div className="text-[13px] text-gray-500">Patient Portal</div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-sm font-semibold text-white">For Doctors</div>
            <div className="text-[13px] text-gray-500">Join MedConnect</div>
            <div className="text-[13px] text-gray-500">Professional Portal</div>
            <div className="text-[13px] text-gray-500">Guidelines</div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-sm font-semibold text-white">Legal</div>
            <div className="text-[13px] text-gray-500">Privacy Policy</div>
            <div className="text-[13px] text-gray-500">Terms of Use</div>
            <div className="text-[13px] text-gray-500">HIPAA Compliance</div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <Image src="/line.svg" alt="Divider Line" width={1280} height={1} />

      {/* Bottom Section */}
      <div className="flex justify-between w-full">
        <p className="text-[13px] text-gray-500">© 2026 MedConnect. All rights reserved.</p>
        <p className="text-[13px] text-gray-500">Providing standard clinical assurance.</p>
      </div>
    </footer>
  );
}
