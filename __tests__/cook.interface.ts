export interface Cook {
    recipeName: string;
    numberOfIngredients: number;
    ownerDetails: {
        firstName: string;
        lastName: string;
    };
    ingredients: string[];

    isCooked: () => boolean;

    getCookTime: () => Promise<number>;
}
