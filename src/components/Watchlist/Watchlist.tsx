import React, { useEffect, useState } from 'react';
import FirebaseAPI from '../../utils/FirebaseAPI';
import { useAuth } from '../../providers/AuthContext';
import { useLoading } from '../../providers/LoadingContext';
import { NoWatchlistEntry, WatchlistWrapper } from './Watchlist.css';
import WatchlistItem from './WatchlistItem';
import { WOMButton, WOMTextField } from '../CustomComponents/CustomComponents';
import { Search } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { IconButton, InputAdornment } from '@material-ui/core';
import { FilterAlt } from '@mui/icons-material';

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState<any[] | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [expanded, setExpanded] = useState<any>({});
    const { token } = useAuth();
    const { setLoading } = useLoading();
    const history = useHistory();

    useEffect(() => {
        loadWatchlist();
    }, []);
    useEffect(() => {
        const initExpanded: any = {};
        watchlist?.forEach((_, index) => (initExpanded[index] = false));
    }, [watchlist]);
    const updateExpandedIndex = (index: number) => {
        const newExpanded = { ...expanded };
        Object.keys(newExpanded).forEach((key) => (newExpanded[key] = false));
        newExpanded[index] = !expanded[index];
        setExpanded(newExpanded);
    };
    const loadWatchlist = async () => {
        try {
            setLoading(true);
            const response = await FirebaseAPI.getWatchlist(token);
            setWatchlist(response.data);
            setLoading(false);
        } catch (ex) {
            setLoading(false);
            setWatchlist([]);
            console.error(ex);
        }
    };
    const renderWatchlistEntries = () => (
        <>
            <WOMTextField
                value={searchTerm}
                onChange={(evt) => setSearchTerm(evt.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position={'start'}>
                            <IconButton>
                                <FilterAlt />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                placeholder={'Filter by name...'}
            />
            {watchlist
                ?.filter((entry) => entry.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
                .map((entry, index) => (
                    <WatchlistItem
                        key={entry.id}
                        entry={entry}
                        expanded={expanded[index]}
                        onDelete={() => loadWatchlist()}
                        onSave={() => loadWatchlist()}
                        onExpand={() => updateExpandedIndex(index)}
                    />
                ))}
        </>
    );

    const renderEmptyWatchlist = () => (
        <NoWatchlistEntry>
            It seems like your watchlist is empty
            <WOMButton
                kind={'PRIMARY'}
                text={'Go to search'}
                startIcon={<Search />}
                onClick={() => history.push('/search')}
            />
        </NoWatchlistEntry>
    );

    return (
        <WatchlistWrapper>
            {watchlist?.length !== 0 ? renderWatchlistEntries() : renderEmptyWatchlist()}
        </WatchlistWrapper>
    );
};

export default Watchlist;
