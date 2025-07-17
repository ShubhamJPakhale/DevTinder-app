import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [emailId, setEmailId] = useState(user.emailId);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");

  const [showToast, setShowToast] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const options = ["Male", "Female", "Other"];

  const dispatch = useDispatch();

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          emailId,
          photoUrl,
          gender,
          age,
          about,
        },
        { withCredentials: true }
      );
      dispatch(updateUser(response.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex flex-row min-h-[calc(100vh-280px)] justify-center items-center my-10">
        <div className="flex flex-col min-h-[calc(100vh-280px)] justify-center items-center mx-10">
          <div className="card bg-red-400 text-white w-96">
            <div className="card-body">
              <h2 className="card-title">Edit Profile </h2>
              <div className="card-content py-4">
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
                <label className="w-full py-4 max-w-xs form-control card-subtitle my-2">
                  <div className="label">
                    <span className="label-text font-bold text-lg">
                      Email Id :{" "}
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
                      Photo Url :{" "}
                    </span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full text-black text-lg"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
                <label className="w-full py-4 max-w-xs form-control card-subtitle my-2">
                  <div className="label">
                    <span className="label-text font-bold text-lg">
                      Gender :{" "}
                    </span>
                  </div>
                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() => setIsOpen(!isOpen)}
                      className="w-full flex justify-between items-center input input-bordered text-black text-lg px-4 py-2"
                    >
                      {gender || "Select Gender"}
                    </button>

                    {isOpen && (
                      <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                        {options.map((option) => (
                          <li
                            key={option}
                            onClick={() => {
                              setGender(option);
                              setIsOpen(false);
                            }}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </label>
                <label className="w-full py-4 max-w-xs form-control card-subtitle my-2">
                  <div className="label">
                    <span className="label-text font-bold text-lg">Age : </span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full text-black text-lg"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="w-full py-4 max-w-xs form-control card-subtitle my-2">
                  <div className="label">
                    <span className="label-text font-bold text-lg">
                      About :{" "}
                    </span>
                  </div>
                  <textarea
                    className="textarea h-24 w-full text-black text-lg"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>
              {error && <p className="text-white-500">{error}</p>}
              <div className="card-actions justify-center text-xl">
                <button
                  className="btn"
                  onClick={() => {
                    handleUpdateProfile();
                  }}
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, about, photoUrl, age, gender }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
