import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./ui-components/Body";
import Login from "./ui-components/Login";
import Signup from "./ui-components/Signup";
import Profile from "./ui-components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./ui-components/Feed";

function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />} >
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
