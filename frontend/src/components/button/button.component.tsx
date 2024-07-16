import React, { ButtonHTMLAttributes } from 'react';

import { ButtonContainer, ButtonIcon } from './button.style';

type ButtonType = 'button' | 'submit' | 'reset' | undefined;
export type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'


export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        Record<string, unknown> {
    children: React.ReactNode;
    type?: ButtonType;
    select?: ButtonVariant;
    rounded?: boolean;
    loading?: boolean;
    className?: string;
    outline?: boolean;
}

function Button({
    children,
    type = 'button',
    select = 'primary',
    rounded = false,
    loading = false,
    className,
    outline,
    ...rest
}: ButtonProps): JSX.Element {
    return (
        <ButtonContainer
            loading={loading}
            select={select}
            rounded={rounded}
            outline={outline}
            className={className}
            type={type}
            {...rest}
        >
            {loading ? <ButtonIcon /> : children}
        </ButtonContainer>
    );
}

export default Button;
