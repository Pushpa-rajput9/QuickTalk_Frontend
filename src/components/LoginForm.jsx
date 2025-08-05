// LoginForm.jsx
import { useState, useEffect } from "react";
import LoginBanner from "../assets/YouTube Banner - Quick Talk - Real-Time Chat.gif";
import chaticon from "../assets/chat.svg";
import logo from "../assets/quick-high-resolution-logo-transparent.png";
import { NavLink, useNavigate } from "react-router-dom";
function LoginForm() {
  const [input, setInput] = useState({ identifier: "", password: "" });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const logout = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/v1/otp/logout`, {
      method: "POST",
      credentials: "include", // ✅ delete cookie
    });
    alert("Logged out");
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/otp/login`,
        {
          method: "POST",
          credentials: "include", // ✅ include cookie
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        }
      );
      const data = await res.json();

      // document.cookie = `token=${data.token}; maxAge: 24 * 60 * 60 * 1000`;
      // console.log("Token cookie after login:", document.cookie);
      if (res.ok) {
        setMessage(data.message);
        localStorage.setItem("token", data.token);
        navigate("/chat/home");
        console.log(navigate);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <main className=" flex flex-wrap w-screen   ">
      <div className="w-1/2 h-screen max-[820px]:h-fit max-[820px]:w-full bg-gradient-to-br from-[#cededc] via-[#fdfef5]  to-[#f8fadc] ">
        <img
          className="w-40 h-16 max-[820px]:h-14 relative top-3 ml-2"
          src={logo}
          alt=""
        />
        <img
          className=" w-full mt-5 max-[820px]:h-[350px] max-sm:h-[250px]"
          loading="eager"
          src={LoginBanner}
          alt="LoginBanner"
        />
      </div>
      <div className="w-1/2 max-[820px]:w-full flex flex-col items-center justify-center  bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364]">
        {" "}
        <div className=" w-96 max-[820px]:w-[450px] max-[520px]:w-11/12 h-[480px] max-sm:p-4 p-10 pt-4 items-center mt-10 flex animate-slideIn flex-col  gap-2 bg-white rounded-lg shadow-lg shadow-black ">
          <img className=" w-28 h-12" src={chaticon} alt="chaticon" />
          <div className=" text-black font-bold text-2xl max-[317px]:text-lg">
            Welcome back!
          </div>
          <div className=" text-gray-500 text-[11px]">
            Enter your credentials to access your account
          </div>
          <form
            className="flex flex-col gap-3 w-full items-center"
            onSubmit={handleSubmit}
          >
            <div className=" w-full">
              <label htmlFor="">Email</label>
              <br />
              <input
                className="border-2 w-full border-gray-300 focus:outline-none rounded p-2 h-10"
                placeholder="Enter your email"
                name="identifier"
                onChange={handleChange}
                value={input.identifier}
              />
            </div>
            <div className=" w-full">
              <label htmlFor="">Password</label>
              <br />
              <input
                name="password"
                placeholder="Enter your password"
                className="border-2 w-full  border-gray-300 focus:outline-none rounded p-2 h-10"
                onChange={handleChange}
                value={input.password}
                type="password"
              />
            </div>
            <button
              className="w-full rounded-md mt-3 text-white h-10  bg-black"
              type="submit"
            >
              SIGN IN
            </button>

            <div className="flex  items-center gap-2 text-gray-400 text-[12px]">
              <hr className=" w-20 h-[2px] bg-slate-500" />
              <p>Create a new account</p>{" "}
              <hr className=" w-20 h-[2px] bg-slate-500" />{" "}
            </div>
          </form>
          <p className=" text-red-700">{message}</p>
          <div className=" mt-5">
            Don't have an account?{" "}
            <span>
              <NavLink className=" text-blue-500" to="Register">
                Sign up
              </NavLink>
            </span>
          </div>
        </div>
        {/* <button onClick={logout}>Logout</button> */}
      </div>
    </main>
  );
}

export default LoginForm;
