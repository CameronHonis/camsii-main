export const PHRASES = ["mr & mrs", "marry me", "new years", "be mine", "the [last_name]s", "bride to be", "class of 2025", "you & me", "sweet 16", "happy bday", "forever"] as const;
export const VARIANTS_BY_PHRASE = {
    "mr & mrs": ["mr & mrs", "mr and mrs"],
    "marry me": ["marry me", "marry me?", "will you marry me", "will you marry me?"],
    "new years": ["new years", "happy new years", "to the new years", "new year", "happy new year"],
    "be mine": ["be mine", "be mine?", "will you be mine", "will you be mine?"],
    "class of 2025": ["class of 2025", "class 2025"],
    "you & me": ["you & me", "you and me"],
    "happy bday": ["happy bday", "happy birthday", "birthday"],
};