import { motion } from 'framer-motion';
import styled from 'styled-components';

export const PageContainer = styled(motion.div)`
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--indigo-50);
    width: min(100%, 1200px);
    margin: 0 auto;
    gap: 0.5rem;
`;