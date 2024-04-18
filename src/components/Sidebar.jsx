import React, { useRef, useState, useEffect, useContext } from "react";
import { FileContext } from "../App";
import SoundPreview from "./SoundPreview";

const Sidebar = () => {
  const indexDB = (files) => {
    const dbReq = indexedDB.open("AudioDatabase");

    dbReq.onerror = (event) => {
      console.error(`Database error: ${event.target.errorCode}`);
    };
    dbReq.onsuccess = (event) => {
      const db = event.target.result;

      files.forEach(async (file) => {
        const transaction = db.transaction(["audios"], "readwrite");
        const objectStore = transaction.objectStore("audios");

        const reqCheck = await objectStore.index("name").get(file.name);
        // console.log(reqCheck);
        reqCheck.onsuccess = async (event) => {
          if (event.target.result) {
            console.log("File already exists!");
          } else {
            const reqAdd = objectStore.add(file);

            reqAdd.onsuccess = (event) => {
              console.log("File Added!");
            };

            reqAdd.onerror = (event) => {
              console.log(event.target.error);
            };
          }
        };

        reqCheck.onerror = (event) => {
          console.log("Error checking if file exists:", event.target.error);
        };
      });
    };

    dbReq.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("audios")) {
        const objectStore = db.createObjectStore("audios", {
          autoIncrement: true,
        });
        objectStore.createIndex("name", "name", { unique: true });
      }
    };
  };

  const drop = useRef(null);
  const contextFiles = useContext(FileContext);
  // console.log(contextFiles);
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

  // useEffect(() => onUpload(droppedFiles), [droppedFiles]);
  useEffect(() => indexDB(droppedFiles), [droppedFiles]);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { files } = e.dataTransfer;

    setDroppedFiles((prevFiles) => {
      const newFiles = Array.from(files).filter((file) => {
        return !prevFiles.some(
          (existingFile) => existingFile.name === file.name
        );
      });

      return [...prevFiles, ...newFiles];
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

  useEffect(() => {
    setDroppedFiles((prev) => {
      return [...prev, ...contextFiles];
    });
  }, [contextFiles]);

  // console.log(droppedFiles);
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
