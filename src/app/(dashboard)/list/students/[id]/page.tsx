import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendatContainer";
import Performance from "@/components/Performance";
import StudentAttendanceCard from "@/components/StudentAttendanceCard";
import prisma from "@/lib/prisma";
import { Class, Student } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const SingleStudentPage = async ({
	params: { id },
}: {
	params: { id: string };
}) => {
	const student:
		| (Student & { class: Class & { _count: { lessons: number } } })
		| null = await prisma.student.findUnique({
		where: { id },
		include: {
			class: {
				include: {
					_count: { select: { lessons: true } },
				},
			},
		},
	});

	if (!student) {
		return notFound();
	}
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
								src={student.img || "/noAvatar.png"}
								alt=""
								width={144}
								height={144}
								className="w-36 h-36 object-cover rounded-full"
							/>
						</div>
						<div className="w-2/3 flex flex-col justify-between gap-4">
							<h1 className="text-xl font-semibold">
								{student.firstName + " " + student.lastName}
							</h1>
							<p className="text-sm text-gray-500">Future Software Engineer</p>
							<div className="flex flex-wrap gap-2 justify-between items-center text-xs font-medium">
								<div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2 ">
									<Image
										src="/blood.png"
										alt=""
										width={14}
										height={14}
									/>
									<span>{student.bloodType}</span>
								</div>
								<div className="w-full flex items-center gap-2 md:w-1/3 lg:w-full 2xl:w-1/3">
									<Image
										src="/Date.png"
										alt=""
										width={14}
										height={14}
									/>
									<span>
										{new Intl.DateTimeFormat("en-us").format(student.birthday)}
									</span>
								</div>
								<div className="w-full flex items-center gap-2 md:w-1/3 lg:w-full 2xl:w-1/3">
									<Image
										src="/mail.png"
										alt=""
										width={14}
										height={14}
									/>
									<span>{student.email || "-"}</span>
								</div>
								<div className="w-full flex items-center gap-2 md:w-1/3 lg:w-full 2xl:w-1/3">
									<Image
										src="/phone.png"
										alt=""
										width={14}
										height={14}
									/>
									<span>{student.phone || "-"}</span>
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
							<Suspense fallback="Loading...">
								<StudentAttendanceCard id={student.id} />
							</Suspense>
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
								<h1 className="text-xl font-semibold">
									{student.class.name.charAt(0)}th
								</h1>
								<span className="text-sm text-gray-400">Grade</span>
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
								<h1 className="text-xl font-semibold">
									{student.class._count.lessons}
								</h1>
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
								<h1 className="text-xl font-semibold">{student.class.name}</h1>
								<span className="text-sm text-gray-400">Class</span>
							</div>
						</div>
					</div>
				</div>
				{/* BOTTOM */}
				<div className="mt-4 p-4 h-[800px] rounded-md bg-white">
					<h1 className="font-bold text-xl">Student's Schedule</h1>
					<BigCalendarContainer
						id={student.class.id}
						type="classId"
					/>
				</div>
			</div>
			{/* RIGHT */}
			<div className="w-full xl:w-1/3 flex flex-col gap-4">
				<div className="p-4 rounded-md bg-white">
					<h1 className="font-semibold text-xl">Shortcuts</h1>
					<div className="mt-4 flex gap-4 flex-wrap text-sm text-gray-500">
						<Link
							href={`/list/teachers?classId=${3}`}
							className="p-3 rounded-md bg-sky-100"
						>
							Student's Teachers
						</Link>
						<Link
							href={`/list/results?studentId=${"student1"}`}
							className="p-3 rounded-md bg-purple-100"
						>
							Student's Results
						</Link>
						<Link
							href={`/list/lessons?classId=${2}`}
							className="p-3 rounded-md bg-yellow-100"
						>
							Student's Lessons
						</Link>
						<Link
							href={`/list/exams?classId=${2}`}
							className="p-3 rounded-md bg-pink-100"
						>
							Student's Exams
						</Link>
						<Link
							href={`/list/assignments?classId=${2}`}
							className="p-3 rounded-md bg-sky-100"
						>
							Student's Assignments
						</Link>
					</div>
				</div>
				<Performance />
				<Announcements />
			</div>
		</div>
	);
};

export default SingleStudentPage;
