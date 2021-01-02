import React from 'react';
import styled from 'styled-components';

const StyledAlert = styled.div`
    position: fixed;
    bottom: 5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    padding: 1rem;
    border-radius: 2px;
    min-width: 20rem;
    text-align: center;
    font-weight: bold;
    font-size: 1.5rem;
    background-color: ${props => props.type === 'danger' ? 'rgb(196, 49, 12)' : 'rgb(12, 196, 12)'};
    color: #fff;

    @media (min-width: 576px) {
        bottom: unset;
        top: 5rem;
        max-width: 50rem;
    }

    @media (min-width: 992px) {
        top: 10rem;
        max-width: 80rem;
    }
`;

export const Alert = ({ message }) => {
    return (
        <StyledAlert role='alert' aria-live='assertive'>
            {message}
        </StyledAlert>
    )
}