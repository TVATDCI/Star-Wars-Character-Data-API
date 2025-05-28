// src/components/views/InfoPage.jsx
import { useApp } from "../../context/AppContext";
import Button from "../buttons/Button";
import SpaceBtn from "../buttons/SpaceBtn";
import ButtonGradient from "../buttons/ButtonGradient";
import BtnNeonGradient from "../buttons/BtnNeonGradient";

export default function InfoPage() {
  const { user, setView, handleLogout } = useApp();

  return (
    <main className="text-center bg-neutral-800/5 backdrop-blur-sm p-4 rounded-xl shadow-2xl mt-2 w-full max-w-2xl mx-auto">
      <p className="text-lg italic font-semibold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-6">
        Welcome to{" "}
        <span className="font-semibold text-[#FFC500]">
          Star Wars Admin Dashboard
        </span>
        . Built with role-based access and full-stack CRUD power!
      </p>
      <p className="text-lg text-yellow-400/50 mt-4 hover:text-yellow-400 italic">
        Register or login to access the database, or{" "}
        <span className="text-[#FFC500] cursor-pointer hover:text-red-500">
          contact me
        </span>{" "}
        for admin access.
      </p>

      {user ? (
        <div className="flex flex-col items-center gap-4">
          <h4 className="text-2xl text-red-400 font-bold">
            Welcome back, <span className="text-green-500">{user.email}</span>!
          </h4>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <ButtonGradient />
            <BtnNeonGradient />
            <Button onClick={() => setView("characters")}>
              Characters List
            </Button>
            <SpaceBtn onClick={handleLogout}>Logout</SpaceBtn>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-around items-center gap-4 mt-4">
          <ButtonGradient />
          <BtnNeonGradient />
          <Button onClick={() => setView("characters")}>Characters</Button>
          <Button onClick={() => setView("login")}>Login</Button>
          <Button onClick={() => setView("register")}>Register</Button>
        </div>
      )}

      <SpaceBtn className="mt-10">
        <a
          href="https://github.com/TVATDCI"
          target="_blank"
          rel="noopener noreferrer"
        >
          DEAD STAR!
        </a>
      </SpaceBtn>
    </main>
  );
}
