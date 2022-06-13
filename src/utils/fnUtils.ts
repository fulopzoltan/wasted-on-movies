import { AssetEntry } from '../types/AssetEntry';

export const calculateRuntimeForAssetEntry = (entry: AssetEntry) => {
    if (entry.type === 'movie') return entry.runtime;
    let sum = 0;
    entry.seasons.forEach((season: any) =>
        season.episodes.forEach((episode: any) => {
            if (episode.watched) sum += episode.runtime;
        })
    );
    return sum;
};
