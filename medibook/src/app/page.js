import Image from "next/image";

export default function Home() {
  return (

    <>
      {/*-------------------------- Hero Section --------------------------------------- */}
      <div className="px-[150px] items-center gap-[100px] bg-[#F3F4F6] flex py-[96px] ">
        <div className="w-3/5" >
          <div className="bg-[#b8c6e5] text-[10px] mb-[24px] inline-block rounded-[7px] font-semibold py-[2px] px-[5px] text-[#2563EB]">
            NOW INTRODUCING INSTANT CONFIRMATION
          </div>
          <div className="font-bold text-[56px] text-wrap mb-[24px]">
            Book Trusted Doctors, Anytime, Anywhere
          </div>
          <div className="text-[#6B7280] text-[18px] text-wrap text-left mb-[24px] " >Skip the waiting room. Connect with certified practitioners, schedule face-to-face appointments, and manage your health seamlessly on the absolute standard healthcare portal.</div>
          <div className="flex justify-start gap-[13px] " >
            <div className=" rounded-[10px] bg-[#2563EB] hover:bg-[#aec0e8] px-5 py-3">Find a Doctor Now </div>
            <div className=" rounded-[10px] hover:bg-[#b9c8e9] shadow-md px-4 py-2 ">How It Works </div>
          </div>
        </div>
        <div className="w-2/5" >

          <Image
            src="/Rectangle.svg"
            alt="Doctor Icon"
            width={520}
            height={400}
            className="rounded-2xl"
          />

        </div>
      </div>
    </>

  );
}
