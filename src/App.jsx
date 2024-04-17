import React, { useState, createContext, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Timeline from "./components/Timeline";
import SoundComponent from "./components/SoundComponent";

export const FileContext = createContext(null);

const App = () => {
  const [files, setFiles] = useState([]);

  const indexDB = () => {
    const dbReq = indexedDB.open("AudioDatabase");

    dbReq.onerror = (event) => {
      console.error(`Database error: ${event.target.errorCode}`);
    };
    dbReq.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(["audios"], "readwrite");
      const objectStore = transaction.objectStore("audios");
      const req = objectStore.getAll();
      req.onsuccess = (e) => {
        setFiles(() => e.target.result);
      };
    };
  };

  useEffect(() => {
    indexDB();
  }, []);

  return (
    <FileContext.Provider value={files}>
      <div className="w-screen h-screen flex gap-5 bg-bgColor text-white font-Poppins">
        <Sidebar />
        <div className="flex flex-col justify-between w-full h-full p-10">
          <SoundComponent />
          <Timeline />
        </div>
      </div>
    </FileContext.Provider>
  );
};

export default App;
