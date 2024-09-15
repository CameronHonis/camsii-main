import Image from "next/image";
import Header from "./ui/header";
import Background from "./ui/home/background";
import OptionsShowcase from "./ui/home/options_showcase";

export default function Home() {
    return (
        <div className="">
            <Header />
            <Background />
            <OptionsShowcase />
        </div>
    );
}