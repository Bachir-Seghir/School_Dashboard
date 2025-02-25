"use client";
import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";
import Image from "next/image";

const CountChart = ({ boys, girls }: { boys: number; girls: number }) => {
	const data = [
		{
			name: "Total",
			count: boys + girls,
			fill: "white",
		},
		{
			name: "Boys",
			count: boys,
			fill: "#6ed0fa",
		},
		{
			name: "Girls",
			count: girls,
			fill: "#fef08a",
		},
	];

	return (
		<div className="w-full h-[75%] relative">
			<ResponsiveContainer>
				<RadialBarChart
					cx="50%"
					cy="50%"
					innerRadius="40%"
					outerRadius="100%"
					barSize={32}
					data={data}
				>
					<RadialBar
						background
						dataKey="count"
					/>
				</RadialBarChart>
			</ResponsiveContainer>
			<Image
				src="/maleFemale.png"
				alt=""
				width={35}
				height={35}
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
			/>
		</div>
	);
};

export default CountChart;
