import styled from "styled-components";
import { CSSTextLengthLimit, CSSTextLinesCountLimit } from '../../index.styles';
import { FaFlag } from "react-icons/fa";

export const CardContainer = styled.div`
    padding: 1rem;
    width: 100%;
    display: flex;
    gap: 15px;
    background-color:#FCFBFB;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    transition: all 0.25s ease-in-out;
    border-radius: 4px;
    &:hover {
        background-color: white;
    }
`;

export const TicketTitle = styled.h1<{ lines?: number }>`
    hyphens: auto;
    font-size: 0.95rem;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -1px;
    ${CSSTextLinesCountLimit}
    @media (max-width: 768px) {
        font-size: 1.25rem;
    }
`;

export const TicketText = styled.p<{ lines?: number }>`
    line-height: 1.5;
    ${CSSTextLinesCountLimit}
`;
export const PersonProfile =styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    aspect-ratio: 1/1;
    cursor: pointer;

`
export const PriorityFlag =styled(FaFlag)<{ color?: string }>`
    width: 25px;
    height: 25px;
    aspect-ratio: 1/1;
    cursor: pointer;
    color: ${(props) => props.color};

`