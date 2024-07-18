import styled from "styled-components";
import { CustomInput } from "../input/Input.component";
import { motion } from "framer-motion";

export const TicketHolder = styled.div`
    position: relative;
    display: flex;
    gap: 2rem;
    width:100%;
`;
export const FormHolder = styled.div`
    position: relative;
    display: flex;
    padding:1rem;
    width:70%;
    flex-direction:column;
    border-right: 1px solid var(--gray-500);

`;
export const DataHolder = styled.div`
    position: relative;
    display: flex;
    width:30%;
    flex-direction:column;
    justify-content:flex-start;
    align-items: flex-start;
    gap: 2rem;
    padding:1rem;


`;

export const PersonProfile =styled.img`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    aspect-ratio: 1/1;
    cursor: pointer;

`

export const ChooseInput = styled(CustomInput)<{ color?: string }>`
   background-color: rgba(0,0,0, 0.1);
   font-size: 0.9rem;
   padding-left: 30px;
`;

export const ChooseContainer = styled(motion.ul)`
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
       max-height:17vh;
    overflow-y: auto;
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