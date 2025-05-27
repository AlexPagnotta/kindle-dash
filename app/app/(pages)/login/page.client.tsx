"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRightToLine } from "lucide-react";
import { auth } from "./actions";

export const LoginPageClient = () => {
  const [pin, setPin] = useState("");

  const handleNumberClick = (number: number) => {
    setPin((prev) => prev + number);
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  return (
    <main className="h-full p-24  border ">
      <form action={auth} className="grid grid-cols-2 gap-48 h-full">
        <div className="flex flex-col gap-32">
          <h1 className="copy-title-1-strong">Enter PIN:</h1>
          <input
            type="password"
            name="pin"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="rounded-md border border-gray-400 p-16 text-2xl"
          />
        </div>

        <div className="grid grid-cols-3 gap-8 size-full">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
            <DPadButton key={number} onClick={() => handleNumberClick(number)} type="button">
              {number}
            </DPadButton>
          ))}
          <DPadButton onClick={handleBackspace} type="button" disabled={!pin.length}>
            <ArrowLeft size={20} />
          </DPadButton>
          <DPadButton type="submit">
            <ArrowRightToLine size={20} />
          </DPadButton>
        </div>
      </form>
    </main>
  );
};

type DPadButtonProps = React.ComponentPropsWithoutRef<"button">;

const DPadButton = ({ children, onClick, ...props }: DPadButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="size-full rounded-md border border-gray-400 flex items-center justify-center copy-body-3-strong"
      {...props}
    >
      {children}
    </button>
  );
};
