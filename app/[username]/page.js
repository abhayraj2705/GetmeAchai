import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-white h-[44vh] gap-4 ">
        <div className="font-bold text-5xl flex items-center justify-center  "> <span className="font-bold">Buy me a chai</span> <span><img className="Invertimg " src="/tea.gif" width={88} alt="" /></span></div>
        <p> 
          A corwd funding platform for all the developers who want funds fro there projects

        </p>
        <div>
        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer">Start Here</button>
        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer">Read More</button>
        </div>

      </div>
        <div className="bg-white h-1 opacity-10">
        </div>

        <div className="text-white container mx-auto py-32 pt-14">
          <h1 className="text-3xl font-bold text-center mb-14">Your Fans Can Buy You a Chai</h1>
          <div className="flex justify-around">
          <div className="item space-y-3 flex flex-col justify-center items-center">
              <img className=" bg-slate-400 rounded-full p-7" src="/man.gif" width={88} alt="" />
              <p className="font-bold">Fund Yourself</p>
              <p className="text-center">Your Fans Are Available To Help You</p>
            </div>
            <div className="item space-y-3 flex flex-col justify-center items-center">
              <img className=" bg-slate-400 rounded-full p-7" src="/coin.gif" width={88} alt="" />
              <p className="font-bold">Fund Yourself</p>
              <p className="text-center">Your Fans Are Available To Help You</p>
            </div>
            <div className="item space-y-3 flex flex-col justify-center items-center">
              <img className=" bg-slate-400 rounded-full p-7" src="/group.gif" width={88} alt="" />
              <p className="font-bold ">Fund Yourself</p>
              <p className="text-center">Your Fans Are Available To Help You</p>
            </div>
          </div>
        </div>

        <div className="bg-white h-1 opacity-10">
        </div>

        <div className="text-white container mx-auto py-32 pt-14 ">
          <h1 className="text-3xl font-bold text-center mb-14">Learn More About Us </h1>

          <div className="flex justify-center items-center">

          <iframe  width="560" height="315" src="https://www.youtube.com/embed/7E6um7NGmeE?si=RBpmTCHZeCrG46QN" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"allowFullScreen></iframe>
          </div>
        </div>

      </>
  );
}
