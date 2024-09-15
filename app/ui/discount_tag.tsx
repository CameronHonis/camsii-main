import Button from "./button";

type DiscountTagProps = {
    discountPerc: number;
};

export default function DiscountTag(props: DiscountTagProps) {
    const { discountPerc } = props;
    return <div className="absolute flex items-center justify-between text-white bg-camsii-blue px-[10px] py-[5px] 
    translate-x-[30%] -translate-y-[30%] text-[20px] top-0 right-0 rounded-[10px]">
        {`Save ${discountPerc}%`}
    </div>
}