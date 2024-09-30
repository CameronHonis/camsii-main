import { OrderBuilderAction, OrderBuilderBack, OrderBuilderSelectOption, OrderBuilderSelectSizes, OrderBuilderSubmitText } from "./order_builder_actions";
import { PHRASES, PROMPT_BY_PLACEHOLDER, VARIANTS_BY_PHRASE } from "@/constants";
import { OrderBuilderOptionsSlide, OrderBuilderSizerSlide, OrderBuilderSlide, OrderBuilderTextInputSlide } from "./order_builder_slide";
import { LetterSize } from "@/models/letter_size";

export const OrderBuilderPhases = {
    BASE_PHRASE: "base_phrase",
    VARIANT: "variant",
    PLACEHOLDERS: "placeholders",
    SIZES: "sizes",
}

export type OrderBuilderPhase = typeof OrderBuilderPhases[keyof typeof OrderBuilderPhases];

function variantsByBasePhrase(phrase: string): string[] {
    if (phrase in VARIANTS_BY_PHRASE) {
        return VARIANTS_BY_PHRASE[phrase as keyof typeof VARIANTS_BY_PHRASE];
    }
    return [];
}

function placeholdersByPhrase(variant: string): string[] {
    const matches = variant.match(/\[([^\d\]]+)\]/g);
    if (!matches) return [];
    return matches.map(match => match.slice(1, -1));
}

function promptByPlaceholder(placeholder: string): string {
    if (!(placeholder in PROMPT_BY_PLACEHOLDER)) {
        throw new Error(`could not find prompt for placeholder ${placeholder}`);
    }
    return PROMPT_BY_PLACEHOLDER[placeholder as keyof typeof PROMPT_BY_PLACEHOLDER];
}

function fillPlaceholder(phrase: string, val: string): string {
    const i = phrase.indexOf("[");
    const j = phrase.indexOf("]");
    if (i === -1 || j === -1) throw new Error(`could not fill phrase ${phrase}, no placeholders`);
    return phrase.substring(0, i) + val + phrase.substring(j+1);
}

export default class OrderBuilderState {
    slideStack: OrderBuilderSlide[];
    phraseStack: string[];
    phaseStack: OrderBuilderPhase[];
    isCuratedOption: boolean;
    sizeByWord?: Record<string, LetterSize>;

    constructor(slideStack: OrderBuilderSlide[],
        phraseStack: string[],
        phaseStack: OrderBuilderPhase[],
        isCuratedOption: boolean,
        sizes?: Record<string, LetterSize>,
    ) {
        this.slideStack = slideStack;
        this.phraseStack = phraseStack;
        this.phaseStack = phaseStack;
        this.isCuratedOption = isCuratedOption;
        this.sizeByWord = sizes;
    }

    public reduce(action: OrderBuilderAction): OrderBuilderState {
        const next = this.clone();
        const phase = this.getPhase();

        if (action instanceof OrderBuilderBack) {
            next.slideStack.pop();
            next.phraseStack.pop();
            next.phaseStack.pop();
            return next;
        }

        if (phase === OrderBuilderPhases.BASE_PHRASE) {
            if (action instanceof OrderBuilderSelectOption) {
                next.phraseStack.push(action.option);
                next.isCuratedOption = true;
            } else if (action instanceof OrderBuilderSubmitText) {
                next.phraseStack.push(action.textInput);
                next.isCuratedOption = false;
            } else if (action instanceof OrderBuilderBack) {
                throw new Error("cannot revert phase back from base phase");
            } else throw new Error(`cannot handle ${action} in phase ${this.phaseStack}`);
        } else if (phase === OrderBuilderPhases.VARIANT) {
            if (action instanceof OrderBuilderSelectOption) {
                next.phraseStack.push(action.option);
            } else throw new Error(`cannot handle ${action} in phase ${this.phaseStack}`);
        } else if (phase === OrderBuilderPhases.PLACEHOLDERS) {
            if (action instanceof OrderBuilderSubmitText) {
                const nextPhrase = fillPlaceholder(this.getPhrase(), action.textInput);
                next.phraseStack.push(nextPhrase);
            } else if (action instanceof OrderBuilderBack) {
                next.phraseStack.pop();
            } else throw new Error(`cannot handle ${action} in phase ${this.phaseStack}`);
        } else if (phase === OrderBuilderPhases.SIZES) {
            if (action instanceof OrderBuilderSelectSizes) {
                next.sizeByWord = action.sizeByWord;
            }
        }
        next.addNextSlideAndPhase(phase);
        return next;
    }

