import React from "react";
import Sidebar from "./components/Sidebar";
import Timeline from "./components/Timeline";
import SoundComponent from "./components/SoundComponent";

const App = () => {
  const onUpload = (files) => {
    // console.log(files);
  };

  return (
    <div className="w-screen h-screen flex p-5 gap-5 bg-bgColor text-white font-Poppins">
      <Sidebar onUpload={onUpload} />
      <div className="flex flex-col justify-between w-full h-full">
        <SoundComponent />
        <Timeline />
      </div>
    </div>
  );
};

export default App;
