import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-coral-gray py-4">
      <div className="padding-x flex text-sm sm:text-xl justify-around font-semibold">
        <a href="/" className="underline">
          <h1>Contact</h1>
        </a>
        <a href="/" className="underline">
          <h1>Privacy</h1>
        </a>
        <a href="/" className="underline">
          <h1>Terms of Use</h1>
        </a>
        <a href="/" className="underline">
          <h1>Trademarks</h1>
        </a>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm">
          &copy; 2024 TalentHub. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
