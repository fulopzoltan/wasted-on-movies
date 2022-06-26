import React, { useEffect, useState } from 'react';
import {
    AssetGenre,
    AssetName,
    AssetOverview,
    AssetRuntime,
    SearchPageWrapper,
    DetailViewWrapper,
    GenreWrapper,
    LeftSection,
    NoResult,
    RightSection,
    RecommendationsWrapper,
    SearchFieldWrapper,
    SeasonCard,
    SeasonsWrapper,
    RecommendationTitle,
    RecommendationHolder
} from './Recommendations.css';
import { IconButton, InputAdornment } from '@material-ui/core';
import { WOMButton, WOMDatePicker, WOMTextField } from '../CustomComponents/CustomComponents';
import TheTVDBApi from '../../api/TheTVDBApi';
import { useLoading } from '../../providers/LoadingContext';
import ContentCard from '../ContentCard/ContentCard';
import { AddTask, BookmarkAdd, BookmarkAdded, Search } from '@mui/icons-material';
import { ArrowBackIos, Theaters } from '@material-ui/icons';
import { theme } from '../../utils/theme';
import { AssetEntry } from '../../types/AssetEntry';
import FirebaseAPI from '../../api/FirebaseAPI';
import { useAuth } from '../../providers/AuthContext';
import { useNotification } from '../../providers/NotificationContext';
import { getTop5GenresWithWeights } from '../../utils/fnUtils';

