import React, { FC } from 'react';
import { LoadingWrapper } from './Loading.css';

const Loading: FC<{ loading: boolean }> = ({ loading }) => {
    return loading ? (
        <LoadingWrapper>
            <div className="loading-circle-1" />
            <div className="loading-circle-2" />
        </LoadingWrapper>
    ) : null;
};

export default Loading;
