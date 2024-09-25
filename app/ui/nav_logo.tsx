import Image from "next/image";
import Link from "next/link";

export default function NavLogo() {

    return <Link href="/" className="cursor-pointer">
        <Image src="/logo_transp_bg.png" alt="logo" width={70.5} height={54.9} ></Image>
    </Link>
}