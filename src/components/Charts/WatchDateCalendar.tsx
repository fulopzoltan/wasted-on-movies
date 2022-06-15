import React, { FC } from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';
import { theme } from '../../utils/theme';

const WatchDateCalendar: FC<{ data: any }> = ({ data }) => {
    return (
        <ResponsiveCalendar
            data={data}
            theme={calenderTheme}
            colors={['#e50914', '#ce0812', '#b70710', '#a0060e', '#89050c']}
            emptyColor="#eeeeee"
            from="2022-01-01"
            to="2022-12-31"
            dayBorderWidth={2}
            monthBorderWidth={2}
            margin={{ top: 30, bottom: 30 }}
        />
    );
};

export default WatchDateCalendar;

const calenderTheme = {
    textColor: theme.text.white,
    fontSize: 13
};
