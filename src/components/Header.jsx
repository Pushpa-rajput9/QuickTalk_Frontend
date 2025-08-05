import React, { useEffect, useState } from "react";
import logo from "../assets/quick-high-resolution-logo-transparent.png";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Header() {
  const [userData, setUserData] = useState([]);
  const [apiResponse, setApiResponse] = useState("");
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const extractUserId = () => {
    if (!token) {
      console.error("No token found. Please log in.");
      return null;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp < currentTime) {
        console.error("Token expired");
        localStorage.removeItem("token");
        navigate("/");
        return null;
      }

      const user = decodedToken.id;
      if (!user) {
        console.error("Customer ID not found in token");
        return null;
      }

      return user;
    } catch (error) {
      console.error("Invalid token:", error.message);
      localStorage.removeItem("token");
      navigate("/");
      return null;
    }
  };

  const fetchUserdata = async () => {
    const id = extractUserId();
    if (!id) return;
    setUserId(id);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/otp/${id}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setUserData(data);
        setApiResponse("User data fetched successfully.");
      } else {
        setApiResponse("Failed to fetch user data.");
      }
    } catch (error) {
      setApiResponse("Error fetching user data: " + error.message);
    }
  };

  useEffect(() => {
    fetchUserdata();
  }, []);

  return (
    <div className="h-screen w-96 border-r-2 border-gray-100">
      <div className="flex gap-5">
        <div>{userId}</div>
        <div className="font-bold text-lg">Quick Talk</div>
      </div>
    </div>
  );
}

export default Header;
