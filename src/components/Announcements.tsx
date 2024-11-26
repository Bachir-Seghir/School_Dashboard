const announcements = [
  {
    id: 1,
    title: "Lorem ipsum dolor",
    time: "07:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor",
    time: "06:00 AM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor",
    time: "11:00 AM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];
const Announcements = () => {

    return (
        <div className="bg-white rounded-md p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold my-4">Announcements</h1>
              <span className="text-gray-400 text-xs">View All</span>
            </div>

            <div className="flex flex-col mt-4 gap-4">
                {announcements.map(e =>
                    <div key={e.id} className="odd:bg-sky-50 even:bg-yellow-50 rounded-md p-4">
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold">{ e.title}</h2>
                            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">{ e.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{e.description }</p>   
                    </div>)}
            </div>
        </div>
    )
}

export default Announcements