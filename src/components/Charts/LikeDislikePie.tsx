import React, { FC } from 'react';
import { theme } from '../../utils/theme';
import { ResponsivePie } from '@nivo/pie';
import { chartTheme } from './GenresCirclePacking';

const LikeDislikePie: FC<{ data: any }> = ({ data }) => {
    return (
        <ResponsivePie
            data={data}
            theme={{ textColor: theme.text.white }}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={theme.text.white}
            arcLinkLabelsThickness={2}
            arcLabelsSkipAngle={10}
            colors={{ datum: 'data.color' }}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: theme.text.white,
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 14,
                    symbolShape: 'circle'
                }
            ]}
        />
    );
};

export default LikeDislikePie;
