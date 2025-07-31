import React, { useState } from "react";
import chaticon from "../assets/chat.svg";
import LoginBanner from "../assets/YouTube Banner - Quick Talk - Real-Time Chat.gif";
import logo from "../assets/quick-high-resolution-logo-transparent.png";
import { NavLink, useNavigate } from "react-router-dom";
function Register() {
  const [formData, setFormData] = useState({
    identifier: "",
    otp: "",
    password: "",
    username: "",
    phone: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [message, setMeassage] = useState("");
  const [errors, setErrors] = useState({});
  const validateField = (name, value) => {
    const phonePattern = /^\d{10}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let error = "";

    switch (name) {
      case "username":
        if (!value.trim()) error = "Name is required";
        break;
      case "identifier":
        if (!value.trim()) error = "Email is required";
        else if (!emailPattern.test(value)) error = "Invalid email";
        break;
      case "phone":
        if (!value.trim()) error = "Mobile is required";
        else if (!phonePattern.test(value))
          error = "Enter a valid 10-digit mobile number";
        break;
      case "password":
        if (!value.trim()) error = "Password is required";
        break;

      default:
        break;
    }

    // Set or clear the error
    setErrors((prev) => {
      const updatedErrors = { ...prev };
      if (error) updatedErrors[name] = error;
      else delete updatedErrors[name];
      return updatedErrors;
    });
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validation = () => {
    const stepErrors = {};
    const phonePattern = /^\d{10,15}$/;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.username) {
      stepErrors.username = "Username is required";
    }
    if (!formData.phone.trim()) stepErrors.phone = "Mobile is required";
    else if (!phonePattern.test(formData.phone)) {
      stepErrors.phone = "Enter a valid 10-digit mobile number";
    }
    if (!formData.identifier.trim()) {
      stepErrors.identifier = "Email is required";
    } else if (!regex.test(formData.identifier)) {
      stepErrors.identifier = "Invalid email";
    }
    if (!formData.password) {
      stepErrors.password = "Password is required";
    }
    if (formData.password !== formData.confirmPassword) {
      stepErrors.confirmPassword = "Passwords do not match";
    }

    return stepErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalErrors = {
      ...validation(),
    };
    if (Object.keys(finalErrors).length === 0) {
      console.log("Form submitted", formData);

      // Handle form submission logic here (e.g., sending to an API)
      const formDataToSend = {
        identifier: formData.identifier,
        password: formData.password,
        username: formData.username,
        phone: formData.phone,
      };
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/otp/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataToSend),
          }
        );
        const result = await response.json();
        if (response.ok) {
          setMeassage(result.message);
          localStorage.setItem("token", result.token);
          navigate("/chat/home");
          // window.location.reload();
        } else {
          setMeassage(result.message);
        }
      } catch (e) {
        setMeassage(`Error: ${e.message}. Server error`);

        return e;
      }
    } else {
      setErrors(finalErrors);
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
        <div className="w-1/2 max-[820px]:w-full flex flex-col p-5 items-center justify-center bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364]">
          <div className=" w-96 max-[820px]:w-[450px] max-[520px]:w-11/12 max-sm:p-4 p-10  pt-4 items-center flex animate-slideIn flex-col  gap-2 bg-white rounded-lg shadow-lg shadow-black ">
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
                <label htmlFor="">Name</label>
                <br />
                <input
                  name="username"
                  placeholder="Enter your Name"
                  className="border-2 w-full  border-gray-300 focus:outline-none rounded p-2 h-10"
                  onChange={handlechange}
                  value={formData.username}
                  type="text"
                />
                <div className="w-56 text-red-700 text-[12px] ">
                  {errors.username && <span>{errors.username}*</span>}
                </div>
              </div>
              <div className=" w-full">
                <label htmlFor="">Email</label>
                <br />
                <input
                  className="border-2 w-full border-gray-300 focus:outline-none rounded p-2 h-10"
                  placeholder="Enter your email"
                  name="identifier"
                  onChange={handlechange}
                  value={formData.identifier}
                />
                <div className="w-56 text-red-700 text-[12px] ">
                  {errors.identifier && <span>{errors.identifier}*</span>}
                </div>
              </div>
              <div className=" w-full">
                <label htmlFor="">Phone</label>
                <br />
                <input
                  className="border-2 w-full border-gray-300 focus:outline-none rounded p-2 h-10"
                  placeholder="Phone number"
                  name="phone"
                  onChange={handlechange}
                  value={formData.phone}
                />
                <div className="w-56 text-red-700 text-[12px] ">
                  {errors.phone && <span>{errors.phone}*</span>}
                </div>
              </div>
              <div className=" w-full">
                <label htmlFor="">Password</label>
                <br />
                <input
                  name="password"
                  placeholder="Enter your password"
                  className="border-2 w-full  border-gray-300 focus:outline-none rounded p-2 h-10"
                  onChange={handlechange}
                  value={formData.password}
                  type="password"
                />
                <div className="w-56 text-red-700 text-[12px] ">
                  {errors.password && <span>{errors.password}*</span>}
                </div>
              </div>
              <div className=" w-full">
                <label htmlFor="">Confirm Password</label>
                <br />
                <input
                  name="confirmPassword"
                  placeholder="Enter your password"
                  className="border-2 w-full  border-gray-300 focus:outline-none rounded p-2 h-10"
                  onChange={handlechange}
                  value={formData.confirmPassword}
                  type="password"
                />
                <div className="w-56 text-red-700 text-[12px] ">
                  {errors.confirmPassword && (
                    <span>{errors.confirmPassword}*</span>
                  )}
                </div>
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
