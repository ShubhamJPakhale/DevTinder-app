import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import  {BASE_URL}  from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("Shubham.Pakhale@gmail.com");
  const [password, setPassword] = useState("Shubham$97#98");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password, 
        },
        { withCredentials: true }
      );
      dispatch(addUser(response.data));
      navigate("/");
    } catch (err) {
      console.log(`Error - ${err}`);
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-280px)] justify-center items-center">
      <div className="card bg-red-400 text-white w-96">
        <div className="card-body">
          <h2 className="card-title">Login </h2>
          <div className="card-content py-4">
            <label className="w-full py-4 max-w-xs form-control card-subtitle my-2">
              <div className="label">
                <span className="label-text font-bold text-lg">
                  Email ID :{" "}
                </span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full text-black text-lg"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="w-full py-4 max-w-xs form-control card-subtitle my-2">
              <div className="label">
                <span className="label-text font-bold text-lg">
                  Password :{" "}
                </span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full text-black text-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="card-actions justify-center">
            <button
              className="btn"
              onClick={() => {
                handleLogin();
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
