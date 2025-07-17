import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async()=>{ 
    if(feed) return;
    try{
      const feeddata = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,});
        dispatch(addFeed(feeddata.data));
    }catch(err){
      console.error("Error fetching feed:", err);
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  return (
   feed && (<div className="flex flex-col items-center justify-center py-10">
    <UserCard user={feed.data[0]}/>
   </div>)
  )
}

export default Feed;