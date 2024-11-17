"use client";
import React, { useEffect, useState } from "react";
import { DarkModeToggler } from "./dark-mode-toggler";
import Link from "next/link";
import { getAuthenticatedUser, signoutUser } from "@/lib/db/db.actions";

function Navbar() {
  const [user, setUser] = useState<any>(null);

  console.log(user);

  const fetchUser = async () => {
    try {
      const res = await getAuthenticatedUser();

      setUser(res);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await signoutUser();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 border-b z-50">
      <div className="top-0 sticky z-[999px] bg-white flex justify-between items-center p-4 px-10 shadow-md">
        <Link href={"/"}>
          <p className=" font-poppins-extrabold text-xl">appshots</p>
        </Link>

        {/* <div className="flex items-center space-x-3">
          <DarkModeToggler />
        </div> */}
      </div>
    </nav>
  );
}

export default Navbar;
