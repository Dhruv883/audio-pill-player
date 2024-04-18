import React, { useState, useContext } from "react";
import { FileContext } from "../App";
const Timeline = () => {
  const [draggedFileNames, setDraggedFileNames] = useState([]);

  const contextFiles = useContext(FileContext);
  // console.log(contextFiles);

  const [files, setFiles] = useState([]);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const name = event.dataTransfer.getData("text/plain");
    setDraggedFileNames((prev) => {
      const newFiles = prev.filter((prevFile) => prevFile !== name);
      return [...newFiles, name];
    });
  };
  // console.log(draggedFileNames);
  return (
    <div
      className="w-full bg-darkBlue px-5 py-10 rounded-xl h-64"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div>Buttons</div>
      <div>Pills</div>
    </div>
  );
};

export default Timeline;
