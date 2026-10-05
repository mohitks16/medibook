'use client'
import React, { useState } from 'react'

export default function page() {
    
    const [mainTab, setMainTab] = useState("profile");
    const [apptFilter, setApptFilter] = useState("all");
    const [availTab, setAvailTab] = useState("add");

    // Specializations to be controlled via admin panel
    const specializations = [
        "Cardiologist", "Neurologist", "Dermatologist", "Orthopedist",
        "Pediatrician", "Gynecologist", "Ophthalmologist", "ENT Specialist",
        "Psychiatrist", "General Physician", "Dentist", "Radiologist",
    ];
    const timeSlots = [
        "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
        "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
        "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM",
    ];


    // Degrees to be controlled via admin panel
    const degrees = ["MBBS", "BDS", "BSc Nursing", "MD", "MS", "MSc", "DNB", "DM", "MCh", "MDS", "BAMS", "BHMS"];
    const [apptTab, setApptTab] = useState("list");

    // Profiles will be fetched via backend API
    const [profile, setProfile] = useState({
        name: "Name Of the Doctor ",
        specialization: "Please Enter The Specialisation ",
        fee: "Please Enter The Fee ",
        experience: "Please Enter The Experience ",
        bio: "Please Enter The Bio ",
        hospital: "Please Enter The Hospital ",
        degrees: ["MBBS", "BDS"]
    });

    const toggleDegree = (degree) => {
        if (profile.degrees.includes(degree)) {
            setProfile((p) => ({ ...p, degrees: p.degrees.filter((d) => d !== degree) }));
        } else {
            setProfile((p) => ({ ...p, degrees: [...p.degrees, degree] }));
        }
    };


    return (
        <>
            <div className='px-60'>

                {/*////////////////////// Name And  Stats ///////////////////////////////////  */}

                <div className=' my-5  flex justify-between' >
                    <div >
                        <p className='text-2xl font-bold '>Welcome Back Doctor Mheta </p>
                        <p>3 pending appointments today </p>
                    </div>
                    <div >
                        <div className="flex gap-2">
                            <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-center">
                                <p className="text-xl font-bold text-blue-600">5</p>
                                <p className="text-xs text-slate-500">Total</p>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-center">
                                <p className="text-xl font-bold text-amber-500">3</p>
                                <p className="text-xs text-slate-500">Pending</p>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-center">
                                <p className="text-xl font-bold text-teal-600">2</p>
                                <p className="text-xs text-slate-500">Done</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ///////////////////////////////////////////////////////////////////////////////////////////// */}

                {/* Tabbings  */}

                <div className="flex gap-2 mb-6 bg-white border border-slate-200 rounded-xl p-1 w-fit">
                    <button
                        onClick={() => setMainTab("profile")}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${mainTab === "profile" ? "bg-blue-600 text-white" : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"}`}
                    >
                        Profile Setup
                    </button>
                    <button
                        onClick={() => setMainTab("appointments")}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${mainTab === "appointments" ? "bg-blue-600 text-white" : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"}`}
                    >
                        Appointment
                    </button>
                </div>

                {/* ///////////////////////////////////////////////////////////////////////////////////////////// */}

                {/*////////////////////// Profile Setup ///////////////////////////////////  */}
                {mainTab === "profile" && (
                    // <p>Profile Setup</p>

                    <div className='flex gap-6 ' >
                        <div className='w-2/3'>
                            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
                                <h2 className="font-semibold text-slate-900">Profile Information</h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                                        <input

                                            onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                                            className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Specialization</label>
                                        <select
                                            value={profile.specialization}
                                            onChange={(e) => setProfile((p) => ({ ...p, specialization: e.target.value }))}
                                            className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                        >
                                            {specializations.map((s) => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Consultation Fee (₹)</label>
                                        <input
                                            type="number"
                                            value={profile.fee}
                                            onChange={(e) => setProfile((p) => ({ ...p, fee: e.target.value }))}
                                            className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Years of Experience</label>
                                        <input
                                            type="number"
                                            value={profile.experience}
                                            onChange={(e) => setProfile((p) => ({ ...p, experience: e.target.value }))}
                                            className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Currently Working At</label>
                                    <input
                                        value={profile.hospital}
                                        onChange={(e) => setProfile((p) => ({ ...p, hospital: e.target.value }))}
                                        className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Professional Bio</label>
                                    <textarea
                                        rows={3}
                                        value={profile.bio}
                                        onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                                        className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    />
                                </div>
                            </div>

                            <div className="bg-white border border-slate-200 rounded-2xl my-5 p-6">
                                <h2 className="font-semibold text-slate-900 mb-1">Degree Badges</h2>
                                <p className="text-xs text-slate-500 mb-4">Select all degrees that apply to your qualifications</p>
                                <div className="flex flex-wrap gap-2">
                                    {degrees.map((d) => (
                                        <button
                                            key={d}
                                            type="button"
                                            onClick={() => toggleDegree(d)}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${profile.degrees.includes(d)
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-slate-600 border-slate-300 hover:border-blue-300"
                                                }`}
                                        >
                                            {d}
                                        </button>

                                    ))}
                                </div>
                            </div>

                            <button
                                // onClick={handleProfileSave}
                                className="w-full my-3 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                            >
                                Save Profile
                            </button>
                        </div>
                        {/* Right Profile Card View  */}
                        <div className='w-1/3 '>
                            <div className="space-y-5">
                                {/* Avatar and name preview */}
                                <div className="bg-white border border-slate-200 rounded-2xl p-5">
                                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-2xl mx-auto mb-4">
                                        AM
                                    </div>
                                    <div className="text-center">
                                        <p className="font-semibold text-slate-900">{profile.name}</p>
                                        <p className="text-sm text-slate-500">{profile.specialization}</p>
                                        <p className="text-xs text-slate-400 mt-1">{profile.hospital}</p>
                                    </div>
                                    <div className="mt-4 flex gap-2 justify-center flex-wrap">
                                        {profile.degrees.map((d) => (
                                            <span key={d} className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-md font-medium">
                                                {d}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Badges preview panel */}
                                <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
                                    <h3 className="text-sm font-semibold text-slate-700">Badges Preview</h3>
                                    <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
                                        <span className="text-2xl">⭐</span>
                                        <div>
                                            <p className="text-xs font-semibold text-amber-800">Experience Badge</p>
                                            <p className="text-xs text-amber-600">{profile.experience}+ Years</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-xl border border-teal-100">
                                        <span className="text-2xl">✅</span>
                                        <div>
                                            <p className="text-xs font-semibold text-teal-800">Consultation Fee</p>
                                            <p className="text-xs text-teal-600">₹{profile.fee} per visit</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                                        <span className="text-2xl">🏥</span>
                                        <div>
                                            <p className="text-xs font-semibold text-blue-800">Verified Specialist</p>
                                            <p className="text-xs text-blue-600">MediBook Verified</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

                {/*////////////////////// Appointment ///////////////////////////////////  */}
                {mainTab === "appointments" && (
                    <>
                        {/* Appontment tabbings  */}

                        <div className="flex gap-2 mb-6 border-b border-slate-200">
                            {["list", "availability"].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setApptTab(t)}
                                    className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${apptTab === t ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-800"
                                        }`}
                                >
                                    {t === "list" ? "Appointments" : "Availability Control"}
                                </button>
                            ))}
                        </div>


                        {apptTab === "list" && (
                            <>
                                {/* Filtering The Different Lists  */}
                                <div className="flex flex-wrap gap-2">
                                    {["all", "pending", "done"].map((f) => (
                                        <button
                                            key={f}
                                            onClick={() => setApptFilter(f)}
                                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${apptFilter === f ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
                                                }`}
                                        >
                                            {f}
                                        </button>
                                    ))}
                                </div>

                                {/* Appointment List  */}

                                <div className="space-y-3 my-5">
                                    <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-start gap-4">
                                        {/* Patient initials avatar */}
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-semibold text-sm shrink-0">
                                            {/* {a.patient.split(" ").map((n) => n[0]).join("")} */}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <p className="font-medium text-slate-900 text-sm">Name of the Patient</p>
                                                    <p className="text-xs text-slate-500">age yrs · Reason for Appointment</p>
                                                </div>
                                                {/* Status badge */}
                                                <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${apptFilter.status === "done"
                                                    ? "bg-teal-50 text-teal-700 border border-teal-100"
                                                    : "bg-amber-50 text-amber-700 border border-amber-100"
                                                    }`}>
                                                    {apptFilter.status === "done" ? "Done" : "Pending"}
                                                </span>
                                            </div>
                                            <div className="mt-2 flex items-center justify-between">
                                                <p className="text-xs text-blue-600 font-medium">🕐 Slot Assigned</p>
                                                {/* Toggle status button */}
                                                <button
                                                    // onClick={() => toggleApptStatus(a.id)}
                                                    className="text-xs text-slate-500 hover:text-blue-600 border border-slate-200 px-2.5 py-1 rounded-lg hover:border-blue-200 transition-colors"
                                                >
                                                    Mark as {apptFilter.status === "done" ? "Pending" : "Done"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {apptTab === "availability" && (

                            <>
                                {/* Appointment Availability  */}

                                <div className="grid lg:grid-cols-2 gap-6">

                                    <div>


                                        <div className="flex gap-2 mb-4 bg-white border border-slate-200 rounded-xl p-1 w-fit">
                                            <button
                                                onClick={() => setAvailTab("add")}
                                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${availTab === "add" ? "bg-blue-600 text-white" : "text-slate-600 hover:text-slate-800"}`}
                                            >
                                                Add Slot
                                            </button>
                                            <button
                                                onClick={() => setAvailTab("view")}
                                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${availTab === "view" ? "bg-blue-600 text-white" : "text-slate-600 hover:text-slate-800"}`}
                                            >
                                                View Slots
                                            </button>
                                        </div>

                                        {availTab === "add" && (
                                            <form className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                                                <h3 className="font-semibold text-slate-900">Add New Slot</h3>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Select Date</label>
                                                    <input
                                                        type="date"

                                                        className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Select Time Slot</label>
                                                    <select
                                                        className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                                    >
                                                        <option value="">Choose a time</option>
                                                        {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                                                    </select>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
                                                >
                                                    Add Slot
                                                </button>
                                            </form>
                                        )}

                                        {availTab === "view" && (
                                            <div className="bg-white border border-slate-200 rounded-2xl p-5">
                                                <h3 className="font-semibold text-slate-900 mb-4">All Active Slots</h3>
                                                <div className="space-y-2">

                                                    <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                                                        <div>
                                                            <p className="text-sm font-medium text-slate-800">Date of the slot · Slot-Timing</p>
                                                            <p className="text-xs text-slate-500 mt-0.5">Patient: Name of the patient</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            {/* Booked badge */}
                                                            {/* "bg-teal-50 text-teal-700 border border-teal-100" */}
                                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100 
                                                                }`}>
                                                                    Booked 
                                                            </span>
                                                                {/*No  Delete button , delete button only for unbooked slots */}

                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                                                        <div>
                                                            <p className="text-sm font-medium text-slate-800">Date of the slot · Slot-Timing</p>
                                                            <p className="text-xs text-slate-500 mt-0.5">Patient: Name of the patient</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            {/* Booked / Open badge */}
                                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-100`}>
                                                                Unbooked 
                                                            </span>

                                                            {/* Delete button (only for unbooked slots) */}

                                                            <button
                                                                // onClick={() => handleDeleteSlot(s.id)}
                                                                className="text-slate-400 hover:text-red-500 transition-colors p-1"
                                                                title="Delete slot"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        )}

                                    </div>

                                </div>
                            </>
                        )}

                    </>


                )}

            </div>


        </>
    )
}
