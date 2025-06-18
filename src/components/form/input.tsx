import { InputHTMLAttributes } from "react";

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="w-64 h-10 p-2 border border-gray-200 dark:border-gray-400 dark:bg-stone-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500"
      {...props}
    />
  );
}
