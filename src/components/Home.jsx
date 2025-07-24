import React from "react";

function Home() {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] px-4">
        <div className="w-full max-w-md bg-white/30 backdrop-blur-lg shadow-2xl rounded-xl p-8 border border-white/20">
          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto mb-3">
              <img src="/chat-icon.png" alt="chat" />
            </div>
            <h2 className="text-2xl font-bold text-white">Welcome back!</h2>
            <p className="text-white text-sm">Login to your account</p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="text-white text-sm block mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="text-white text-sm block mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
            >
              SIGN IN
            </button>

            <div className="text-center mt-3">
              <p className="text-white text-sm">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="text-blue-300 underline hover:text-white"
                >
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
