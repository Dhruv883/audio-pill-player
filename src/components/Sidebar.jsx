import React, { useRef, useState, useEffect } from "react";
import SoundPreview from "./SoundPreview";

const Sidebar = ({ onUpload }) => {
  const drop = useRef(null);
  const [droppedFiles, setDroppedFiles] = useState([]);
  const [isDropping, setIsDropping] = useState(false);

  useEffect(() => {
    drop.current.addEventListener("dragover", handleDragOver);
    drop.current.addEventListener("drop", handleDrop);
    drop.current.addEventListener("dragenter", handleDragEnter);
    drop.current.addEventListener("dragleave", handleDragLeave);

    return () => {
      drop.current.removeEventListener("dragover", handleDragOver);
      drop.current.removeEventListener("drop", handleDrop);
      drop.current.removeEventListener("dragenter", handleDragEnter);
      drop.current.removeEventListener("dragleave", handleDragLeave);
    };
  }, []);

  useEffect(() => onUpload(droppedFiles), [droppedFiles]);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { files } = e.dataTransfer;

    setDroppedFiles((prevFiles) => {
      return [...prevFiles, ...files];
    });
    setIsDropping(false);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDropping(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!drop.current.contains(e.relatedTarget)) {
      setIsDropping(false);
    }
  };

  return (
    <div
      className={`w-1/4 p-4 flex flex-col gap-5 justify-center items-center text-center text-lg overflow-y-auto pt-auto bg-darkBlue  ${
        isDropping ? "shadow-inShado bg-lightBlue" : null
      }`}
      ref={drop}
    >
      {!isDropping ? (
        droppedFiles.length == 0 ? (
          <>
            <div className="w-full">
              <img src="/music.svg" alt="" srcSet="" className="m-auto" />
            </div>
            Drag and drop audio files from device to import
          </>
        ) : (
          <>
            {droppedFiles.map((file, index) => (
              <SoundPreview name={file.name} file={file} key={index} />
            ))}
          </>
        )
      ) : (
        <>
          <div className="w-full">
            <img src="/drop.svg" alt="" srcSet="" className="m-auto" />
          </div>
          Drop audio file to import
        </>
      )}
    </div>
  );
};

export default Sidebar;
