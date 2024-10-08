import DiscountTag from "../ui/discount_tag";
import NavButton from "../ui/nav_button";

export default function Order() {
    return <div className="flex flex-col items-center mt-[150px]">
        <p className="text-black text-[60px]">Choose your style</p>
        <div className="flex justify-between w-full mt-[200px]">
            <div className="flex flex-col items-center max-w-[420px] mx-[75px]">
                <p className="text-black text-[25px] text-center">Choose from a curated list of popular word combos</p>
                <NavButton
                    href="/order/curated"
                    contents={<>
                        Go Tried and True
                        <DiscountTag discountPerc={15} />
                    </>}
                    color="primary"
                    size={25}
                    style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20, borderRadius: 20, marginTop: 40 }}
                />
            </div>
            <div className="flex flex-col items-center max-w-[420px] mx-[75px]">
                <p className="text-black text-[25px] text-center">Customize the size and shape of your order</p>
                <NavButton
                    href="/order/custom"
                    contents={<>
                        Get Customizing
                    </>}
                    color="primary"
                    size={25}
                    style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20, borderRadius: 20, marginTop: 40 }}
                />
            </div>
        </div>
    </div>
}