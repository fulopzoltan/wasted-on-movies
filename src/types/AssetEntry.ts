export type AssetEntry = {
    type: 'series' | 'movie';
    rating?: 'LIKE' | 'DISLIKE';
    watchDate?: string;
    seasons?: any[];
} & any;
