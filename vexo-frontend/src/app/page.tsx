"use client"
import { useState, useEffect } from "react";
import { useENSLookup } from '@/lib/queryEns';
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [ens, setEns] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [activeTab, setActiveTab] = useState("explore");
  
  // Use the ENSLookup hook
  const { result, loading } = useENSLookup(ens);
  
  // Sample featured ENS profiles
  const featuredProfiles = [
    { name: "jesse.base.eth", avatar: "👨‍💻", bio: "Founder of Base", followers: "524K", tags: ["Base", "Coinbase"] },
    { name: "vitalik.eth", avatar: "🧠", bio: "Ethereum co-founder", followers: "2.4M", tags: ["Ethereum", "Research"] },
    { name: "vexosocial.base.eth", avatar: "✨", bio: "Your ENS link, now alive", followers: "42K", tags: ["ENS", "Social"] },
    { name: "dami.base.eth", avatar: "🌍", bio: "Pushing Base in Africa", followers: "128K", tags: ["Base", "Africa"] },
    { name: "punk4156.eth", avatar: "🎭", bio: "NFT collector & builder", followers: "456K", tags: ["NFTs", "Art"] },
  ];
  
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(`Saving ENS to ens.txt: ${ens}`);
    setShowPopup(true);
    
    setTimeout(() => {
      setShowPopup(false);
      setEns("");
    }, 5000);
  };
  
  // Connect wallet functionality
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        setIsWalletConnected(true);
        console.log("Wallet connected:", accounts[0]);
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      alert("Please install MetaMask or another Ethereum wallet");
    }
  };
  
  // Disconnect wallet functionality
  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletAddress("");
  };

  return (
    <>
      {/* Font imports */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #e6f0ff 0%, #f0f8ff 50%, #e6f0ff 100%);
          font-family: 'Inter', sans-serif;
          color: #1a365d;
          min-height: 100vh;
        }
        
        h1, h2, h3, .handwritten {
          font-family: 'Caveat', cursive;
        }
        
        .card {
          transition: all 0.3s ease;
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .glassmorphism {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
        }
      `}</style>

      <div className="min-h-screen">
        {/* Navbar */}
        <motion.nav 
          className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-blue-100 shadow-sm"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <motion.div 
                  className="text-4xl font-bold text-blue-800 flex items-center"
                  whileHover={{ scale: 1.05 }}
                >
                  ✨ <span className="ml-2">VEXO.social</span>
                </motion.div>
              </div>
              
              <div className="flex items-center space-x-4">
                <motion.button
                  className={`px-4 py-2 text-lg font-medium rounded-lg transition-colors ${activeTab === "explore" ? "bg-blue-100 text-blue-800" : "text-blue-600 hover:bg-blue-50"}`}
                  onClick={() => setActiveTab("explore")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore
                </motion.button>
                
                <motion.button
                  className={`px-4 py-2 text-lg font-medium rounded-lg transition-colors ${activeTab === "search" ? "bg-blue-100 text-blue-800" : "text-blue-600 hover:bg-blue-50"}`}
                  onClick={() => setActiveTab("search")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Search
                </motion.button>
                
                <motion.button
                  className={`px-4 py-2 text-lg font-medium rounded-lg transition-colors ${activeTab === "about" ? "bg-blue-100 text-blue-800" : "text-blue-600 hover:bg-blue-50"}`}
                  onClick={() => setActiveTab("about")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  About
                </motion.button>
                
                {!isWalletConnected ? (
                  <motion.button
                    className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-2 px-6 rounded-lg transition-colors flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab("search")}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Enter App
                  </motion.button>
                ) : (
                  <div className="flex items-center">
                    <div className="bg-blue-100 border border-blue-300 rounded-lg px-3 py-2 text-blue-800 text-sm font-medium">
                      {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
                    </div>
                    <motion.button
                      onClick={disconnectWallet}
                      className="ml-2 bg-red-100 hover:bg-red-200 text-red-600 text-sm font-medium p-2 rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.nav>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence mode="wait">
            {activeTab === "explore" && (
              <motion.div
                key="explore"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 gap-8"
              >
                {/* Hero Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <h1 className="text-6xl sm:text-7xl font-bold mb-6 text-blue-800 leading-tight">
                      Your ENS link, <br/>now <span className="text-indigo-600">alive.</span>
                    </h1>
                    <p className="text-xl text-blue-700 mb-8">
                      VEXO.social transforms your ENS into a dynamic, composable profile 
                      that acts as your decentralized home across web3.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <motion.button
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-medium py-3 px-8 rounded-lg transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveTab("search")}
                      >
                        Find Your ENS
                      </motion.button>
                      <motion.button
                        className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-xl font-medium py-3 px-8 rounded-lg transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Learn More
                      </motion.button>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="hidden md:block"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <div className="relative">
                      <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                      <div className="absolute top-20 right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                      
                      <div className="relative glassmorphism rounded-2xl p-8 shadow-xl">
                        <div className="flex items-center mb-6">
                          <div className="w-16 h-16 bg-blue-600 text-white text-3xl flex items-center justify-center rounded-full mr-4">
                            🦄
                          </div>
                          <div>
                            <h3 className="text-3xl font-bold text-blue-800">unicorn.eth</h3>
                            <p className="text-blue-600">Web3 Explorer & Builder</p>
                          </div>
                        </div>
                        <div className="mb-6">
                          <p className="text-blue-900 mb-4">
                            Building the decentralized future. NFT collector. DeFi enthusiast.
                          </p>
                          <div className="flex gap-2 flex-wrap">
                            <span className="bg-blue-100 px-3 py-1 rounded-full text-blue-800 text-sm">Ethereum</span>
                            <span className="bg-indigo-100 px-3 py-1 rounded-full text-indigo-800 text-sm">NFTs</span>
                            <span className="bg-purple-100 px-3 py-1 rounded-full text-purple-800 text-sm">Base</span>
                          </div>
                        </div>
                        <div className="border-t border-blue-100 pt-4 flex justify-between">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-800">248</div>
                            <div className="text-blue-600 text-sm">Following</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-800">12.4K</div>
                            <div className="text-blue-600 text-sm">Followers</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-800">56</div>
                            <div className="text-blue-600 text-sm">Posts</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Features Section */}
                <div className="mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-blue-800">Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      { icon: "🌐", title: "Showcase", description: "Display your content & NFT collections in one beautiful space" },
                      { icon: "💰", title: "Monetize", description: "Accept payments & hold tokens directly in your profile" },
                      { icon: "🔗", title: "Connect", description: "Link your entire digital presence across web2 and web3" },
                      { icon: "🧩", title: "Customize", description: "Build your profile with modular, composable components" }
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        className="bg-white rounded-xl p-6 card shadow-md border border-blue-100"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.5 }}
                        whileHover={{ scale: 1.03 }}
                      >
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <h3 className="text-2xl font-bold mb-2 text-blue-800">{feature.title}</h3>
                        <p className="text-blue-700">{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Featured Profiles */}
                <div className="mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-blue-800">Featured Profiles</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProfiles.map((profile, index) => (
                      <motion.div
                        key={index}
                        className="bg-white rounded-xl overflow-hidden shadow-md card border border-blue-100"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.5 }}
                        whileHover={{ scale: 1.03 }}
                      >
                        <div className="h-24 bg-gradient-to-r from-blue-400 to-indigo-600"></div>
                        <div className="px-6 pt-0 pb-6 relative">
                          <div className="absolute -top-8 left-6 w-16 h-16 bg-white text-3xl flex items-center justify-center rounded-full border-4 border-white shadow-md">
                            {profile.avatar}
                          </div>
                          <div className="mt-10">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="text-xl font-bold text-blue-800">{profile.name}</h3>
                              <motion.button
                                className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium py-1 px-3 rounded-full transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Follow
                              </motion.button>
                            </div>
                            <p className="text-blue-700 mb-3">{profile.bio}</p>
                            <div className="flex gap-2 mb-4">
                              {profile.tags.map((tag, i) => (
                                <span key={i} className="bg-blue-50 px-2 py-1 rounded-full text-blue-700 text-xs">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            <div className="text-sm text-blue-600">
                              <span className="font-medium">{profile.followers}</span> followers
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Coming Soon */}
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-10 text-center text-white mb-16"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">Coming Soon to Base & Optimism</h2>
                  <p className="text-xl mb-8 max-w-2xl mx-auto">
                    Join the waitlist today to be the first to experience the future of decentralized social profiles.
                  </p>
                  <motion.button
                    className="bg-white text-blue-600 text-xl font-medium py-3 px-8 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab("search")}
                  >
                    Join Waitlist
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
            
            {activeTab === "search" && (
              <motion.div
                key="search"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
              >
                {/* Search Header */}
                <div className="text-center mb-12">
                  <motion.h2 
                    className="text-5xl font-bold mb-4 text-blue-800"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    Find Your ENS
                  </motion.h2>
                  <motion.p 
                    className="text-xl text-blue-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    Check availability and join the VEXO.social waitlist
                  </motion.p>
                </div>
                
                {/* ENS Checker */}
                <motion.div
                  className="bg-white rounded-2xl p-8 shadow-xl border border-blue-100 mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="mb-8">
                    <label htmlFor="ens-input" className="block text-xl font-medium text-blue-800 mb-2">
                      Enter an ENS name
                    </label>
                    <div className="relative">
                      <input
                        id="ens-input"
                        type="text"
                        className="bg-blue-50 border-2 border-blue-200 rounded-lg px-6 py-4 text-xl text-blue-900 w-full focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="yourname"
                        value={ens}
                        onChange={(e) => setEns(e.target.value.toLowerCase())}
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400 text-xl">
                        .eth
                      </span>
                    </div>
                  </div>
                  
                  {loading && (
                    <div className="flex justify-center items-center py-8">
                      <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="ml-3 text-xl text-blue-700">Checking availability...</span>
                    </div>
                  )}
                  
                  {result && (
                    <motion.div
                      className="mt-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="bg-blue-50 rounded-xl p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                          <p className="text-xl"><strong>{ens}.eth:</strong></p>
                          <div className={`flex items-center ${result.isEthTaken ? "text-red-500" : "text-green-500"}`}>
                            {result.isEthTaken ? (
                              <>
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-xl font-medium">Taken</span>
                              </>
                            ) : (
                              <>
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-xl font-medium">Available</span>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-4">
                          <p className="text-xl"><strong>{ens}.base.eth:</strong></p>
                          <div className={`flex items-center ${result.isBaseEthTaken ? "text-red-500" : "text-green-500"}`}>
                            {result.isBaseEthTaken ? (
                              <>
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-xl font-medium">Taken</span>
                              </>
                            ) : (
                              <>
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-xl font-medium">Available</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {result.matchingTakenNames && result.matchingTakenNames.length > 0 && (
                        <div className="bg-blue-50 rounded-xl p-6 mb-6">
                          <p className="font-bold text-xl text-blue-800 mb-3">Similar taken names:</p>
                          <div className="flex flex-wrap gap-2">
                            {result.matchingTakenNames.map((name) => (
                              <span key={name} className="bg-blue-100 px-3 py-2 rounded-lg text-blue-800">
                                {name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {!result.isEthTaken && !result.isBaseEthTaken && (
                        <motion.div
                          className="text-center mt-8"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          <motion.div
                            className="bg-green-50 p-6 rounded-xl mb-6"
                            animate={{ 
                              scale: [1, 1.02, 1],
                            }}
                            transition={{ 
                              repeat: 2,
                              duration: 1
                            }}
                          >
                            <p className="text-green-600 font-bold text-3xl mb-2">Great choice! 🎉</p>
                            <p className="text-green-700">This name is available on both networks.</p>
                          </motion.div>
                          
                          <motion.button
                            onClick={handleSubmit}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-2xl font-medium py-4 px-10 rounded-xl transition-colors w-full sm:w-auto"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Join Waitlist
                          </motion.button>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
                
                {/* Alternative suggestion cards */}
                {result && result.isEthTaken && (
                  <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold text-blue-800 mb-4">Try these alternatives:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        `${ens}base.eth`,
                        `${ens}dao.eth`,
                        `${ens}web3.eth`,
                        `get${ens}.eth`
                      ].map((suggestion, index) => (
                        <motion.div
                          key={index}
                          className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm flex justify-between items-center"
                          whileHover={{ scale: 1.02, backgroundColor: 'rgba(239, 246, 255, 0.5)' }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setEns(suggestion.replace('.eth', ''))}
                        >
                          <span className="text-lg text-blue-800">{suggestion}</span>
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {/* ENS Information Card */}
                <motion.div
                  className="bg-white rounded-2xl p-8 shadow-xl border border-blue-100"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-blue-800 mb-4">What is ENS?</h3>
                  <p className="text-blue-700 mb-4">
                    Ethereum Name Service (ENS) transforms complex cryptocurrency addresses into simple, 
                    human-readable names that work across the web3 ecosystem.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <h4 className="font-bold text-blue-800 mb-2">With ENS you can:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Replace long crypto addresses with a simple name</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Create a web3 username for your digital identity</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Store profile information and login across dApps</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-xl">
                      <h4 className="font-bold text-indigo-800 mb-2">With VEXO.social you get:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-indigo-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>A dynamic social profile for your ENS</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-indigo-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Modular components to customize your presence</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-indigo-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Payment capabilities and token support</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
            
            {activeTab === "about" && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-blue-100 mb-12">
                  <div className="mb-8 text-center">
                    <h2 className="text-5xl font-bold mb-6 text-blue-800">About VEXO.social</h2>
                    <div className="text-xl text-blue-700 italic mb-6">
                      <p>"What if your ENS link could <span className="font-bold">live</span>, hold value, speak for you, and connect you to the world?"</p>
                      <p className="mt-2">— <em>Oliseh Genesis</em></p>
                    </div>
                  </div>
                  
                  <div className="prose prose-lg max-w-none text-blue-900">
                    <p className="text-xl">
                      VEXO.social is your onchain home — a decentralized profile built on top of your ENS domain. It's more than just a link: it's a living, ownable smart container that holds your identity, your links, your tokens, and your social presence across the web3 world.
                    </p>
                    
                    <h3 className="text-2xl font-bold text-blue-800 mt-8 mb-4">🚀 Overview</h3>
                    <p>
                      VEXO.social transforms your ENS (e.g. <code>oliseh.base.eth</code>) into a dynamic, composable profile:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>vexo.social/yourname.eth</strong> becomes your shareable social hub</li>
                      <li>Minted from a wallet, <strong>transferable</strong>, <strong>multi-access</strong>, and <strong>ENS-aware</strong></li>
                      <li>Supports individuals, DAOs, teams, creators, and degens alike</li>
                      <li>Profiles are smart: they can hold tokens, receive payments, and run logic</li>
                      <li>Extensible: built to scale, plug in new features, edit modules, grow communities</li>
                    </ul>
                  </div>
                </div>
                
                {/* Roadmap */}
                <motion.div
                  className="bg-white rounded-2xl p-8 shadow-xl border border-blue-100 mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h2 className="text-3xl font-bold mb-8 text-blue-800 text-center">Roadmap</h2>
                  
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform md:translate-x-0 translate-x-4"></div>
                    
                    {/* Timeline items */}
                    <div className="space-y-12">
                      {[
                        {
                          date: "Q2 2025",
                          title: "Alpha Launch",
                          content: "Initial release with core profile features and ENS integration",
                          icon: "🚀",
                          side: "right"
                        },
                        {
                          date: "Q3 2025",
                          title: "Social Features",
                          content: "Messaging integration, follow system, and social interactions",
                          icon: "💬",
                          side: "left"
                        },
                        {
                          date: "Q4 2025",
                          title: "Token & Treasury Support",
                          content: "Full wallet capabilities with token holding and payments",
                          icon: "💰",
                          side: "right"
                        },
                        {
                          date: "Q1 2026",
                          title: "Developer Platform",
                          content: "Open API and plugin system for third-party developers",
                          icon: "👨‍💻",
                          side: "left"
                        }
                      ].map((item, index) => (
                        <div key={index} className={`relative flex items-center ${item.side === "left" ? "md:flex-row-reverse" : ""}`}>
                          <div className="hidden md:block w-1/2"></div>
                          
                          {/* Timeline node */}
                          <div className="absolute left-0 md:left-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white transform md:translate-x-0 translate-x-0 -translate-x-4 md:-translate-x-4 shadow-lg z-10">
                            {item.icon}
                          </div>
                          
                          {/* Content */}
                          <motion.div 
                            className={`bg-blue-50 rounded-xl p-6 ml-6 md:ml-0 ${item.side === "left" ? "md:mr-6" : "md:ml-6"} shadow-md w-full md:w-1/2`}
                            whileHover={{ scale: 1.03 }}
                          >
                            <div className="font-bold text-blue-600 mb-1">{item.date}</div>
                            <h3 className="text-2xl font-bold text-blue-800 mb-2">{item.title}</h3>
                            <p className="text-blue-700">{item.content}</p>
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        
        {/* Footer */}
        <footer className="bg-white/70 backdrop-blur-md border-t border-blue-100 py-10 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <div className="text-3xl font-bold text-blue-800 mb-2">VEXO.social</div>
                <p className="text-blue-600">Your ENS link, now alive.</p>
              </div>
              
              <div className="flex gap-6 text-blue-600">
                <a href="#" className="hover:text-blue-800 transition-colors">Twitter</a>
                <a href="#" className="hover:text-blue-800 transition-colors">Discord</a>
                <a href="#" className="hover:text-blue-800 transition-colors">GitHub</a>
                <a href="#" className="hover:text-blue-800 transition-colors">Mirror</a>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-blue-100 flex flex-col md:flex-row justify-between items-center">
              <p className="text-blue-600 mb-4 md:mb-0">Built by web3 natives, for web3 natives</p>
              <p className="text-blue-600">© 2025 VEXO.social — All rights reserved</p>
            </div>
          </div>
        </footer>
        
        {/* Fun Popup */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <motion.div 
              className="absolute inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setShowPopup(false)}
            ></motion.div>
            <motion.div
              className="relative bg-white p-8 rounded-xl max-w-md w-full mx-4 border-4 border-blue-600 transform rotate-1"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <div className="text-4xl font-bold text-blue-800 mb-4">Gotcha! 😜</div>
              <div className="text-2xl text-blue-900 mb-6">
                Hey {ens.split('.')[0] || 'friend'}, you're already on the waitlist! 
                Owning an ENS automatically qualifies you!
              </div>
              <div className="text-xl text-blue-700 mb-8">
                Screenshot this and tweet it to spread the fun!
              </div>
              <motion.button 
                onClick={() => setShowPopup(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-2 px-6 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Haha, nice one! 👍
              </motion.button>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
}

// Add this TypeScript declaration for window.ethereum
declare global {
  interface Window {
    ethereum: any;
  }
}