import styled from 'styled-components';

export const AccordionContainer = styled.div`
    width: 100%;
    border-radius: 10px;
    padding-top:20px;
`;

export const AccordionHeader = styled.header<{ isOpen?: boolean }>`
    cursor: pointer;
    padding-bottom:20px;
    color: var(--gray-700);
    border-radius: ${(props) => (props.isOpen ? '10px 10px 0 0' : '10px')};
    font-size: 1.2rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap:10px;
    justify-content: flex-start;
    user-select: none;
`;

export const AccordionContent = styled.main`
    font-size: 1rem;
    position: relative;
    display: grid;
    gap: 2rem;
    width:100%;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    max-height: 50vh;
    overflow-y: auto;
    @media (max-width: 1024px) {
    overflow-x: auto;
    }
`;
