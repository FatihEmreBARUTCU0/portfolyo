"use client";

export default function Waitlist() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#17100d]" />
      <div className="absolute -left-24 top-0 h-[30rem] w-[30rem] rounded-full bg-amber-500/30 blur-[110px]" />
      <div className="absolute right-[-6rem] top-[-4rem] h-[26rem] w-[26rem] rounded-full bg-orange-500/25 blur-[100px]" />
      <div className="absolute bottom-[-8rem] left-1/3 h-[20rem] w-[20rem] rounded-full bg-stone-200/10 blur-[90px]" />
    </div>
  );
}
