import React, { useEffect, useState } from 'react';
import { AnalyticsWrapper, ChartTitle, ChartWrapper, WatchtimesHolder } from './Analytics.css';
import {
    calculateCalendarForWatchedEntries,
    calculateGenresAggregate,
    calculateLikeDislike,
    calculateRuntimeForAssetEntry
} from '../../utils/fnUtils';
import FirebaseAPI from '../../api/FirebaseAPI';
import { useAuth } from '../../providers/AuthContext';
import { useLoading } from '../../providers/LoadingContext';
import { Watchtime } from '../Analytics/Analytics.css';
import { ArrowCircleRight } from '@mui/icons-material';
import GenresCirclePacking from '../Charts/GenresCirclePacking';
import { theme } from '../../utils/theme';
import WatchDateCalendar from '../Charts/WatchDateCalendar';
import { NoWatchlistEntry } from '../Watchlist/Watchlist.css';
import { WOMButton } from '../CustomComponents/CustomComponents';
import { Search } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import LikeDislikePie from '../Charts/LikeDislikePie';

const Analytics = () => {
    const [watchlist, setWatchlist] = useState<any[] | null>(null);
    const history = useHistory();

    const { token } = useAuth();
    const { setLoading } = useLoading();

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
    const calculateWatchtime = () => {
        let watchTime = 0;
        watchlist?.forEach((entry) => (watchTime += calculateRuntimeForAssetEntry(entry)));
        return watchTime;
    };
    const renderGenresTreeMapChart = () => (
        <ChartWrapper>
            <ChartTitle>Distribution on Genres</ChartTitle>
            <GenresCirclePacking data={calculateGenresAggregate(watchlist || [])} />
        </ChartWrapper>
    );
    const renderWatchCalendar = () => (
        <ChartWrapper style={{ width: '70%', height: '300px' }}>
            <ChartTitle>Watch Calendar</ChartTitle>
            <WatchDateCalendar data={calculateCalendarForWatchedEntries(watchlist || [])} />
        </ChartWrapper>
    );
    const renderLikeDislikePie = () => (
        <ChartWrapper>
            <ChartTitle>Like/Dislike ratio</ChartTitle>
            <LikeDislikePie data={calculateLikeDislike(watchlist || [])} />
        </ChartWrapper>
    );

    const renderWatchtimes = () => {
        const minutes = calculateWatchtime();
        const hours = Math.round((minutes / 60) * 10) / 10;
        const days = Math.round((hours / 24) * 10) / 10;
        return (
            <WatchtimesHolder>
                <Watchtime>{`Total`}</Watchtime>
                <ArrowCircleRight />
                <Watchtime>
                    {`${minutes}`}
                    <br />
                    <span>minutes</span>
                </Watchtime>

                <ArrowCircleRight />
                <Watchtime>
                    {`${hours}`}
                    <br />
                    <span>hours</span>
                </Watchtime>
                <ArrowCircleRight />
                <Watchtime>
                    {`${days}`}
                    <br />
                    <span>days</span>
                </Watchtime>
            </WatchtimesHolder>
        );
    };
    if (!watchlist?.length) {
        const renderEmptyWatchlist = () => (
            <NoWatchlistEntry>
                Please add movies/series to your watchlist in order to generate Analytics
                <WOMButton
                    kind={'PRIMARY'}
                    text={'Go to search'}
                    startIcon={<Search />}
                    onClick={() => history.push('/search')}
                />
            </NoWatchlistEntry>
        );
        return renderEmptyWatchlist();
    }
    return (
        <AnalyticsWrapper>
            {renderWatchtimes()}
            {renderWatchCalendar()}
            {renderLikeDislikePie()}
            {renderGenresTreeMapChart()}
        </AnalyticsWrapper>
    );
};

export default Analytics;
