import Image from "next/image"

export default function Background() {
    return <>
        <Image alt="letter display 1" src="/marquee_fake2.jpg" width={0} height={0} sizes="100vw" className="w-screen h-auto" priority />
        <div className="absolute flex top-[100px] left-[180px] h-[40px] justify-start">
            <Image alt="location pin" src="/map_pinpoint.png" width={40} height={40} />
            <p className="text-[30px] font-bold ml-2">New Braunfels, Texas</p>
        </div>
    </>
}