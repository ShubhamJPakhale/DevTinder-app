import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
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
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try{
      const response = await axios.post(
        `${BASE_URL}/signup`,{firstName,lastName,emailId,password},{withCredentials: true})
      dispatch(addUser(response?.data?.user));
      navigate("/profile");
    }catch(err){
      setError(err?.response?.data || "Something went wrong");
    }
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-280px)] justify-center items-center">
      <div className="card bg-blue-700 text-white w-96">
        <div className="card-body">
          <h2 className="card-title">{isLoginForm ? "Login" : "Sign Up"}</h2>
          <div className="card-content py-4">
            {!isLoginForm && (
              <>
                <label className="w-full py-4 max-w-xs form-control card-subtitle my-2">
                  <div className="label">
                    <span className="label-text font-bold text-lg">
                      First Name :{" "}
                    </span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full text-black text-lg"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="w-full py-4 max-w-xs form-control card-subtitle my-2">
                  <div className="label">
                    <span className="label-text font-bold text-lg">
                      Last Name :{" "}
                    </span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full text-black text-lg"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </>
            )}
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
                type="password"
                className="input input-bordered w-full text-black text-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          {error && <p className="text-white-500">{error}</p>}
          <div className="card-actions justify-center text-xl">
            <button
              className="btn"
              onClick={() => {
                isLoginForm ? handleLogin() : handleSignUp();
              }}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <p>
            {isLoginForm
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              className="btn-link"
              onClick={() => setIsLoginForm(!isLoginForm)}
            >
              {isLoginForm ? " Sign Up" : " Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
