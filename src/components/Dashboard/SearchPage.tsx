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
    SearchFieldWrapper
} from './SearchPage.css';
import { IconButton, InputAdornment } from '@material-ui/core';
import { WOMButton, WOMTextField } from '../CustomComponents/CustomComponents';
import TheTVDBApi from '../../api/TheTVDBApi';
import { useLoading } from '../../providers/LoadingContext';
import ContentCard from '../ContentCard/ContentCard';
import { AddTask, Search } from '@mui/icons-material';
import { ArrowBackIos } from '@material-ui/icons';
import { theme } from '../../utils/theme';

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState<any | null>(null);
    const [assetToLoad, setAssetToLoad] = useState<{ type?: 'movie' | 'series'; id?: string }>({});
    const [assetToView, setAssetToView] = useState<any>(null);
    const { setLoading, loading } = useLoading();

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
    const renderDetailView = () => {
        if (!assetToView) return;
        const overview =
            assetToView.overview ||
            assetToView?.translations?.overviewTranslations?.find((o: any) => o.language === 'eng').overview ||
            '[no-data]';
        const genres = assetToView.genres.map((genre: any) => genre.name);
        return (
            <DetailViewWrapper>
                <IconButton
                    onClick={() => {
                        setAssetToView(null);
                        setView('SEARCH');
                    }}
                    style={{ width: '30px', position: 'absolute', left: 0, top: '50%' }}
                >
                    <ArrowBackIos style={{ color: theme.text.white }} />
                </IconButton>
                <section>
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
                        <WOMButton kind={'PRIMARY'} text={'Add to my watchlist'} startIcon={<AddTask />} />
                    </RightSection>
                </section>
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
