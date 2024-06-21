import React from "react";

function Footer() {
  //
  return (
    <footer className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4">
      <div className="container mx-auto text-center text-white">
        &copy; {new Date().getFullYear()} AniWear. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
