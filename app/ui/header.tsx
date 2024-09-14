import Image from "next/image";
import Button from "./button";

export default function Header() {
    return (
        <div className="absolute w-screen flex items-center justify-between bg-white p-[15px] bg-opacity-70 backdrop-blur-[10px] z-[100]">
            <Image src="/logo_transp_bg.png" alt="logo" width={70.5} height={54.9} ></Image>
            <div className="flex justify-end gap-[60px] mr-[10px]">
                <a href="/" className="text-black text-[25px]">About</a>
                <a href="/" className="text-black text-[25px]">Pricing</a>
                <a href="/" className="text-black text-[25px]">Support</a>
                <Button contents="Create Order" color={"primary"} size={25} />
            </div>
        </div>
    );
}