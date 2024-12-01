"use client";

import Image from "next/image";

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendnace"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
}) => {
  const size = type === "create" ? "h-8 w-8" : "h-7 w-7";
  const bgColor =
    type === "create"
      ? "bg-yellow-200"
      : type === "update"
      ? "bg-sky-200"
      : "bg-purple-200";
  return (
    <>
      <button
        className={`${size} rounded-full flex items-center justify-center ${bgColor}`}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
    </>
  );
};

export default FormModal;
