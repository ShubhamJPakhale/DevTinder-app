import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { receivedReqConnections, removeReceivedReqConnections } from '../utils/receivedRequestSlice';

const Requests = () => {

    const dispatch = useDispatch();
    const receivedConnections = useSelector((store) => store.receivedRequests);

    const handleReviewRequest = async(status, _id) => {
        try{
            const response = await axios.post(`${BASE_URL}/request/review/${status}/${_id}`, {},{withCredentials:true});
            dispatch(removeReceivedReqConnections(response?.data?.user));
        }
        catch(err){
            console.error("Error while reviewing request:", err);
        }
    }

    const fetchReceivedRequests = async ()=>{
        try{
            const response = await axios.get(`${BASE_URL}/user/requests/received`, {
                withCredentials: true,
            });
            dispatch(receivedReqConnections(response?.data?.user));
        }
        catch(err){
            console.error("Error while fetching received requests:", err);
        }
    }

    useEffect(()=>{
        fetchReceivedRequests();
    },[]);

 if (!receivedConnections) return;

  if (receivedConnections.length === 0) return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

      {receivedConnections.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.senderUserId;

        return (
          <div
            key={_id}
            className=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button className="btn btn-primary mx-2" onClick={()=>{handleReviewRequest("rejected",request._id)}}>Reject</button>
              <button className="btn btn-secondary mx-2" onClick={()=>{handleReviewRequest("accepted",request._id)}}>Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Requests;