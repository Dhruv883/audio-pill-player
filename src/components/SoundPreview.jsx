import React from "react";

const SoundPreview = ({ name, file }) => {
  const title = name.split(".")[0];
  return (
    <div
      className="w-4/5 rounded-lg flex flex-col border border-borderColor pb-2"
      draggable="true"
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
