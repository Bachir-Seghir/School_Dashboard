"use client";

import Image from "next/image";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Group A", value: 92, fill: "#6ed0fa" },
  { name: "Group B", value: 8, fill: "#fef08a" },
];

const Performance = () => {
  return (
    <div className="bg-white rounded-md h-80 p-4 relative">
      {/* Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Performance</h1>
        <Image src="/moreDark.png" alt="" width={16} height={16} />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            fill="#8884d8"
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-3xl font-bold">9.2</h1>
        <p className="text-xs text-gray-400">of 10 max B.Score</p>
      </div>
      <h1 className="bottom-16 absolute font-semibold left-0 right-0 m-auto text-center">
        1st Semester - 2nd Semester
      </h1>
    </div>
  );
};

export default Performance;
