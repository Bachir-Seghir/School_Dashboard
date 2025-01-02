"use client";

import {
	BarChart,
	Bar,
	Rectangle,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const AttendanceChart = ({
	data,
}: {
	data: { name: string; present: number; absent: number }[];
}) => {
	return (
		<ResponsiveContainer
			width="100%"
			height="90%"
		>
			<BarChart
				width={500}
				height={300}
				data={data}
				barSize={20}
			>
				<CartesianGrid
					strokeDasharray="3 3"
					vertical={false}
					stroke="#ddd"
				/>
				<XAxis
					dataKey="name"
					axisLine={false}
					tick={{ fill: "#d1d5db" }}
					tickLine={false}
				/>
				<YAxis
					axisLine={false}
					tick={{ fill: "#d1d5db" }}
					tickLine={false}
				/>
				<Tooltip />
				<Legend
					align="left"
					verticalAlign="top"
					wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
				/>
				<Bar
					legendType="circle"
					dataKey="present"
					fill="#6ed0fa"
					radius={[10, 10, 0, 0]}
				/>
				<Bar
					legendType="circle"
					dataKey="absent"
					fill="#fef08a"
					radius={[10, 10, 0, 0]}
				/>
			</BarChart>
		</ResponsiveContainer>
	);
};

export default AttendanceChart;
