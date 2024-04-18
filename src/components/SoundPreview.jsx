import React from "react";

const SoundPreview = ({ name, file }) => {
  const title = name.split(".")[0];

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", name);
  };

  // const audio = new Audio(URL.createObjectURL(file));
  // const handleMouseEnter = () => {
  //   audio.play();
  // };

  // const handleMouseLeave = () => {
  //   audio.pause();
  //   audio.currentTime = 0;
  // };

  return (
    <div
      className="w-4/5 rounded-lg flex flex-col border border-purple pb-2"
      draggable="true"
      onDragStart={handleDragStart}
    >
      <img
        src=""
        alt=""
        srcSet="sound.svg"
        className="h-12"
        draggable="false"
      />
      <div className="text-sm">{title}</div>
    </div>
  );
};

export default SoundPreview;
