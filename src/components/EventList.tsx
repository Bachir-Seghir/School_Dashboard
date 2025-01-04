import prisma from "@/lib/prisma";

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
	const date = dateParam ? new Date(dateParam) : new Date();
	const data = await prisma.event.findMany({
		where: {
			startTime: {
				gte: new Date(date.setHours(0, 0, 0, 0)),
				lte: new Date(date.setHours(23, 59, 59, 999)),
			},
		},
	});

	return data.map((e) => (
		<div
			className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-sky-200 even:border-t-purple-200"
			key={e.id}
		>
			<div className="flex items-center justify-between">
				<h3 className="text-gray-600 font-semibold">{e.title}</h3>
				<span className="text-gray-400 text-xs">
					{e.startTime.toLocaleDateString("en-US", {
						hour: "2-digit",
						minute: "2-digit",
						hour12: false,
					})}
				</span>
			</div>
			<p className="mt-2 text-sm text-gray-600">{e.description}</p>
		</div>
	));
};

export default EventList;
