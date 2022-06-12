import React, { FC, useState } from 'react';
import { ExpandedContainer, ExpandIconHolder, ItemTopSection, WatchlistItemWrapper } from './Watchlist.css';
import { AssetEntry } from '../../types/AssetEntry';
import { ExpandLess, ExpandMore, RemoveCircle } from '@material-ui/icons';
import {
    AssetGenre,
    AssetName,
    AssetOverview,
    AssetRuntime,
    GenreWrapper,
    RightSection
} from '../Dashboard/SearchPage.css';
import { WOMButton } from '../CustomComponents/CustomComponents';
import { useConfirm } from 'material-ui-confirm';
import { useLoading } from '../../providers/LoadingContext';
import FirebaseAPI from '../../utils/FirebaseAPI';
import { useAuth } from '../../providers/AuthContext';
import { useNotification } from '../../providers/NotificationContext';

const WatchlistItem: FC<{ entry: AssetEntry }> = ({ entry }) => {
    const [assetEntry, setAssetEntry] = useState<AssetEntry>(entry);
    const [expanded, setExpanded] = useState(false);
    const [hoveringItem, setHoveringItem] = useState(false);
    const confirm = useConfirm();
    const { setLoading } = useLoading();
    const { token } = useAuth();
    const { setNotification } = useNotification();

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
                } catch (ex) {
                    console.error(ex);
                    setLoading(false);
                }
            })
            .catch(() => {
                /* ... */
            });
    };

    return (
        <WatchlistItemWrapper
            expanded={expanded}
            onMouseEnter={() => setHoveringItem(true)}
            onMouseLeave={() => setHoveringItem(false)}
        >
            {/*{hoveringItem && entry.type === 'series' && (*/}
            {/*    <ExpandIconHolder onClick={() => setExpanded(!expanded)}>*/}
            {/*        {expanded ? <ExpandLess /> : <ExpandMore />}*/}
            {/*    </ExpandIconHolder>*/}
            {/*)}*/}
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

                    <AssetRuntime>
                        {assetEntry.averageRuntime ? 'AVG. ' : ''}
                        {assetEntry.runtime || assetEntry.averageRuntime} MIN
                    </AssetRuntime>
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
            <ExpandedContainer expanded={expanded} />
        </WatchlistItemWrapper>
    );
};

export default WatchlistItem;
