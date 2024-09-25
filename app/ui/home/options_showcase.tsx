import shuffle from "@/app/helpers/shuffle";
import Button from "../button";
import DiscountTag from "../discount_tag";
import CustomizeAnim from "./customize_anim";
import WordRibbon from "./word_ribbon_anim";

const WORDS = ["mr & mrs", "marry me", "new years", "be mine", "bride to be", "class of 2025", "you & me", "sweet 16", "happy bday", "forever", "happy anniversary"];
const words1 = shuffle(WORDS);
const words2 = shuffle(WORDS);
const words3 = shuffle(WORDS);
const words4 = shuffle(WORDS);
const WORD_SPACE_PX = 50;
const FONT_SIZE_PX = 60;

export default function OptionsShowcase() {
    return <div className="flex bg-camsii-offwhite p-[10px] justify-between">
        <div className="relative flex-1 flex flex-col items-center justify-between p-[30px] pt-[50px] bg-gradient-to-b from-[#D8A0B1] to-[#986373] h-[625px]">
            <p className="text-black text-[40px] text-center">Pick from our curated selection</p>
            <div className="absolute top-[200px] flex-col w-full">
                <WordRibbon words={words1} wordSpacePx={WORD_SPACE_PX} fontSizePx={FONT_SIZE_PX} MsPerPx={20} reversed textStyle="text-camsii-silver" />
                <WordRibbon words={words2} wordSpacePx={WORD_SPACE_PX} fontSizePx={FONT_SIZE_PX} MsPerPx={40} textStyle="text-camsii-silver" />
                <WordRibbon words={words3} wordSpacePx={WORD_SPACE_PX} fontSizePx={FONT_SIZE_PX} MsPerPx={20} textStyle="text-camsii-silver" />
                <WordRibbon words={words4} wordSpacePx={WORD_SPACE_PX} fontSizePx={FONT_SIZE_PX} MsPerPx={10} textStyle="text-camsii-silver" />
            </div>
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