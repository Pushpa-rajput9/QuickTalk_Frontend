import { useState } from "react";
import LoginForm from "./components/LoginForm";

function App() {
  const [inputNo, setInput] = useState({
    phone: "",
    otp: "",
    password: "",
  });
  const [message, setMeassage] = useState("");
  const handlechange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/otp/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            identifier: inputNo.phone,
            password: inputNo.password,
          }),
        }
      );
      const result = await response.json();
      if (response.ok) {
        setMeassage(result.message);
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
      const res = await fetch("http://localhost:3000/api/v1/otp/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          identifier: `+91${inputNo.phone}`,
          otp: inputNo.otp,
        }),
      });

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
      <div className=" p-10">
        <form
          action=""
          className="w-full p-10 bg-red-200"
          onSubmit={handleSubmit}
        >
          <input
            name="phone"
            onChange={handlechange}
            className=" h-10 bg-gray-100 rounded border-2 border-black p-2 "
            value={inputNo.phone}
            type="text"
          />
          <input
            type="password"
            name="password"
            onChange={handlechange}
            className=" h-10 bg-gray-100 rounded border-2 border-black p-2 "
            value={inputNo.password}
            id=""
          />

          <button>submit</button>
        </form>
        {/* <form action="" onSubmit={verifyOTP}>
          <input
            name="otp"
            onChange={handlechange}
            value={inputNo.otp}
            className=" h-10 bg-gray-100 rounded border-2 border-black p-2 "
            type="text"
          />
          <button>verify</button>
        </form> */}
        <hr />
        <div>
          <LoginForm />
        </div>
        {message && <div className=" text-red-500">{message}</div>}
      </div>
    </>
  );
}

export default App;
