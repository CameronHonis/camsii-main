import Button from "../button";
import DiscountTag from "../discount_tag";
import CustomizeAnim from "./customize_anim";

export default function OptionsShowcase() {
    return <div className="flex bg-camsii-offwhite p-[10px] justify-between">
        <div className="flex-1 flex flex-col items-center justify-between p-[30px] pt-[70px] bg-gradient-to-b from-[#D8A0B1] to-[#986373] h-[625px]">
            <p className="text-black text-[40px]">Pick from our curated selection</p>
            <></>
            <Button
                contents={<>
                    Go Tried and True
                    <DiscountTag discountPerc={15}/>
                </>}
                color="primary"
                size={30}
                style={{paddingLeft: 50, paddingRight: 50, paddingTop: 25, paddingBottom: 25, borderRadius: 20}}
            />
        </div>
        <div className="relative flex-1 ml-[10px] flex flex-col justify-between items-center p-[30px] pt-[110px] bg-gradient-to-b from-[#222222] to-[#111111]">
            <p className="absolute left-[30px] top-[30px] text-[30px] text-camsii-gray">or...</p>
            <p className="text-[40px]">Personalize your order</p>
            <CustomizeAnim />
            <Button
                contents={<>
                    Get Quirky
                </>}
                color="bg-white text-black font-semibold"
                size={30}
                style={{paddingLeft: 50, paddingRight: 50, paddingTop: 25, paddingBottom: 25, borderRadius: 20}}
            />
        </div>
    </div>
}