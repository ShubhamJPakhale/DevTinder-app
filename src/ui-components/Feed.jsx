import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async()=>{ 
    if(feed) return;
    try{
      const feeddata = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,});
        dispatch(getAllFeed(feeddata?.data?.data));
    }catch(err){
      console.error("Error fetching feed:", err);
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;


  return (
   feed && (<div className="flex flex-col items-center justify-center py-10">
    <UserCard user={feed[0]}/>
   </div>)
  )
}

export default Feed;