import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [background, setBackground] = useState("");
  useEffect(() => {
    const imgUrl =
      "https://images.unsplash.com/photo-1647071263966-ba986d17863a?q=80&w=2147&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    setBackground(imgUrl);
  }, []);

  return (
    <div
      className="h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}
    >
      <div className="bg-neutral-900/10 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-xs">
        <h1 className="text-3xl text-red-600 font-bold mb-2 ">
          Star Wars Character Database API
        </h1>
        <p className="text-lg gradient-text">
          Create a REST API that manages a database of Star Wars characters.
          Users should be able to create, read, update, and delete character
          information through various endpoints.
        </p>
      </div>
    </div>
  );
}

export default App;
