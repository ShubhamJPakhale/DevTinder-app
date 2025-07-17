import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import {removeUserFromFeed} from '../utils/feedSlice';

const UserCard = ({ user }) => {
  const { firstName, lastName, about, photoUrl, age, gender, _id } = user;

  const dispatch= useDispatch();

  const handleSendRequest = async(status, userId)=>{
    try{
      await axios.post(`${BASE_URL}/request/send/${status}/${userId}`,{},{withCredentials:true});
      dispatch(removeUserFromFeed(userId));
    }
    catch(err){
      console.error("Error sending request:", err);
    }
  }

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt={firstName} />
      </figure>
      <div className="card-body">
        <h2 className="card-title flex items-center justify-between">
          <span>{firstName + " " + lastName}</span>
          <span className="text-red-500">{gender === "male" ? "M" : "F"}</span>
        </h2>
        {age && gender && <p>{age + " " + gender.toLocaleUpperCase()}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary" onClick={()=>{handleSendRequest("ignored",_id)}}>Ignore</button>
          <button className="btn btn-secondary" onClick={()=>{handleSendRequest("interested",_id)}}>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
