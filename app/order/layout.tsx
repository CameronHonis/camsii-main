type Props = {
    children: React.ReactNode;
}

export default function OrderLayout({ children }: Props) {
    return <div className="flex flex-col items-center w-full min-h-screen bg-camsii-pink pt-[85px]">
        {children}
    </div>
}