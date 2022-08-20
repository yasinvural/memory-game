export type CardType = {
    index: number;
    value: number;
    reveal: boolean;
    matched: boolean;
    cardRevealHandler: (index: number) => {}
};
