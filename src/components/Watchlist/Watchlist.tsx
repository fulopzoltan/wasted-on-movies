import React, { useEffect, useState } from 'react';
import FirebaseAPI from '../../utils/FirebaseAPI';
import { useAuth } from '../../providers/AuthContext';
import { useLoading } from '../../providers/LoadingContext';
import { NoWatchlistEntry, WatchlistWrapper } from './Watchlist.css';
import WatchlistItem from './WatchlistItem';
import { WOMButton } from '../CustomComponents/CustomComponents';
import { Search } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState<any[] | null>(null);
    const { token } = useAuth();
    const { setLoading } = useLoading();
    const history = useHistory();

    useEffect(() => {
        loadWatchlist();
    }, []);

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
    const renderWatchlistEntries = () => watchlist?.map((entry) => <WatchlistItem key={entry.id} entry={entry} />);
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
