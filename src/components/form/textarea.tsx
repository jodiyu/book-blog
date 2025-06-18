import { TextareaHTMLAttributes } from "react";

export default function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className="w-full p-2 border border-gray-200 dark:border-gray-400 dark:bg-stone-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-500"
      {...props}
    />
  );
}
