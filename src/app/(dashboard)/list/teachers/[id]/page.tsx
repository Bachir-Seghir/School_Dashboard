import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import Performance from "@/components/Performance";
import Image from "next/image";
import Link from "next/link";

const SingleTeacherPage = () => {
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* USER INFO  */}
          <div className="flex-1 flex gap-4 rounded-md p-5 bg-sky-100">
            <div className="w-1/3">
              <Image
                src="/teacher.jpeg"
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 object-cover rounded-full"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <h1 className="text-xl font-semibold">Bachir Seghir</h1>
              <p className="text-sm text-gray-500">
                Software Engineer @ Sonatrach - Javascript Expert
              </p>
              <div className="flex flex-wrap gap-2 justify-between items-center text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2 ">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>O+</span>
                </div>
                <div className="w-full flex items-center gap-2 md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src="/Date.png" alt="" width={14} height={14} />
                  <span>January 2024</span>
                </div>
                <div className="w-full flex items-center gap-2 md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>bachir.seghir@gmail.com</span>
                </div>
                <div className="w-full flex items-center gap-2 md:w-1/3 lg:w-full 2xl:w-1/3">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>+213775650704</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className="flex-1 flex justify-between flex-wrap gap-4">
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] lg:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={4}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] lg:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleBranch.png"
                alt=""
                width={24}
                height={4}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">2</h1>
                <span className="text-sm text-gray-400">Branches</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] lg:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleLesson.png"
                alt=""
                width={24}
                height={4}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">6</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] lg:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleClass.png"
                alt=""
                width={24}
                height={4}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">6</h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 p-4 h-[800px] rounded-md bg-white">
          <h1 className="font-bold text-xl">Teacher's Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="p-4 rounded-md bg-white">
          <h1 className="font-semibold text-xl">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-sm text-gray-500">
            <Link href="/" className="p-3 rounded-md bg-sky-100">
              Teacher's Classes
            </Link>
            <Link href="/" className="p-3 rounded-md bg-purple-100">
              Teacher's Students
            </Link>
            <Link href="/" className="p-3 rounded-md bg-yellow-100">
              Teacher's Lessons
            </Link>
            <Link href="/" className="p-3 rounded-md bg-pink-100">
              Teacher's Exams
            </Link>
            <Link href="/" className="p-3 rounded-md bg-sky-100">
              Teacher's Assignments
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
