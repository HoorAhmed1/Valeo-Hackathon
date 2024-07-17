
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const ItemContainer = styled(Link)<{ active?: boolean }>`
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1rem;
    transition: all 0.2s ease-out;
    border-radius: 0.5rem;
    background-color: ${({ active }) =>  active ? '#FAB9EF' : 'transparent'};
    border: 1px solid transparent;
    &:hover {
        background-color: rgba(255, 255, 255, 0.075);
        border-color: rgba(255, 255, 255, 0.1);
    }
    color: ${({ active }) => active ?'#FCFBFB': 'var(--slate-400)'};

`;

export const MainItemContent = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    width: 100%;
        font-size:1.2rem;
`;

export const arrowStyles = css`
    margin-left: auto;
    box-sizing: content-box;
    aspect-ratio: 1;
    transition: all 0.2s ease-out;
    opacity: 0.5;
    &:hover {
        opacity: 1;
    }
`;


