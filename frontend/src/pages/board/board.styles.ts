import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export const PageContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 0 0 0 30px;
    background-color: var(--gray-300);
    margin: 0;
    gap: 25px;
    @media (max-width: 1024px) {
    min-width: 1000px;
     overflow-x: auto;
    }
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
padding-top: 10px;
padding-bottom: 10px;
border-radius: 0px 0px 0px 18px;
`
export const PersonProfile =styled.img<{ index?: string }>`
    width: 40px;
    height: 40px;
    z-index: ${({ index }) =>  index ? index : '10'};
    border-radius: 50%;
    aspect-ratio: 1/1;
    border: 2px solid #FCFBFB;
  margin-right:  ${({ index }) =>  index ? '-10px' : ''};
  cursor: pointer;

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
    flex-direction:column;
    border-radius: 18px 0px 0px 0px;
    padding: 2rem;
    align-items:flex-start;
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

export const ImagesHolder = styled.div`
display:flex;
align-items: center;
position: relative; 
`
export const TasksTitleHolder =styled.div`
    display: grid;
    gap: 2rem;
    width:100%;
    grid-template-columns: repeat(4, minmax(0, 1fr));
`
export const TaskTitleHolder =styled.div`
border-radius:9px;
display:flex;
align-items: center;
justify-content: space-between; 
color: var(--slate-400);
padding:0.65rem;
background-color: var(--gray-300);
h1{
    font-weight: 700;
}
`
export const TasksBox =styled.div`
  border-radius:9px;
display:flex;
    flex-direction: column;
    justify-content:flex-start;
padding-right: 0.35rem;
padding-left: 0.35rem;
padding-top: 0.45rem;

background-color: var(--gray-300);
min-height:50vh;
gap:12px;
`