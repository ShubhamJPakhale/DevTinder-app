import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-gray-300 text-base-content rounded p-4 mt-10 bottom-0 left-0 right-0 ">
      <nav className="grid grid-flow-col gap-4">
        <a className="link link-hover">About us</a>
      </nav>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Shubham
          Pakhale
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
