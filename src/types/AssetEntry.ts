export type AssetEntry = {
    id: number;
    type: 'series' | 'movie';
    image?: 'string';
    rating?: 'LIKE' | 'DISLIKE';
    runtime?: number;
    averageRuntime?: number;
    genres: Genre[];
    watchDate?: string;
    seasons?: any[];
} & any;

export type Genre = {
    id: number;
    name: string;
    slug: string;
};
