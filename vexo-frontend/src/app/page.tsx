
"use client"
import { useState } from "react";

export default function Home() {
  const [ens, setEns] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    // In a real application, you'd send this to your backend
    // For now, we're simulating saving to ens.txt as requested
    console.log(`Saving ENS to ens.txt: ${ens}`);
    
    // Show popup instead of success message
    setShowPopup(true);
    
    // Hide popup after 5 seconds
    setTimeout(() => {
      setShowPopup(false);
      setEns("");
    }, 5000);
  };

  return (
    <>
      {/* Font imports for Caveat handwritten font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap');
        
        body {
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #e6f0ff 0%, #f0f8ff 50%, #e6f0ff 100%);
          font-family: 'Caveat', cursive;
          color: #1a365d;
          min-height: 100vh;
        }
      `}</style>

      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <main className="max-w-xl w-full">
          {/* Header */}
          <div className="text-center mb-14">
            <h1 className="text-7xl font-bold mb-6 text-blue-800">✨ VEXO.social ✨</h1>
            <p className="text-5xl text-blue-700">Your ENS link, now alive.</p>
          </div>
          
          {/* Book content */}
          <div className="mb-16 text-3xl leading-relaxed text-blue-900">
            <p className="mb-8">
              What if your ENS domain could <span className="text-4xl font-bold">live</span>, hold value, 
              speak for you, and connect you to the world?
            </p>
            
            <p className="mb-8">
              VEXO.social transforms your ENS into a dynamic, composable profile 
              that acts as your decentralized home across web3.
            </p>
            
            <p className="mb-8">
              <span className="text-4xl">🌐</span> Showcase your content & collections<br />
              <span className="text-4xl">💰</span> Accept payments & hold tokens<br />
              <span className="text-4xl">🔗</span> Connect your entire digital presence<br />
              <span className="text-4xl">🧩</span> Customize with modular components
            </p>
            
            <p className="text-5xl text-center font-bold text-blue-800 my-12">
              Coming Soon to Base & Optimism
            </p>
          </div>
          
          {/* Waitlist Form */}
          <div className="text-center">
            <h2 className="text-4xl mb-8 text-blue-800">Join the Waitlist</h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <div className="flex flex-col sm:flex-row w-full mb-4 gap-3">
                <input
                  type="text"
                  value={ens}
                  onChange={(e) => setEns(e.target.value)}
                  placeholder="yourname.eth"
                  className="bg-white/70 border-3 border-blue-400 rounded-lg px-6 py-3 text-2xl text-blue-900 flex-grow focus:outline-none focus:border-blue-600"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold py-3 px-8 rounded-lg transition-colors"
                >
                  Submit
                </button>
              </div>
              <p className="text-2xl text-blue-700">
                Enter your ENS name to get early access
              </p>
            </form>
            
            {/* Fun Popup */}
            {showPopup && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="absolute inset-0 bg-black/50" onClick={() => setShowPopup(false)}></div>
                <div className="relative bg-white p-8 rounded-xl max-w-md w-full mx-4 border-4 border-blue-600 transform rotate-1">
                  <div className="text-4xl font-bold text-blue-800 mb-4">Gotcha! 😜</div>
                  <div className="text-2xl text-blue-900 mb-6">
                    Hey {ens.split('.')[0] || 'friend'}, you're already on the waitlist! 
                    Owning an ENS automatically qualifies you!
                  </div>
                  <div className="text-xl text-blue-700 mb-8">
                    Screenshot this and tweet it to spread the fun!
                  </div>
                  <button 
                    onClick={() => setShowPopup(false)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-2 px-6 rounded-lg transition-colors"
                  >
                    Haha, nice one! 👍
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
        
        {/* Footer */}
        <footer className="mt-20 text-center text-2xl text-blue-700">
          <p>Built by web3 natives, for web3 natives</p>
          <p className="mt-3">© 2025 VEXO.social — All rights reserved</p>
        </footer>
      </div>
    </>
  );
}