    public clone(): OrderBuilderState {
        return new OrderBuilderState(
            [...this.slideStack], 
            [...this.phraseStack], 
            [...this.phaseStack],
            this.isCuratedOption, 
            this.sizeByWord);
    }

    public getPhase(): string {
        if (!this.phaseStack.length) throw new Error("could not get phase, phase stack empty");
        return this.phaseStack[this.phaseStack.length - 1];
    }

    public getPhrase(): string {
        if (!this.phraseStack.length) throw new Error("could not get phrase, phrase stack empty");
        return this.phraseStack[this.phraseStack.length - 1];
    }

    public getPrevSlideName(): string {
        if (this.slideStack.length < 2) throw new Error("could not get prev slide name, prev slide does not exist");
        return this.slideStack[this.slideStack.length-2].name;
    }

    public static new(isCurated: boolean): OrderBuilderState {
        if (isCurated) {
            return new OrderBuilderState(
                [new OrderBuilderOptionsSlide("phrase", "choose a phrase", PHRASES)],
                [],
                [OrderBuilderPhases.BASE_PHRASE],
                true,
            );
        } else {
            return new OrderBuilderState(
                [new OrderBuilderTextInputSlide("phrase", "customize your word combo")],
                [],
                [OrderBuilderPhases.BASE_PHRASE],
                false,
            );
        }
    }

    private addNextSlideAndPhase(lastPhase: OrderBuilderPhase) {
        if (lastPhase === OrderBuilderPhases.SIZES) return;
        if (lastPhase === OrderBuilderPhases.BASE_PHRASE) {
            if (this.isCuratedOption) {
                const variants = variantsByBasePhrase(this.getPhrase());
                if (variants.length) {
                    this.slideStack.push(new OrderBuilderOptionsSlide(
                        "variant",
                        "choose a variant",
                        variants
                    ));
                    this.phaseStack.push(OrderBuilderPhases.VARIANT);
                } else {
                    this.addNextSlideAndPhase(OrderBuilderPhases.VARIANT);
                }
            } else {
                // NOTE: this should always fall through to adding a size slide 
                //       bc templates are santized before making it into this state
                this.addNextSlideAndPhase(OrderBuilderPhases.PLACEHOLDERS);
            }
        } else if (lastPhase === OrderBuilderPhases.VARIANT ||
            lastPhase === OrderBuilderPhases.PLACEHOLDERS) {

            // check for remaining placeholders
            const placeholders = placeholdersByPhrase(this.getPhrase());
            if (placeholders.length) {
                const prompt = promptByPlaceholder(placeholders[0]);
                this.slideStack.push(new OrderBuilderTextInputSlide(
                    placeholders[0],
                    prompt
                ));
                this.phaseStack.push(OrderBuilderPhases.PLACEHOLDERS);
            } else {
                this.slideStack.push(new OrderBuilderSizerSlide(
                    "sizes",
                    "choose the word sizes",
                    this.getPhrase().split(" ")
                ));
                this.phaseStack.push(OrderBuilderPhases.SIZES);
            }
        }
    }
}

export function orderBuilderStateReducer(last: OrderBuilderState, action: OrderBuilderAction): OrderBuilderState {
    return last.reduce(action);
}