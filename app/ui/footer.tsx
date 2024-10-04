import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return <div className="flex justify-center gap-[600px] py-[40px] bg-camsii-black">
        <div className="flex flex-col items-end justify-between h-[160px]">
            <p className="font-bold text-[30px]">Social Media</p>
            <div className="flex gap-[25px]">
                <Link href="https://www.google.com">
                    <Image src="/tiktok_logo.png" alt="tiktok icon" width={50} height={50} />
                </Link>
                <Link href="">
                    <Image src="/instagram_logo.svg" alt="instagram icon" width={50} height={50} />
                </Link>
                <Link href="">
                    <Image src="/facebook_logo.png" alt="facebook icon" width={50} height={50} />
                </Link>
            </div>
        </div>
        <div className="flex flex-col items-start justify-between h-[160px]">
            <p className="font-bold text-[30px]">Contact Info</p>
            <div>
                <p className="text-[25px]">123-456-7890</p>
                <p className="text-[25px]">camsii.events@gmail.com</p>
            </div>
        </div>
    </div>
}