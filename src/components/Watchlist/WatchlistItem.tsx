import React, { FC, useEffect, useState } from 'react';
import {
    RuntimeActionHolder,
    EpisodeContainer,
    EpisodeInfo,
    EpisodeName,
    EpisodeOverview,
    ExpandedContainer,
    ExpandIconHolder,
    ItemTopSection,
    SeasonContainer,
    SeasonSelectHolder,
    WatchlistItemWrapper,
    LikeButton,
    DislikeButton,
    TopRightActions
} from './Watchlist.css';
import { AssetEntry } from '../../types/AssetEntry';
import { ExpandLess, ExpandMore, RemoveCircle, SaveAlt } from '@material-ui/icons';
import {
    AssetGenre,
    AssetName,
    AssetOverview,
    AssetRuntime,
    GenreWrapper,
    RightSection
} from '../Dashboard/SearchPage.css';
import { WOMButton, WOMCheckbox, WOMDatePicker, WOMSelect } from '../CustomComponents/CustomComponents';
import { useConfirm } from 'material-ui-confirm';
import { useLoading } from '../../providers/LoadingContext';
import FirebaseAPI from '../../utils/FirebaseAPI';
import { useAuth } from '../../providers/AuthContext';
import { useNotification } from '../../providers/NotificationContext';
import _ from 'lodash';
import { Radio } from '@material-ui/core';
import { ThumbDown, ThumbUp } from '@mui/icons-material';
import { getTodayDateString } from '../../utils/fnUtils';

