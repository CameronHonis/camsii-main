import Link from "next/link";
import Background from "./ui/home/background";
import OptionsShowcase from "./ui/home/options_showcase";

export default function App() {
    return (
        <div className="bg-camsii-offwhite">
            <Background />
            <OptionsShowcase />
            <div className="flex justify-center w-full mt-[10px]">
                <Link href="#" className="text-camsii-black underline text-[30px] font-bold">
                    Back to top
                </Link>
            </div>
        </div>
    );
}