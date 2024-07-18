import React from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { MdKeyboardArrowDown } from 'react-icons/md';

import {
    AccordionContainer,
    AccordionContent,
    AccordionHeader,
} from './accordion.styles';

type AccordionProps = {
    title: string;
    children: React.ReactNode;
    /**
     * Optional className to apply to the accordion content container
     */
    className?: string;
};

const Accordion = ({ title, children, className }: AccordionProps) => {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <AccordionContainer>
            <AccordionHeader
                isOpen={isOpen}
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                {isOpen ? (
                    <MdKeyboardArrowDown size={24} />
                ) : (
                    <MdKeyboardArrowUp size={24} />
                )}
                <span className='flex gap-6 items-center'>
                    <h1>{title}</h1>
                    <p className='text-sm text-[var(--slate-400)]'> (12 issues)</p>
                </span>                
            </AccordionHeader>
            {isOpen && (
                <AccordionContent className={className}>
                    {children}
                </AccordionContent>
            )}
        </AccordionContainer>
    );
};

export default Accordion;
