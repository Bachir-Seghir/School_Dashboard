"use client"

import Image from "next/image"
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";

const data = [
  {
    name: 'Jan',
    income: 4000,
    expense: 2400,
  },
  {
    name: 'Feb',
    income: 3000,
    expense: 1398,
  },
  {
    name: 'Mar',
    income: 2000,
    expense: 9800,
  },
  {
    name: 'Apr',
    income: 2780,
    expense: 3908,
  },
  {
    name: 'May',
    income: 1890,
    expense: 4800,
  },
  {
    name: 'Jun',
    income: 2390,
    expense: 3800,
  },
  {
    name: 'Jul',
    income: 3490,
    expense: 4300,
  },
  {
    name: 'Aug',
    income: 3490,
    expense: 4300,
  },
  {
    name: 'Sep',
    income: 8490,
    expense: 300,
  },
  {
    name: 'Oct',
    income: 3490,
    expense: 4300,
  },
  {
    name: 'Nov',
    income: 3490,
    expense: 6300,
  },
  {
    name: 'Dec',
    income: 5490,
    expense: 4300,
  },
];


const FinanceChart = () => {

    return (
        <div className="bg-white rounded-lg w-full h-full p-4">
            {/* Title */}
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">Finance</h1>
                <Image src="/moreDark.png" alt="" width={20} height={20} />
            </div>
        
        {/* Chart */}
         <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd"/>
          <XAxis dataKey="name" axisLine={false} tick={{ fill: "#d1d5db"}} tickLine={false} tickMargin={10}/>
          <YAxis axisLine={false} tick={{ fill: "#d1d5db"}} tickLine={false} tickMargin={20}/>
                    <Tooltip />
          <Legend align='center' verticalAlign='top' wrapperStyle={{ paddingTop: "10px", paddingBottom: "20px"}}/>
                    
          <Line type="monotone" dataKey="income" stroke="#6ed0fa" strokeWidth={3} />
          <Line type="monotone" dataKey="expense" stroke="#fef08a" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>   
            
            
        </div>
    )
}

export default FinanceChart