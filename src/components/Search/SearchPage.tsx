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
    SearchResultWrapper,
    SearchFieldWrapper,
    SeasonCard,
    SeasonsWrapper
} from './SearchPage.css';
import { IconButton, InputAdornment } from '@material-ui/core';
import { WOMButton, WOMDatePicker, WOMTextField } from '../CustomComponents/CustomComponents';
import TheTVDBApi from '../../api/TheTVDBApi';
import { useLoading } from '../../providers/LoadingContext';
import ContentCard from '../ContentCard/ContentCard';
import { AddTask, Search } from '@mui/icons-material';
import { ArrowBackIos } from '@material-ui/icons';
import { theme } from '../../utils/theme';
import { AssetEntry } from '../../types/AssetEntry';
import FirebaseAPI from '../../utils/FirebaseAPI';
import { useAuth } from '../../providers/AuthContext';
import { useNotification } from '../../providers/NotificationContext';

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState<any | null>(null);
    const [assetToLoad, setAssetToLoad] = useState<{ type?: 'movie' | 'series'; id?: string }>({});
    const [assetToView, setAssetToView] = useState<any>(null);
    const [seasons, setSeasons] = useState<any[]>([]);
    const { setLoading, loading } = useLoading();
    const { setNotification } = useNotification();
    const { token } = useAuth();
    const [view, setView] = useState<'SEARCH' | 'DETAIL'>('SEARCH');

    const search = async () => {
        if (!searchTerm) return;
        setLoading(true);
        const response: any = await TheTVDBApi.search(searchTerm);
        setSearchResult(response.data);
        setLoading(false);
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
    }, [assetToLoad]);

    const renderSearchView = () => {
        return (
            <>
                <SearchFieldWrapper noSearch={searchResult === null}>
                    <WOMTextField
                        value={searchTerm}
                        onChange={(evt) => setSearchTerm(evt.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position={'end'}>
                                    <IconButton onClick={() => search()}>
                                        <Search />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        placeholder={'Search for movies/series...'}
                        onKeyUp={({ key }) => key === 'Enter' && search()}
                    />
                </SearchFieldWrapper>

                <SearchResultWrapper>
                    {searchResult?.length === 0 && <NoResult>No search result..</NoResult>}
                    {searchResult?.map((content: any) => (
                        <ContentCard
                            key={content.objectID}
                            objectID={content.objectID}
                            poster={content.thumbnail || content.image_url}
                            name={content.name}
                            overview={content.overview}
                            onDetail={() => {
                                setView('DETAIL');
                                setAssetToLoad({
                                    type: content.type,
                                    id: content.tvdb_id
                                });
                            }}
                        />
                    ))}
                </SearchResultWrapper>
            </>
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
                            text={'Add to my watchlist'}
                            startIcon={<AddTask />}
                            onClick={() => addToWatchlist()}
                        />
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
            {view === 'SEARCH' && renderSearchView()}
            {view === 'DETAIL' && renderDetailView()}
        </SearchPageWrapper>
    );
};

export default SearchPage;
