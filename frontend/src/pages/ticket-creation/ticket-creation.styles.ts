import { motion } from 'framer-motion';
import { GoDotFill } from 'react-icons/go';
import styled from 'styled-components';
import { CustomInput } from '../../components/input/Input.component';

export const PageContainer = styled(motion.div)`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #FCFBFB;
    width: min(100%, 1150px);
    margin: 0 auto;
    gap: 0.5rem;
`;
export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    padding: 2rem 0;
`;
export const StatusIcon = styled(GoDotFill)<{ color?: string }>`
    position: absolute;
    left: 1%;
    top: 50%;
    color: ${(props) => props.color};
`;
const hexToRgb = (hex: string | undefined) => {
    if (!hex) {
        return;
    }
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
};
export const StatusInput = styled(CustomInput)<{ color?: string }>`
    background-color: rgba(${(props) => hexToRgb(props.color)}, 0.2);
    font-size: 0.9rem;
    padding-left: 36px;
`;

export const StatusContainer = styled(motion.ul)`
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    z-index: 10;
    width: 100%;
    box-shadow: 0 0 20px 10px rgb(99, 102, 241, 0.075);
    border-bottom-left-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
    border: 1px solid var(--gray-300);
    padding: 0.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
`;

export const StatusItem = styled(motion.li)<{ width?: string }>`
    transition: background-color 0.15s ease-in-out;
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 0.25rem;
    padding: 0.5rem;
    margin: 0.125rem 0.35rem;
    font-size: 0.9rem;
    &:hover {
        background-color: var(--slate-50);
        color: black;
    }
`;
export const SectionContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;