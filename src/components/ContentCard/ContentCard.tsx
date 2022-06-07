import _ from 'lodash';
import React, { FC } from 'react';
import { CardOverview, CardName, ContentCardWrapper, CardActions } from './ContentCard.css';
import { WOMButton } from '../CustomComponents/CustomComponents';

const ContentCard: FC<{ poster: string; objectID?: string; name?: string; overview?: string; onDetail?: () => void }> =
    ({ poster, objectID, name, overview, onDetail }) => {
        return (
            <ContentCardWrapper onClick={() => onDetail?.()}>
                <CardActions>
                    <WOMButton kind={'DEFAULT'} text={'Deatils'} onClick={() => onDetail?.()} />
                </CardActions>
                <img src={poster} alt="poster" />
                <CardName>{name || '[no-data]'}</CardName>
                <CardOverview>{_.truncate(overview, { length: 50 }) || '[no-data]'}</CardOverview>
            </ContentCardWrapper>
        );
    };

export default ContentCard;
