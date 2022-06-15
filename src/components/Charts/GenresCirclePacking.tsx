import React, { FC } from 'react';
import { ResponsiveCirclePacking } from '@nivo/circle-packing';
import { theme } from '../../utils/theme';

const GenresCirclePacking: FC<{ data: any }> = ({ data }) => {
    return (
        <ResponsiveCirclePacking
            leavesOnly={true}
            theme={chartTheme}
            data={data}
            id={'name'}
            value={'loc'}
            borderColor={theme.background.main}
            colors={['#e50914', '#ce0812', '#b70710', '#a0060e', '#89050c']}
            labelTextColor={theme.text.white}
            enableLabels={true}
            padding={2}
            colorBy={'id'}
        />
    );
};

export const chartTheme = {
    textColor: theme.text.white
};

export default GenresCirclePacking;