const WatchlistItem: FC<{
    entry: AssetEntry;
    expanded: boolean;
    onSave: () => void;
    onExpand: () => void;
    onDelete: () => void;
}> = ({ entry, expanded, onExpand, onSave, onDelete }) => {
    const [assetEntry, setAssetEntry] = useState<AssetEntry>();
    const [seasonOptions, setSeasonOptions] = useState<any>([]);
    const [selectedSeason, setSelectedSeason] = useState<any>({});
    const confirm = useConfirm();
    const { setLoading } = useLoading();
    const { token } = useAuth();
    const { setNotification } = useNotification();

    // Returns false if there are unsaved changes
    const checkUnsaved = () => {
        return _.isEqual(assetEntry, entry);
    };
    const handleEpisodeCheck = (seasonNumber: number, episodeId: number) => {
        const newEntry = { ...assetEntry };
        const season = newEntry.seasons.find((season: any) => season.number === seasonNumber);
        const episode = season.episodes.find((episode: any) => episode.id === episodeId);
        episode.watched = !episode.watched;
        if (episode.watched) episode.watchDate = getTodayDateString();
        //if all episodes check, check season
        const seasonCheck = season.episodes.every((episode: any) => episode.watched);
        season.watched = seasonCheck;
        //if all seasons check, check entry
        const entryCheck = newEntry.seasons.every((season: any) => season.watched);
        newEntry.watched = entryCheck;
        setAssetEntry(newEntry);
    };
    const handleSeasonCheck = (seasonNumber: number) => {
        const newEntry = { ...assetEntry };
        const season = newEntry.seasons.find((season: any) => season.number === seasonNumber);
        season.watched = !season.watched;
        season.episodes.forEach((episode: any) => {
            episode.watched = season.watched;
            if (episode.watched) episode.watchDate = getTodayDateString();
        });
        const entryCheck = newEntry.seasons.every((season: any) => season.watched);
        newEntry.watched = entryCheck;
        setAssetEntry(newEntry);
    };

    const handleEntryCheck = () => {
        const newEntry = { ...assetEntry };
        newEntry.watched = !newEntry.watched;
        if (newEntry.type === 'series') {
            newEntry.seasons.forEach((season: any) => {
                season.watched = newEntry.watched;
                season.episodes.forEach((episode: any) => {
                    episode.watched = newEntry.watched;
                    if (episode.watched) episode.watchDate = getTodayDateString();
                });
            });
            const entryCheck = newEntry.seasons.every((season: any) => season.watched);
            newEntry.watched = entryCheck;
        }
        setAssetEntry(newEntry);
    };

    useEffect(() => {
        setAssetEntry(_.cloneDeep(entry));
        const options =
            entry.seasons?.map((season: any) => ({
                label: `Season ${season.number}`,
                value: season.number
            })) || [];
        setSeasonOptions(options);
        setSelectedSeason(options[0]);
    }, [entry]);

    const handleRemoveClick = () => {
        confirm({
            title: 'Are you sure?',
            description: `If you press delete, ${assetEntry.name} will be removed from your watchlist`
        })
            .then(async () => {
                try {
                    setLoading(true);
                    await FirebaseAPI.deleteWatchlistEntry(token, entry.id);
                    setNotification({
                        open: true,
                        type: 'success',
                        message: `${entry.name} was successfully removed from your watchlist!`
                    });
                    setLoading(false);
                    onDelete();
                } catch (ex) {
                    console.error(ex);
                    setLoading(false);
                }
            })
            .catch(() => {
                /* ... */
            });
    };
    const handleSaveClick = async () => {
        try {
            setLoading(true);
            const response = await FirebaseAPI.updateWatchlistEntry(token, assetEntry);
            setLoading(false);
            onSave();
        } catch (ex) {
            setLoading(false);
            setNotification({ open: true, type: 'error', message: 'Update failed!' });
        }
    };
    const handleDateChange = (type: 'series' | 'movie', newDate: string, seasonNumber?: number, episodeId?: number) => {
        const newEntry = { ...assetEntry };
        if (type === 'movie') {
            newEntry.watchDate = newDate;
        }
        if (type === 'series') {
            const season = newEntry.seasons.find((season: any) => season.number === seasonNumber);
            const episode = season.episodes.find((episode: any) => episode.id === episodeId);
            episode.watchDate = newDate;
        }
        setAssetEntry(newEntry);
    };
    const renderSelectedSeason = () => {
        if (assetEntry.type === 'movie') return;
        const season = assetEntry.seasons.find((season: any) => season.number === selectedSeason?.value);
        if (!season) return;
        return season.episodes.map((episode: any) => (
            <EpisodeContainer key={episode.id}>
                <img src={episode.image} width={166} height={110} />
                <EpisodeInfo>
                    <EpisodeName>{episode.name}</EpisodeName>
                    <EpisodeOverview>{episode.overview}</EpisodeOverview>
                    <RuntimeActionHolder>
                        <AssetRuntime>{`${episode.runtime} min`}</AssetRuntime>
                        <WOMCheckbox
                            checked={episode.watched}
                            onClick={() => handleEpisodeCheck(selectedSeason.value, episode.id)}
                            label={'Watched'}
                        />
                        <WOMDatePicker
                            value={episode.watchDate}
                            disabled={!episode.watched}
                            onChange={(evt) =>
                                handleDateChange(assetEntry.type, evt.target.value, season.number, episode.id)
                            }
                        />
                    </RuntimeActionHolder>
                </EpisodeInfo>
            </EpisodeContainer>
        ));
    };
    const isSeasonWatched = () => {
        if (assetEntry.type === 'movie') return;
        const season = assetEntry.seasons.find((season: any) => season.number === selectedSeason?.value);
        return season.watched;
    };
    if (!assetEntry) return null;
    return (
        <WatchlistItemWrapper expanded={expanded}>
            <TopRightActions>
                {!checkUnsaved() && (
                    <WOMButton
                        startIcon={<SaveAlt />}
                        kind={'PRIMARY'}
                        text={'Save changes'}
                        onClick={() => handleSaveClick()}
                    />
                )}
                {entry.type === 'series' && (
                    <ExpandIconHolder
                        onClick={() => {
                            onExpand();
                        }}
                    >
                        {expanded ? (
                            <>
                                Collapse
                                <ExpandLess />
                            </>
                        ) : (
                            <>
                                Expand
                                <ExpandMore />
                            </>
                        )}
                    </ExpandIconHolder>
                )}
            </TopRightActions>

            <ItemTopSection>
                <img src={assetEntry.image} width={220} height={336} />
                <RightSection>
                    <AssetName>{assetEntry.name}</AssetName>
                    <AssetOverview>{assetEntry.overview}</AssetOverview>
                    <GenreWrapper>
                        {assetEntry.genres.map((g: any, index: number) => (
                            <AssetGenre key={`genre_${index}`}>{g.name}</AssetGenre>
                        ))}
                    </GenreWrapper>
                    <RuntimeActionHolder>
                        <AssetRuntime>
                            {assetEntry.averageRuntime ? 'AVG. ' : ''}
                            {assetEntry.runtime || assetEntry.averageRuntime} MIN
                        </AssetRuntime>
                        <WOMCheckbox
                            label={`${_.upperFirst(assetEntry.type)} Watched`}
                            checked={assetEntry.watched}
                            onClick={() => handleEntryCheck()}
                        />
                        {assetEntry.type === 'movie' && (
                            <WOMDatePicker
                                disabled={!assetEntry.watched}
                                value={assetEntry.watchDate}
                                onChange={(evt) => handleDateChange(assetEntry.type, evt.target.value)}
                            />
                        )}
                        <LikeButton>
                            <Radio
                                name="rating"
                                icon={<ThumbUp />}
                                checkedIcon={<ThumbUp />}
                                checked={assetEntry.rating === 'LIKE'}
                                onClick={() => {
                                    const newEntry = { ...assetEntry };
                                    newEntry.rating = 'LIKE';
                                    setAssetEntry(newEntry);
                                }}
                            />
                        </LikeButton>
                        <DislikeButton>
                            <Radio
                                name="rating"
                                icon={<ThumbDown />}
                                checkedIcon={<ThumbDown />}
                                checked={assetEntry.rating === 'DISLIKE'}
                                onClick={() => {
                                    const newEntry = { ...assetEntry };
                                    newEntry.rating = 'DISLIKE';
                                    setAssetEntry(newEntry);
                                }}
                            />
                        </DislikeButton>
                    </RuntimeActionHolder>

                    <WOMButton
                        kind={'PRIMARY'}
                        text={'Remove from watchlist'}
                        startIcon={<RemoveCircle />}
                        onClick={() => {
                            handleRemoveClick();
                        }}
                    />
                </RightSection>
            </ItemTopSection>
            {expanded && (
                <ExpandedContainer expanded={expanded}>
                    <SeasonSelectHolder>
                        <WOMSelect
                            value={selectedSeason}
                            options={seasonOptions}
                            onChange={(newOption: any) => setSelectedSeason(newOption)}
                        />
                        <WOMCheckbox
                            label={'Season Watched'}
                            checked={isSeasonWatched()}
                            onClick={() => handleSeasonCheck(selectedSeason.value)}
                        />
                    </SeasonSelectHolder>
                    <SeasonContainer>{renderSelectedSeason()}</SeasonContainer>
                </ExpandedContainer>
            )}
        </WatchlistItemWrapper>
    );
};

export default WatchlistItem;
