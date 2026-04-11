import { useEffect, useState } from "react";



export default function HeroSectionTailwind() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);

    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS80GZxTWl2BuAzNPK2vxFexejuvhESqadCKQ&s",
    "https://www.manasnationalparkonline.in/images/manas-tour-guide.jpg",
    "https://www.northeastbullet.com/wp-content/uploads/2023/11/kar.jpg.webp",
    "https://www.indianholiday.com/wordpress/wp-content/uploads/2025/06/Rang-Ghar.jpg",
    "https://www.sharpholidays.in/blog/wp-content/uploads/2020/07/assam-tourism.jpg",
    "https://www.tigersafariindia.in/wp-content/uploads/2022/08/kaziranga-national-park.jpg",
  ];

  const handleRegister = () => {
    window.location.href = "/register";
  }
  const handleLogin = () => {
    window.location.href = "/login";
  }

  return (
    <>
      <div className="w-full h-screen ">
        <div
          className="relative flex min-h-screen flex-col overflow-hidden bg-[#18ac7f] font-sans text-white"
          style={{
            backgroundImage: `url(${images[bgIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transition: "background-image 1s ease-in",
          }}
        >
          {/* NAV */}
          <nav className="flex flex-wrap items-center justify-between border border-white/40 bg-white/10 px-4 py-3 backdrop-blur-md md:px-10 md:py-[18px] m-3 md:m-4 rounded-2xl">

            <div className="text-sm sm:text-base font-medium text-white/90">
              EcoGuard AI
            </div>

            <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
              <button onClick={handleLogin} className="rounded-md px-3 py-2 text-xs sm:text-sm text-white/90 transition hover:bg-white/10 sm:px-4">
                Sign In
              </button>
              <button onClick={handleRegister} className="rounded-lg bg-white px-3 sm:px-5 py-2 text-xs sm:text-sm font-bold text-[#0b7a60] transition hover:opacity-90">
                Get Started
              </button>
            </div>
          </nav>

          {/* MAIN */}
          <main className="flex flex-1 flex-col items-center justify-center px-4 pb-8 pt-10 text-center sm:px-6 md:pt-[60px]">

            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[0.65rem] sm:text-[0.72rem] font-bold tracking-[0.08em] text-white backdrop-blur-sm">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-white" />
              28% CO2 REDUCTION CERTIFIED
            </div>

            {/* Heading */}
            <h1 className="mb-4 px-2 text-[clamp(2rem,7vw,4.2rem)] font-extrabold leading-[1.1]">
              Smart Eco Routes for
              <br />
              <em className="not-italic md:italic">Assam Tourism</em>
            </h1>

            {/* Paragraph */}
            <p className="mb-7 max-w-[90%] sm:max-w-[500px] text-sm sm:text-base leading-6 sm:leading-7 text-white/85">
              Experience the beauty of the Northeast with AI-powered navigation
              <br className="hidden sm:block" />
              that minimizes your carbon footprint while maximizing your journey.
            </p>

            {/* INPUT BOX */}
            <div className="mb-6 flex w-full max-w-[580px] flex-col gap-2 rounded-xl bg-white/95 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.15)] sm:flex-row sm:items-center">

              {/* FROM */}
              <div className="flex flex-1 items-center gap-2 px-3">
                <span>📍</span>
                <input
                  type="text"
                  placeholder="Guwahati..."
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full bg-transparent py-2 text-sm text-[#333] outline-none placeholder:text-[#aaa]"
                />
              </div>

              {/* ARROW */}
              <span className="hidden sm:block px-1 text-[#aaa]">→</span>

              {/* TO */}
              <div className="flex flex-1 items-center gap-2 px-3">
                <span>📌</span>
                <input
                  type="text"
                  placeholder="Kaziranga..."
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full bg-transparent py-2 text-sm text-[#333] outline-none placeholder:text-[#aaa]"
                />
              </div>

              {/* BUTTON */}
              <button className="w-full sm:w-auto whitespace-nowrap rounded-lg bg-[#1db98a] px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-bold text-white transition hover:bg-[#17a37a]">
                Optimize Route ⚡
              </button>
            </div>

            {/* FEATURES */}
            <div className="flex flex-col items-center gap-2 text-[0.65rem] sm:text-[0.72rem] font-semibold tracking-[0.06em] text-white/75 sm:flex-row sm:gap-6">
              <span className="flex items-center gap-1.5">🔬 IEEE RESEARCH</span>
              <span className="flex items-center gap-1.5">🌿 BIODIVERSITY WATCH</span>
              <span className="flex items-center gap-1.5">📡 REAL-TIME TRACKING</span>
            </div>
          </main>


          <div className="animate-bounce pb-4 text-center text-[1.4rem] text-white/50">⌄</div>
        </div>
        <div>
          <div className=" bg-slate-100 px-5 py-10 flex gap-8 justify-center sm:flex flex-col items-center md:flex-row lg:flex-row">
            <div className="flex w-1/3 l h-full bg-white rounded-2xl flex-col p-5 shadow-xl hover:scale-105 transition duration-300 sm: w-full md:w-1/3 lg:w-1/3">
              <button className="f-2 w-12 m-1 bg-green-100 p-3 rounded-lg text-green-500"><b>CO</b><sub>2</sub></button>
              <b className="p-1 text-slate-500">CARBON SAVED</b>
              <b className="text-3xl">1,240 Tons</b>
              <b className="p-1 text-emerald-600">
                +12.4% this month
              </b>
            </div>
            <div className="flex w-1/3 h-full bg-white rounded-2xl flex-col p-5 shadow-xl hover:scale-105 transition duration-300 sm: w-full md:w-1/3 lg:w-1/3">
              <button className="f-2 w-12 m-1 bg-green-100 p-3 rounded-lg text-green-500"><b>CO</b><sub>2</sub></button>
              <b className="p-1 text-slate-500">ECO-ROUTES ANALYZED</b>
              <b className="text-3xl">458,200+</b>
              <b className="p-1 text-emerald-600">
                Verified by AI
              </b>
            </div>
            <div className="flex w-1/3 h-full bg-white rounded-2xl flex-col p-5 shadow-xl hover:scale-105 transition duration-300 sm: w-full md:w-1/3 lg:w-1/3">
              <button className="f-2 w-12 m-1 bg-green-100 p-3 rounded-lg text-green-500"><b>CO</b><sub>2</sub></button>
              <b className="p-1 text-slate-500">ECO-TRAVELERS</b>
              <b className="text-3xl">15.8k Active</b>
              <b className="p-1 text-emerald-600">
                +18% adoption rate
              </b>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col px-4 py-10 items-center justify-center bg-slate-200">

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold font-serif p-3 text-center">
            Intelligent Conservation
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-center max-w-[90%] sm:max-w-[700px]">
            How our AI engines work in harmony to protect Assam's natural heritage.
          </p>

          {/* Cards Container */}
          <div className="w-full flex flex-col sm:flex-row flex-wrap gap-5 py-8 justify-center items-center">

            {/* Card 1 */}
            <div className="w-full sm:w-[45%] lg:w-[24%] rounded-3xl p-6 bg-zinc-600 hover:scale-105 transition duration-300">
              <p className="bg-green-300 p-3 rounded-3xl w-12 my-3">
                <i className="fa-solid fa-route"></i>
              </p>
              <p className="text-white text-xl sm:text-2xl py-2 font-bold">
                GNN Routing
              </p>
              <p className="text-white text-sm sm:text-base py-2">
                Graph Neural Networks analyze millions of nodes to find the path of least resistance and environmental impact.
              </p>
            </div>

            {/* Card 2 */}
            <div className="w-full sm:w-[45%] lg:w-[24%] rounded-3xl p-6 bg-zinc-600 hover:scale-105 transition duration-300">
              <p className="bg-green-300 p-3 rounded-3xl w-12 my-3">
                <i className="fa-solid fa-chart-line"></i>
              </p>
              <p className="text-white text-xl sm:text-2xl py-2 font-bold">
                LSTM Crowds
              </p>
              <p className="text-white text-sm sm:text-base py-2">
                Long Short-Term Memory models predict human congestion patterns to prevent over-tourism in fragile ecosystems.
              </p>
            </div>

            {/* Card 3 */}
            <div className="w-full sm:w-[45%] lg:w-[24%] rounded-3xl p-6 bg-zinc-600 hover:scale-105 transition duration-300">
              <p className="bg-green-300 p-3 rounded-3xl w-12 my-3">
                <i className="fa-solid fa-money-bill"></i>
              </p>
              <p className="text-white text-xl sm:text-2xl py-2 font-bold">
                RL Pricing
              </p>
              <p className="text-white text-sm sm:text-base py-2">
                Reinforcement Learning dynamically adjusts permits and pricing to incentivize travel during low-impact hours.
              </p>
            </div>

          </div>
        </div>
        <div className="w-full p-5 flex flex-col">

          {/* Heading */}
          <div className="mt-6 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold font-serif py-4">
              Signature Safaris
            </h1>
            <p className="text-slate-500 font-bold text-sm sm:text-base">
              Curated destinations optimized for deep connection and minimal footprint.
            </p>
          </div>

          {/* Cards */}
          <div className="w-full flex flex-col sm:flex-row flex-wrap gap-6 py-10 justify-center items-center">

            {/* CARD */}
            <div className="w-full sm:w-[45%] lg:w-[23%] h-80 sm:h-96 p-4 hover:scale-105 transition duration-300 rounded-3xl bg-[url('https://wildnortheasttravels.com/wp-content/uploads/2025/07/One_Horned_Rhino_With_Jungle_Myna-scaled.jpg')] bg-cover bg-center relative overflow-hidden">

              <div className="absolute bottom-16 left-4">
                <p className="text-sm text-green-300 font-bold">HERITAGE SITE</p>
                <h1 className="text-xl sm:text-2xl font-bold text-white">KAZIRANGA</h1>
              </div>

              <div className="absolute bottom-4 left-4 backdrop-blur-md bg-white/10 rounded-xl px-3 py-1">
                <p className="text-sm text-white">98% Eco-Score</p>
              </div>
            </div>

            {/* CARD */}
            <div className="w-full sm:w-[45%] lg:w-[23%] h-80 sm:h-96 p-4 hover:scale-105 transition duration-300 rounded-3xl bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVV7XmftTy9rFJueqdGnQVk-mepu-95VtbKA&s')] bg-cover bg-center relative overflow-hidden">

              <div className="absolute bottom-16 left-4">
                <p className="text-sm text-green-300 font-bold">RIVER ISLAND</p>
                <h1 className="text-xl sm:text-2xl font-bold text-white">MAJULI</h1>
              </div>

              <div className="absolute bottom-4 left-4 backdrop-blur-md bg-white/10 rounded-xl px-3 py-1">
                <p className="text-sm text-white">92% Eco-Score</p>
              </div>
            </div>

            {/* CARD */}
            <div className="w-full sm:w-[45%] lg:w-[23%] h-80 sm:h-96 p-4 hover:scale-105 transition duration-300 rounded-3xl bg-[url('https://media.assettype.com/english-sentinelassam%2Fimport%2Fh-upload%2F2020%2F10%2F30%2F169572-01db12ed-5d36-4c2e-9da1-c8d5f7c35041.webp?w=1200&ar=40%3A21&auto=format%2Ccompress&ogImage=true&mode=crop&enlarge=true&overlay=false&overlay_position=bottom&overlay_width=100')] bg-cover bg-center relative overflow-hidden">

              <div className="absolute bottom-16 left-4">
                <p className="text-sm text-green-300 font-bold">TIGER RESERVE</p>
                <h1 className="text-xl sm:text-2xl font-bold text-white">MANAS</h1>
              </div>

              <div className="absolute bottom-4 left-4 backdrop-blur-md bg-white/10 rounded-xl px-3 py-1">
                <p className="text-sm text-white">95% Eco-Score</p>
              </div>
            </div>

            {/* CARD */}
            <div className="w-full sm:w-[45%] lg:w-[23%] h-80 sm:h-96 hover:scale-105 transition duration-300 p-4 rounded-3xl bg-[url('https://s7ap1.scene7.com/is/image/incredibleindia/shiva-dol-sivasagar-assam-1-attr-nearby?qlt=82&ts=1751459541794')] bg-cover bg-center relative overflow-hidden">

              <div className="absolute bottom-16 left-4">
                <p className="text-sm text-green-300 font-bold">HERITAGE SITE</p>
                <h1 className="text-xl sm:text-2xl font-bold text-white">SIVASAGAR</h1>
              </div>

              <div className="absolute bottom-4 left-4 backdrop-blur-md bg-white/10 rounded-xl px-3 py-1">
                <p className="text-sm text-white">90% Eco-Score</p>
              </div>
            </div>

          </div>
        </div>
        <div className="relative top-16 w-full h-screen p-24 bg-[#EBF3EB]">
          <div className="bg-[#84B69B] h-full w-full flex flex-col items-center justify-center py-10 rounded-3xl">
            <h1 className="text-7xl font-serif text-white font-bold">Ready To Explore</h1>
            <h1 className="text-7xl font-serif text-white font-bold">Responsibly?</h1>
            <p className="text-slate-300 text-2xl mt-4">Join us in preserving the beauty of our planet for future generations.</p>
            <button onClick={handleRegister} className="bg-white w-[20%] h-16 rounded-3xl font-bold text-lg relative top-5 shadow-xl">Get Started Free</button>
          </div>
        </div>
        {/*FOOTER */}
        <div className=" w-full py-36 px-6 flex gap-10">
          <div className="w-[25%] h-full">
            <h1 className="font-bold text-4xl m-4">Eco Gaurd AI</h1>
            <p className="m-4 text-slate-600">Preserving the majesty of Assam through intelligent navigation and community-first conservation</p>
          </div>
          <div className="w-[25%] h-full">
            <h1 className="font-bold text-2xl m-4">Platform</h1>
            <div className="m-4 flex flex-col gap-2 text-slate-600">
              <p>Dynamic Routes</p>
              <p>Carbon Calculator</p>
              <p>Wildlife Corridors</p>
              <p>Permit Management</p>
            </div>
          </div>
          <div className="w-[25%] h-full">
            <h1 className="font-bold text-2xl m-4">Science</h1>
            <div className="m-4 flex flex-col gap-2 text-slate-600">
              <p>GNN Research</p>
              <p>Impact Reports</p>
              <p>Open Data API</p>
              <p>IEEE Publication</p>
            </div>
          </div>
          <div className="w-[25%] h-full">
            <h1 className="font-bold text-2xl m-4">Company</h1>
            <div className="m-4 flex flex-col gap-2 text-slate-600">
              <p>Our Mission</p>
              <p>Partnerships</p>
              <p>Privacy Policy</p>
              <p>Terms of Service</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center text-slate-500 w-full h-10 border-t-2 ">
          <p>@ 2026 EcoGaurd AI Research Group All Rights reserved </p>
        </div>
      </div>
    </>
  );
}