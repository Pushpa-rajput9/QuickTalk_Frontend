import React, { useState } from "react";
import chaticon from "../assets/chat.svg";
import LoginBanner from "../assets/YouTube Banner - Quick Talk - Real-Time Chat.gif";
import logo from "../assets/quick-high-resolution-logo-transparent.png";
import { NavLink, useNavigate } from "react-router-dom";
function Register() {
  const [inputNo, setInput] = useState({
    identifier: "",
    otp: "",
    password: "",
  });
  const navigate = useNavigate();
  const [message, setMeassage] = useState("");
  const handlechange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://quicktalk-backend-kni5.onrender.com/api/v1/otp/register",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identifier: inputNo.identifier,
            password: inputNo.password,
          }),
        }
      );
      const result = await response.json();
      if (response.ok) {
        setMeassage(result.message);
        navigate("/chat/home");
      } else {
        setMeassage(result.message);
      }
    } catch (error) {
      setMeassage(error.message);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://quicktalk-backend-kni5.onrender.com/api/v1/otp/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            identifier: `+91${inputNo.phone}`,
            otp: inputNo.otp,
          }),
        }
      );

      const data = await res.json();
      alert(data.message);
      if (res.ok) {
        setMeassage(data.message);
      } else {
        setMeassage(data.message);
      }
    } catch (error) {
      setMeassage(error.message);
    }
  };
  return (
    <>
      <div className=" flex flex-wrap w-full  ">
        <div className="w-1/2 h-screen  max-[820px]:h-fit  max-[820px]:w-full bg-gradient-to-br from-[#cededc] via-[#fdfef5]  to-[#f8fadc] ">
          <img
            className="w-40 h-16  max-[820px]:h-14 relative top-3 ml-2 "
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
        <div className="w-1/2 max-[820px]:w-full flex flex-col items-center justify-center bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364]">
          <div className=" w-96 max-[820px]:w-[450px] max-[520px]:w-11/12 h-[480px] max-sm:p-4 p-10 pt-4 items-center mt-10 flex animate-slideIn flex-col  gap-2 bg-white rounded-lg shadow-lg shadow-black ">
            <img className=" w-28 h-12" src={chaticon} alt="chaticon" />
            <div className=" text-black font-bold text-2xl max-[317px]:text-lg">
              Welcome to QuikTalk!
            </div>
            <div className=" text-gray-500 text-[11px]">
              Enter your credentials to create your account
            </div>
            <form
              className="flex flex-col gap-3 w-full items-center "
              onSubmit={handleSubmit}
            >
              <div className=" w-full">
                <label htmlFor="">Email</label>
                <br />
                <input
                  className="border-2 w-full border-gray-300 focus:outline-none rounded p-2 h-10"
                  placeholder="Enter your email"
                  name="identifier"
                  onChange={handlechange}
                  value={inputNo.identifier}
                />
              </div>
              <div className=" w-full">
                <label htmlFor="">Password</label>
                <br />
                <input
                  name="password"
                  placeholder="Enter your password"
                  className="border-2 w-full  border-gray-300 focus:outline-none rounded p-2 h-10"
                  onChange={handlechange}
                  value={inputNo.password}
                  type="password"
                />
              </div>
              <button
                className="w-full rounded-md mt-3 text-white h-10  bg-black"
                type="submit"
              >
                SIGN UP
              </button>

              <div className="flex  items-center gap-2 text-gray-400 text-[12px]">
                <hr className=" w-20 h-[2px] bg-slate-500" />
                <p>Already have account</p>{" "}
                <hr className=" w-20 h-[2px] bg-slate-500" />{" "}
              </div>
            </form>
            <p className=" text-red-700">{message}</p>
            <div className=" mt-5">
              Do you have an account?{" "}
              <span>
                <NavLink className=" text-blue-500" to="/">
                  Sign In
                </NavLink>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
