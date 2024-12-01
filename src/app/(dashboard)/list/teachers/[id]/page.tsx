import Image from "next/image"

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
                            <Image src="/teacher.jpeg" alt="" width={144} height={144}
                                className="w-36 h-36 object-cover rounded-full"
                            />
                        </div>
                        <div className="w-2/3 flex flex-col justify-between gap-4">
                            <h1 className="text-xl font-semibold">Bachir Seghir</h1>
                            <p className="text-sm text-gray-500">Software Engineer @ Sonatrach - Javascript Expert</p>
                            <div className="flex flex-wrap gap-2 justify-between items-center text-xs font-medium">
                                <div className="w-full flex items-center gap-2 md:w-1/3 lg:w-full 2xl:w-1/3">
                                    <Image src="/blood.png" alt="" width={14} height={14} />
                                    <span>O+</span>
                                </div>
                                <div className="w-full flex items-center gap-2 md:w-1/3 lg:w-full 2xl:w-1/3">
                                    <Image src="/Date.png" alt="" width={14} height={14} />
                                    <span>January 2024</span>
                                </div>
                                <div className="w-full flex items-center gap-2 md:w-1/3 lg:w-full 2xl:w-1/3">
                                    <Image src="/email.png" alt="" width={14} height={14} />
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
<div className=""></div>
                </div>
        {/* BOTTOM */}
                
            </div>
        {/* RIGHT */}
        <div className="w-full xl:w-1/3">right</div>

    </div>
)}

export default SingleTeacherPage