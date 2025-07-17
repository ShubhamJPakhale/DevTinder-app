import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionsReducer from "./connectionsSlice";
import receivedRequestReducer from "./receivedRequestSlice";

const appStore =  configureStore({
    reducer:{
        user: userReducer,
        feed: feedReducer,
        connections: connectionsReducer,
        receivedRequests: receivedRequestReducer,
    }
});

export default appStore;