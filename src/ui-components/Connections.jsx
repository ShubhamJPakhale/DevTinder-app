import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { userConnections } from "../utils/connectionsSlice";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(userConnections(response?.data?.data));
    } catch (err) {
      console.error("Error while fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return <h1 className="flex justify-center my-10"> No Connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className=" flex items-center justify-between m-4 p-4 rounded-lg bg-base-300 w-auto mx-20"
          >
            <img
              alt="photo"
              className="w-20 h-20 rounded-full"
              src={photoUrl}
            />

            <div className="text-left mx-4 flex-1 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <button
              className="btn btn-primary ml-auto"
              onClick={() => navigate(`/chat/${_id}`)}
            >
              Chat
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;
