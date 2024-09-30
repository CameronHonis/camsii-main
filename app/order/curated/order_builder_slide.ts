export class OrderBuilderSlide {
    name: string;
    prompt: string;

    constructor(name: string, prompt: string) {
        this.name = name;
        this.prompt = prompt;
    }
}

export class OrderBuilderOptionsSlide extends OrderBuilderSlide {
    options: string[];

    constructor(name: string, prompt: string, options: string[]) {
        super(name, prompt);
        this.options = options;
    }
}

export class OrderBuilderTextInputSlide extends OrderBuilderSlide {
    constructor(name: string, prompt: string) {
        super(name, prompt);
    }
}

export class OrderBuilderSizerSlide extends OrderBuilderSlide {
    words: string[];

    constructor(name: string, prompt: string, words: string[]) {
        super(name, prompt);
        this.words = words;
    }
}