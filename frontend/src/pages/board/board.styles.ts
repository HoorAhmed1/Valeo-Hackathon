import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export const PageContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 0 0 0 30px;
    background-color: #F3F4F8;
    margin: 0;
    gap: 25px;
`;
const commonInputStyles = css`
  width: 100%;
display: flex;
padding-right: 18px;
padding-left:18px;
background: #FCFBFB;

`;
export const NavBar =styled.nav`
${commonInputStyles}
align-items: center;
flex-direction: row;
justify-content: space-between; 
height: 70px;
border-radius: 0px 0px 0px 18px;
`
export const PersonProfile =styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    aspect-ratio: 1/1;
`

export const Holder =styled.div`
height: 17%;
${commonInputStyles}
align-items: center;
flex-direction: row;
border-radius: 18px 0px 0px 18px;
`
export const DataContainer =styled.div`
flex:1;
${commonInputStyles}
border-radius: 18px 0px 0px 0px;
`
export const SearchBar = styled.div`
    display: flex;
    align-items: center;
    gap: 0.3rem;
    width: 100%;
    padding: 0.3rem;
    margin-bottom:0.3rem;
    padding-left: 0.5rem;
    border-radius: 9px;
    border: 2px solid #A9A8A8;
    input {
        font-size: 0.875rem;
        margin-left: 8px;
        margin-right: 4px;
        background: transparent;
        outline: none;
        border: none;
        flex: 1;
    }
`;