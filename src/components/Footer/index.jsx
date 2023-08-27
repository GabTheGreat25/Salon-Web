import React from "react";

export default function () {
  return (
    <>
      <footer className="px-10 pt-5 pb-20 bg-neutral-primary text-light-default dark:bg-light-default dark:text-dark-default">
        <div className="grid w-full grid-flow-col-dense">
          <div className="grid items-center justify-center grid-flow-row-dense">
            <span className="footer-title">IMPORTANT INFORMATION</span>
            <a className="link link-hover">About Lhanlee Salon</a>
            <a className="link link-hover">Favorites</a>
            <a className="link link-hover">Privacy Policy</a>
            <a className="link link-hover">Terms & Conditions</a>
          </div>
          <div className="grid items-center justify-center grid-flow-row-dense">
            <span className="footer-title">RESOURCES</span>
            <a className="link link-hover">Help Center</a>
            <a className="link link-hover">Feedback</a>
            <a className="link link-hover">Services</a>
          </div>
          <div className="grid items-center justify-center grid-flow-row-dense">
            <span className="footer-title">DOWNLOAD</span>
            <a className="link link-hover">IOS (APPLE)</a>
            <a className="link link-hover">GOOGLE PLAY (ANDROID)</a>
          </div>
          <div className="grid items-center justify-center grid-flow-row-dense">
            <span className="footer-title">CONTACT US</span>
            <a className="link link-hover">+63916 664 1849</a>
            <a className="link link-hover">lhanleesalon@gmail.com</a>
          </div>
          <div className="grid items-center justify-center grid-flow-row-dense">
            <span className="footer-title">CONNECT</span>
            <a className="link link-hover">facebook.com/lhanleesalon</a>
            <a className="link link-hover">twitter.com/lhanleesalon</a>
            <a className="link link-hover">@lhanleesalon2023</a>
          </div>
        </div>
        <div className="grid items-center justify-end py-8 pr-12">
          <p>Copyright © 2023 - TEAM LHANLEESALON TAGUIG</p>
        </div>
      </footer>
    </>
  );
}
