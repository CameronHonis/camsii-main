import { LetterSize } from "@/app/models/letter_size";

export type OrderBuilderAction = OrderBuilderSelectOption | OrderBuilderSubmitText | OrderBuilderSelectSizes | OrderBuilderBack;

export class OrderBuilderSelectOption {
    option: string;

    constructor(option: string) {
        this.option = option;
    }
}

export class OrderBuilderSubmitText {
    textInput: string;

    constructor(textInput: string) {
        this.textInput = textInput;
    }
}

export class OrderBuilderSelectSizes {
    sizeByWord: Record<string, LetterSize>;

    constructor(sizeByWord: Record<string, LetterSize>) {
        this.sizeByWord = sizeByWord;
    }
}

export class OrderBuilderBack {
    constructor() { }
}