const Recommendations = () => {
    const [topMovies, setTopMovies] = useState<any | null>(null);
    const [topSeries, setTopSeries] = useState<any | null>(null);
    const [assetToLoad, setAssetToLoad] = useState<{ type?: 'movie' | 'series'; id?: string }>({});
    const [assetToView, setAssetToView] = useState<any>(null);
    const [seasons, setSeasons] = useState<any[]>([]);
    const { setLoading, loading } = useLoading();
    const { setNotification } = useNotification();
    const { token } = useAuth();
    const [view, setView] = useState<'SEARCH' | 'DETAIL'>('SEARCH');
    const [addedIds, setAddedIds] = useState<any>([]);
    const [watchlist, setWatchlist] = useState<any>([]);
    const [genres, setGenres] = useState<any>([]);

    const [idsLoaded, setIdsLoaded] = useState(false);

    const [recommendedSeries, setRecommendedSeries] = useState<any[]>([]);
    const [recommendedMovies, setRecommendedMovies] = useState<any[]>([]);

    const getTopMovies = async () => {
        setLoading(true);
        const response: any = await TheTVDBApi.topMoviesByYear('2022');
        setTopMovies(response.status === 'success' ? response.data : []);
        setLoading(false);
    };
    const getTopSeries = async () => {
        setLoading(true);
        const response: any = await TheTVDBApi.topSeriesByYears('2022');
        setTopSeries(response.status === 'success' ? response.data : []);
        setLoading(false);
    };
    const loadWatchlist = async () => {
        try {
            const response = await FirebaseAPI.getWatchlist(token);
            setWatchlist(response.data);
        } catch (ex) {
            setWatchlist([]);
            console.error(ex);
        }
    };

    const loadGenres = async () => {
        try {
            const genres = await TheTVDBApi.getGenres();
            setGenres(genres.data);
        } catch (ex) {
            console.error(ex);
        }
    };

    useEffect(() => {
        if (!watchlist.length || !genres.length || !idsLoaded) return;
        const weightedGenres = getTop5GenresWithWeights(watchlist, 30);

        const genreIdAndCount: { [key: string]: number } = {};
        genres.forEach((genre: { id: number; name: string }) => {
            if (weightedGenres.hasOwnProperty(genre.name)) {
                genreIdAndCount[genre.id] = weightedGenres[genre.name];
            }
        });
        // Get Recommended Movies
        Promise.all(
            Object.entries(genreIdAndCount).map(([genreId, count]) =>
                TheTVDBApi.recommendedMoviesByGenre(genreId, addedIds, count)
            )
        ).then((results) => {
            const recommendedMoviesArray: any[] = [];
            results.forEach((result: any) => {
                recommendedMoviesArray.push(...result.data);
            });
            setRecommendedMovies(recommendedMoviesArray);
        });

        // Get Recommended Series
        Promise.all(
            Object.entries(genreIdAndCount).map(([genreId, count]) =>
                TheTVDBApi.recommendedSeriesByGenre(genreId, addedIds, count)
            )
        ).then((results) => {
            const recommendedSeriesArray: any[] = [];
            results.forEach((result: any) => {
                recommendedSeriesArray.push(...result.data);
            });
            setRecommendedSeries(recommendedSeriesArray);
        });
    }, [watchlist, genres, idsLoaded]);

    const loadAddedEntryIds = async () => {
        setLoading(true);
        try {
            const response: any = await FirebaseAPI.getWatchlistIds(token);
            setAddedIds(response.data);
            setIdsLoaded(true);
            setLoading(false);
        } catch (ex) {
            console.error(ex);
            setIdsLoaded(false);
            setLoading(false);
        }
    };

    const loadDetail = async () => {
        if (!assetToLoad.id || !assetToLoad.type) return;

        setLoading(true);
        let response;
        switch (assetToLoad.type) {
            case 'movie':
                response = await TheTVDBApi.getMovieById(assetToLoad.id);
                break;
            case 'series':
                response = await TheTVDBApi.getSeriesById(assetToLoad.id);
                const series: any = response?.data;
                const seasons = [...series?.seasons].filter(
                    (season) => season.type.name === 'Aired Order' && season.number !== 0
                );
                const seasonsDetailedPromises = seasons.map((season) => TheTVDBApi.getSeasonById(season.id));
                const seasonsDetailed = await Promise.all(seasonsDetailedPromises);
                setSeasons(seasonsDetailed.map((response) => response.data));
                break;
            default:
                break;
        }
        setAssetToView(response?.data);
        setLoading(false);
    };

    useEffect(() => {
        loadDetail();
        loadAddedEntryIds();
    }, [assetToLoad]);

    useEffect(() => {
        getTopMovies();
        getTopSeries();
        loadWatchlist();
        loadGenres();
    }, []);
    const renderTopMovies = () => {
        if (!topMovies) return;
        return (
            <RecommendationHolder>
                <RecommendationTitle>TOP 10 MOVIES 2022</RecommendationTitle>
                <RecommendationsWrapper>
                    {topMovies?.length === 0 && <NoResult>No result..</NoResult>}
                    {topMovies?.map((content: any) => {
                        return (
                            <ContentCard
                                key={content.id}
                                objectID={content.objectID}
                                poster={`https://artworks.thetvdb.com${content.image}`}
                                name={content.name}
                                overview={' '}
                                onDetail={() => {
                                    setView('DETAIL');
                                    setAssetToLoad({
                                        type: 'movie',
                                        id: content.id
                                    });
                                }}
                            />
                        );
                    })}
                </RecommendationsWrapper>
            </RecommendationHolder>
        );
    };

    const renderTopSeries = () => {
        if (!topSeries) return;
        return (
            <RecommendationHolder>
                <RecommendationTitle>TOP 10 SERIES 2022</RecommendationTitle>
                <RecommendationsWrapper>
                    {topSeries?.length === 0 && <NoResult>No result..</NoResult>}
                    {topSeries?.map((content: any) => {
                        return (
                            <ContentCard
                                key={content.id}
                                objectID={content.objectID}
                                poster={content.image}
                                name={content.name}
                                overview={' '}
                                onDetail={() => {
                                    setView('DETAIL');
                                    setAssetToLoad({
                                        type: 'series',
                                        id: content.id
                                    });
                                }}
                            />
                        );
                    })}
                </RecommendationsWrapper>
            </RecommendationHolder>
        );
    };

    const renderRecommendedMovies = () => {
        if (!recommendedMovies.length) return;
        return (
            <RecommendationHolder>
                <RecommendationTitle>RECOMMENDED MOVIES FOR YOU</RecommendationTitle>
                <RecommendationsWrapper>
                    {recommendedMovies?.map((content: any) => {
                        return (
                            <ContentCard
                                key={`recommended_${content.id}`}
                                objectID={content.objectID}
                                poster={`https://artworks.thetvdb.com${content.image}`}
                                name={content.name}
                                overview={' '}
                                onDetail={() => {
                                    setView('DETAIL');
                                    setAssetToLoad({
                                        type: 'movie',
                                        id: content.id
                                    });
                                }}
                            />
                        );
                    })}
                </RecommendationsWrapper>
            </RecommendationHolder>
        );
    };

    const renderRecommendedSeries = () => {
        if (!recommendedSeries.length) return;
        return (
            <RecommendationHolder>
                <RecommendationTitle>RECOMMENDED SERIES FOR YOU</RecommendationTitle>
                <RecommendationsWrapper>
                    {recommendedSeries?.map((content: any) => {
                        return (
                            <ContentCard
                                key={`recommended_${content.id}`}
                                objectID={content.objectID}
                                poster={content.image}
                                name={content.name}
                                overview={' '}
                                onDetail={() => {
                                    setView('DETAIL');
                                    setAssetToLoad({
                                        type: 'series',
                                        id: content.id
                                    });
                                }}
                            />
                        );
                    })}
                </RecommendationsWrapper>
            </RecommendationHolder>
        );
    };

    const calculateDataToSave = () => {
        const data: AssetEntry = {
            id: assetToView.id,
            name: assetToView.name,
            overview:
                assetToView.overview ||
                assetToView?.translations?.overviewTranslations?.find((o: any) => o.language === 'eng').overview ||
                '[no-overview]',
            type: assetToLoad.type,
            image: assetToView.image,
            genres: assetToView.genres,
            runtime: assetToView.runtime,
            averageRuntime: assetToView.averageRuntime,
            watched: false
        };
        if (assetToLoad.type === 'series') {
            data['seasons'] = seasons.map((season) => ({
                id: season.id,
                number: season.number,
                image: season.image,
                watched: false,
                episodes: season.episodes.map((episode: any) => ({
                    id: episode.id,
                    name: episode.name,
                    overview:
                        episode.overview ||
                        episode?.translations?.overviewTranslations?.find((o: any) => o.language === 'eng').overview ||
                        '[no-overview]',
                    number: episode.number,
                    image: episode.image,
                    runtime: episode.runtime,
                    watched: false
                }))
            }));
        }
        return data;
    };
    const addToWatchlist = async () => {
        const dataToSave = calculateDataToSave();
        setLoading(true);
        setNotification({ open: true, type: 'info', message: 'Adding to watchlist...' });
        const response = await FirebaseAPI.addToWatchlist(token, dataToSave);
        setAddedIds([`${dataToSave.id}`, ...addedIds]);
        setLoading(false);
        setNotification({ open: true, type: 'success', message: `${dataToSave.name} was added to your watchlist ` });
    };

    const renderDetailView = () => {
        if (!assetToView) return;
        const overview =
            assetToView.overview ||
            assetToView?.translations?.overviewTranslations?.find((o: any) => o.language === 'eng').overview ||
            '[no-data]';
        const genres = assetToView.genres.map((genre: any) => genre.name);
        const trailer = assetToView?.trailers?.find((trailer: any) => trailer.url);
        return (
            <DetailViewWrapper>
                <section style={{ position: 'relative', paddingLeft: '30px' }}>
                    <IconButton
                        onClick={() => {
                            setAssetToView(null);
                            setView('SEARCH');
                        }}
                        style={{ width: '30px', position: 'absolute', left: 0, top: '50%' }}
                    >
                        <ArrowBackIos style={{ color: theme.text.white }} />
                    </IconButton>
                    <LeftSection>
                        <img src={assetToView.image} width={440} height={666} />
                    </LeftSection>
                    <RightSection>
                        <AssetName>{assetToView.name}</AssetName>
                        <AssetOverview>{overview}</AssetOverview>
                        <GenreWrapper>
                            {genres.map((g: string, index: number) => (
                                <AssetGenre key={`genre_${index}`}>{g}</AssetGenre>
                            ))}
                        </GenreWrapper>

                        <AssetRuntime>
                            {assetToView.averageRuntime ? 'AVG. ' : ''}
                            {assetToView.runtime || assetToView.averageRuntime} MIN
                        </AssetRuntime>
                        <WOMButton
                            kind={'PRIMARY'}
                            text={addedIds.includes(`${assetToLoad.id}`) ? 'On your watchlist' : 'Add to my watchlist'}
                            disabled={addedIds.includes(`${assetToLoad.id}`)}
                            startIcon={addedIds.includes(`${assetToLoad.id}`) ? <BookmarkAdded /> : <BookmarkAdd />}
                            onClick={() => addToWatchlist()}
                        />
                        {trailer && (
                            <WOMButton
                                startIcon={<Theaters />}
                                kind={'DEFAULT'}
                                text={'Watch Trailer'}
                                onClick={() => window.open(trailer.url, '_blank')}
                            />
                        )}
                    </RightSection>
                </section>
                {assetToLoad.type === 'series' && (
                    <SeasonsWrapper>
                        {seasons.map((season) => (
                            <SeasonCard key={season.id}>
                                <img src={season.image} width={220} height={332} />
                                <div>Season {season.number}</div>
                                <div>({season.episodes.length} episodes)</div>
                            </SeasonCard>
                        ))}
                    </SeasonsWrapper>
                )}
            </DetailViewWrapper>
        );
    };

    return (
        <SearchPageWrapper>
            {view === 'SEARCH' && renderRecommendedMovies()}
            {view === 'SEARCH' && renderRecommendedSeries()}
            {view === 'SEARCH' && renderTopMovies()}
            {view === 'SEARCH' && renderTopSeries()}
            {view === 'DETAIL' && renderDetailView()}
        </SearchPageWrapper>
    );
};

export default Recommendations;
