import React from "react";
import BounceLoader from "react-spinners/BounceLoader";

export default function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <BounceLoader  color="#ffffff" size={50} />
    </div>
  );
}
