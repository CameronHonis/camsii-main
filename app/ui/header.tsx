import Image from "next/image";
import Button from "./button";
import NavButton from "./nav_button";
import Link from "next/link";

export default function Header() {
    return (
        <div className="absolute w-full flex items-center justify-between bg-white p-[15px] bg-opacity-70 backdrop-blur-[10px] z-[100]">
            <Image src="/logo_transp_bg.png" alt="logo" width={70.5} height={54.9} ></Image>
            <div className="flex items-center justify-end gap-[60px] mr-[10px]">
                <Link href="/about" className="text-black text-[25px]">About</Link>
                <Link href="/pricing" className="text-black text-[25px]">Pricing</Link>
                <Link href="/support" className="text-black text-[25px]">Support</Link>
                <NavButton href="/order" contents="Create Order" color={"primary"} size={25} />
            </div>
        </div>
    );
}