// LoginForm.jsx
import { useState, useEffect } from "react";
import LoginBanner from "../assets/Untitled (1).png";
import chaticon from "../assets/chat.svg";
import logo from "../assets/Minimalist Logo for QuikTalk App with Sound Waves.png";
import { NavLink, useNavigate } from "react-router-dom";
function LoginForm() {
  const [input, setInput] = useState({ identifier: "", password: "" });
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);
  const chat = ["Hello👋", "Hii👋", "kaise ho??"];
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => (prevCount + 1) % chat.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [count, chat.length]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const logout = async () => {
    await fetch(
      "https://quicktalk-backend-kni5.onrender.com/api/v1/otp/logout",
      {
        method: "POST",
        credentials: "include", // ✅ delete cookie
      }
    );
    alert("Logged out");
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch(
        "https://quicktalk-backend-kni5.onrender.com/api/v1/otp/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // ✅ include cookie
          body: JSON.stringify(input),
        }
      );
      const data = await res.json();
      console.log("Token cookie after login:", document.cookie);

      if (res.ok) {
        setMessage(data.message);
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
    <main className=" flex max-md:flex max-md:flex-col w-screen bg-[#c5f1f2] ">
      <div className="w-1/2 max-md:w-full">
        <img
          className=" w-full h-screen max-md:h-[500px] object-cover"
          loading="eager"
          src={LoginBanner}
          alt="LoginBanner"
        />
        <div className=" fixed bottom-72 left-[630px] ">
          <div className="Text-black ">{chat[count]}</div>
        </div>
      </div>
      <div className="w-1/2 max-md:w-full flex flex-col items-center justify-center">
        {" "}
        <div className=" w-96 max-md:w-11/12 h-[480px] max-md:p-2 p-10 pt-4 items-center mt-10 flex animate-slideIn flex-col  gap-2 bg-white rounded-lg shadow-lg shadow-black ">
          <img className=" w-28 h-12" src={chaticon} alt="chaticon" />
          <div className=" text-black font-bold text-2xl">Welcome back!</div>
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
        <button onClick={logout}>Logout</button>
      </div>
    </main>
  );
}

export default LoginForm;
