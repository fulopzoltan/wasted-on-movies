import { AssetEntry } from '../types/AssetEntry';
import { theme } from './theme';

const AVG_TIME_TO_READ_A_BOOK = 498;
const AVG_TIME_TO_RUN_A_KM = 7;

export const calculateRuntimeForAssetEntry = (entry: AssetEntry) => {
    if (entry.type === 'movie') return entry.watched ? entry.runtime : 0;
    let sum = 0;
    entry.seasons.forEach((season: any) =>
        season.episodes.forEach((episode: any) => {
            if (episode.watched) sum += episode.runtime;
        })
    );
    return sum;
};

export const calculateGenresAggregate = (entries: AssetEntry[]) => {
    const genresAggregate: any = {};
    entries.forEach((entry) =>
        entry.genres.forEach((genre: any) => {
            if (!genresAggregate[genre.name]) {
                genresAggregate[genre.name] = 1;
            } else {
                genresAggregate[genre.name]++;
            }
        })
    );

    const data = {
        color: theme.text.main,
        name: 'Genres',
        children: Object.entries(genresAggregate).map(([key, value]) => ({ name: key, loc: value }))
    };
    return data;
};
export const calculateCalendarForWatchedEntries = (entries: AssetEntry[]) => {
    let dateAggregate: any = {};
    entries.forEach((entry) => {
        if (entry.type === 'movie') {
            if (!entry.watchDate) return;
            if (!dateAggregate[entry.watchDate] && entry.watched) {
                dateAggregate[entry.watchDate] = 1;
            } else {
                dateAggregate[entry.watchDate] += entry.watched ? 1 : 0;
            }
        }
        if (entry.type === 'series') {
            entry.seasons.forEach((season: any) => {
                season.episodes.forEach((episode: any) => {
                    if (!episode.watchDate) return;
                    if (!dateAggregate[episode.watchDate] && episode.watched) {
                        dateAggregate[episode.watchDate] = 1;
                    } else {
                        dateAggregate[episode.watchDate] += episode.watched ? 1 : 0;
                    }
                });
            });
        }
    });
    const data = Object.entries(dateAggregate)
        .map(([key, value]) => ({ value: value, day: key }))
        .filter((d) => d.day !== undefined);
    return data;
};

export const calculateLikeDislike = (entries: AssetEntry[]) => {
    const like = {
        id: 'Like',
        label: 'Like',
        value: 0,
        color: '#095000'
    };
    const dislike = {
        id: 'Dislike',
        label: 'Dislike',
        value: 0,
        color: theme.text.main
    };
    entries.forEach((entry) => {
        if (entry.rating === 'LIKE') like.value++;
        if (entry.rating === 'DISLIKE') dislike.value++;
    });
    return [like, dislike];
};

export const getTodayDateString = () => {
    const today = new Date();
    const month = today.getMonth() + 1 >= 10 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`;
    const day = today.getDate() >= 10 ? today.getDate() : `0${today.getDate() + 1}`;
    const date = today.getFullYear() + '-' + month + '-' + day;
    return date;
};
