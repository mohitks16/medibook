"use client";
import React, { useState } from "react";

export default function page() {
    const [tab, setTab] = useState("search");
    const [specFilter, setSpecFilter] = useState("All");
    const [histFilter, setHistFilter] = useState("all");
    const specializations = [
        "All",
        "Cardiologist",
        "Neurologist",
        "Dermatologist",
        "Orthopedist",
        "Pediatrician",
        "Gynecologist",
        "Ophthalmologist",
        "ENT Specialist",
        "Psychiatrist",
        "General Physician",
        "Dentist",
    ];

    return (
        <>
            <div className="px-60">
                <div className="my-3">
                    <p className="text-2xl font-bold">Hello , Patient Name </p>
                    <p>Find and book appointments with top specialists</p>
                </div>

                {/* Tabbings  */}

                <div className="flex gap-1 my-6 bg-white border border-slate-200 rounded-xl p-1 w-fit overflow-x-auto">
                    {[
                        { key: "search", label: "Find Doctors" },
                        { key: "profile", label: "My Profile" },
                        { key: "history", label: "Bookings" },
                    ].map((t) => (
                        <button
                            key={t.key}
                            onClick={() => {
                                setTab(t.key);
                            }}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${tab === t.key
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                                }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {tab === "search" && (
                    <div>
                        {/* Search input */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-6">
                            <div className="relative flex-1">
                                <svg
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    //   value={searchQuery}
                                    //   onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by name or specialization..."
                                    className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                />
                            </div>
                        </div>

                        {/* Specialization filter pills */}
                        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                            {specializations.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSpecFilter(s)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 border transition-colors ${specFilter === s
                                            ? "bg-blue-600 text-white border-blue-600"
                                            : "bg-white text-slate-600 border-slate-200 hover:border-blue-200"
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>

                        {/* Doctor cards grid */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
                            <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer">
                                <div className="flex items-start gap-3 mb-4">
                                    {/* Doctor initials avatar */}
                                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
                                        {/* {doc.name.split(" ").slice(1).map((n) => n[0]).join("")} */}
                                        AM
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-slate-900 text-sm truncate">
                                            Name of the Doctor{" "}
                                        </p>
                                        <p className="text-xs text-blue-600 font-medium">
                                            Specialisation{" "}
                                        </p>
                                        {/* RAting stars */}
                                        <span className="text-amber-500 text-xs font-semibold">
                                            "★"
                                        </span>
                                    </div>
                                </div>
                                {/* Degree badges */}
                                <div className="flex gap-1.5 flex-wrap mb-4">
                                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                                        Cardiologist
                                    </span>
                                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                                        Neurologist
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
                                    <span>Experience in years </span>
                                    <span className="font-semibold text-slate-800">Fee</span>
                                </div>
                                <div className="mt-1 text-xs text-teal-600 font-medium">
                                    number of slots available
                                </div>
                            </div>

                            <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer">
                                <div className="flex items-start gap-3 mb-4">
                                    {/* Doctor initials avatar */}
                                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
                                        {/* {doc.name.split(" ").slice(1).map((n) => n[0]).join("")} */}
                                        AM
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-slate-900 text-sm truncate">
                                            Name of the Doctor{" "}
                                        </p>
                                        <p className="text-xs text-blue-600 font-medium">
                                            Specialisation{" "}
                                        </p>
                                        {/* RAting stars */}
                                        <span className="text-amber-500 text-xs font-semibold">
                                            "★"
                                        </span>
                                    </div>
                                </div>
                                {/* Degree badges */}
                                <div className="flex gap-1.5 flex-wrap mb-4">
                                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                                        Cardiologist
                                    </span>
                                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                                        Neurologist
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
                                    <span>Experience in years </span>
                                    <span className="font-semibold text-slate-800">Fee</span>
                                </div>
                                <div className="mt-1 text-xs text-teal-600 font-medium">
                                    number of slots available
                                </div>
                            </div>

                            <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer">
                                <div className="flex items-start gap-3 mb-4">
                                    {/* Doctor initials avatar */}
                                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
                                        {/* {doc.name.split(" ").slice(1).map((n) => n[0]).join("")} */}
                                        AM
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-slate-900 text-sm truncate">
                                            Name of the Doctor{" "}
                                        </p>
                                        <p className="text-xs text-blue-600 font-medium">
                                            Specialisation{" "}
                                        </p>
                                        {/* RAting stars */}
                                        <span className="text-amber-500 text-xs font-semibold">
                                            "★"
                                        </span>
                                    </div>
                                </div>
                                {/* Degree badges */}
                                <div className="flex gap-1.5 flex-wrap mb-4">
                                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                                        Cardiologist
                                    </span>
                                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                                        Neurologist
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
                                    <span>Experience in years </span>
                                    <span className="font-semibold text-slate-800">Fee</span>
                                </div>
                                <div className="mt-1 text-xs text-teal-600 font-medium">
                                    number of slots available
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {tab === "profile" && (
                    <div className="max-w-2xl">
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
                            <h2 className="font-semibold text-slate-900">Health Profile</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                        Full Name
                                    </label>
                                    <input
                                        // value={profile.name}
                                        // onChange={(e) => setP("name", e.target.value)}
                                        className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                        Age
                                    </label>
                                    <input
                                        type="number"
                                        // value={profile.age}
                                        // onChange={(e) => setP("age", e.target.value)}
                                        className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                        Gender
                                    </label>
                                    <select
                                        // value={profile.gender}
                                        // onChange={(e) => setP("gender", e.target.value)}
                                        className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                    >
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                        Phone Number
                                    </label>
                                    <input
                                        // value={profile.phone}
                                        // onChange={(e) => setP("phone", e.target.value)}
                                        className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Lifestyle
                                </label>
                                <select
                                    //   value={profile.lifestyle}
                                    //   onChange={(e) => setP("lifestyle", e.target.value)}
                                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                >
                                    <option>Sedentary</option>
                                    <option>Lightly Active</option>
                                    <option>Moderately Active</option>
                                    <option>Very Active</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Any Recent Medical Condition
                                </label>
                                <input
                                    //   value={profile.medicalCondition}
                                    //   onChange={(e) => setP("medicalCondition", e.target.value)}
                                    placeholder="e.g. Hypertension, Diabetes..."
                                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Last Doctor Visit
                                </label>
                                <input
                                    type="date"
                                    //   value={profile.lastVisit}
                                    //   onChange={(e) => setP("lastVisit", e.target.value)}
                                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                // onClick={handleSaveProfile}
                                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                            >
                                Save Profile
                            </button>
                        </div>
                    </div>
                )}

                {tab === "history" && (
                    <div>
                        {/* Filter: all / upcoming / past */}
                        <div className="flex gap-2 mb-5">
                            {["all", "upcoming", "past"].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setHistFilter(f)}
                                    className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${histFilter === f
                                            ? "bg-blue-600 text-white"
                                            : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>

                        {/* Booking cards */}
                        <div className="space-y-3">
                            <div
                                className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                            >
                                <div className="flex items-start gap-4">
                                    {/* Doctor initials avatar */}
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
                                        {/* {b.doctor.split(" ") .slice(/1) .map((n) => n[0]) .join("")} */}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 text-sm">
                                            {/* {b.doctor} */}
                                        </p>
                                        <p className="text-xs text-blue-600 font-medium">
                                            {/* {b.spec} */}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {/* 🕐 {b.slot} */}
                                        </p>
                                        <p className="text-xs text-slate-400 mt-0.5">
                                            {/* Ref: {b.ref} */}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-slate-800">
                                            {/* ₹{b.fee} */}
                                        </p>
                                        <p className="text-xs text-slate-400">Paid</p>
                                    </div>
                        
                                    <span
                                        className={`text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100`}
                                    >
                                        Upcoming
                                        {/* {b.status === "" ? "Upcoming" : "Completed"} */}
                                    </span>
                                </div>
                            </div>

                            <div
                                className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                            >
                                <div className="flex items-start gap-4">
                                    {/* Doctor initials avatar */}
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
                                        {/* {b.doctor.split(" ") .slice(/1) .map((n) => n[0]) .join("")} */}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 text-sm">
                                            {/* {b.doctor} */}
                                        </p>
                                        <p className="text-xs text-blue-600 font-medium">
                                            {/* {b.spec} */}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {/* 🕐 {b.slot} */}
                                        </p>
                                        <p className="text-xs text-slate-400 mt-0.5">
                                            {/* Ref: {b.ref} */}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-slate-800">
                                            {/* ₹{b.fee} */}
                                        </p>
                                        <p className="text-xs text-slate-400">Paid</p>
                                    </div>
                        
                                    <span
                                        className={`text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100`}
                                    >
                                        Upcoming
                                        {/* {b.status === "" ? "Upcoming" : "Completed"} */}
                                    </span>
                                </div>
                            </div>

                            <div
                                className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                            >
                                <div className="flex items-start gap-4">
                                    {/* Doctor initials avatar */}
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
                                        {/* {b.doctor.split(" ") .slice(/1) .map((n) => n[0]) .join("")} */}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 text-sm">
                                            {/* {b.doctor} */}
                                        </p>
                                        <p className="text-xs text-blue-600 font-medium">
                                            {/* {b.spec} */}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {/* 🕐 {b.slot} */}
                                        </p>
                                        <p className="text-xs text-slate-400 mt-0.5">
                                            {/* Ref: {b.ref} */}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-slate-800">
                                            {/* ₹{b.fee} */}
                                            fees in inr 
                                        </p>
                                        <p className="text-xs text-slate-400">Paid</p>
                                    </div>
                              
                                    <span
                                        className={`text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200`}
                                    >
                                        Completed
                                        {/* {b.status === "" ? "Upcoming" : "Completed"} */}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
