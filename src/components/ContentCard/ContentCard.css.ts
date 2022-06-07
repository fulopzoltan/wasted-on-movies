import styled from 'styled-components';

export const CardActions = styled.div`
    position: absolute;
    transition: all ease-in-out 330ms;
    background-color: rgba(18, 18, 18, 0.75);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
`;
export const ContentCardWrapper = styled.div`
    position: relative;
    width: 340px;
    img {
        width: 340px;
        height: 500px;
    }

    &:hover {
        cursor: pointer;
        ${CardActions} {
            opacity: 1;
        }
    }
`;

export const CardName = styled.div`
    font-size: 18px;
    font-weight: bold;
`;
export const CardOverview = styled.div``;
