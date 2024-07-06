"use client";

import { Menu } from "iconoir-react";
import { PropsWithChildren, useState } from "react";

export type DropdownProps = PropsWithChildren<{
  label: string;
}>;
export default function Dropdown({ label, children }: DropdownProps) {
  const [show, setShow] = useState(false);

  const handleButtonClick = () => {
    setShow(!show);
  };

  return (
    <div className="relative">
      <button
        className="p-2 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors duration-300 flex gap-2"
        onClick={handleButtonClick}
      >
        <Menu />
        {label}
      </button>
      <div
        className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ${
          show ? "" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
