import {
    HTMLAttributes,
    HTMLInputTypeAttribute,
    InputHTMLAttributes,
    TextareaHTMLAttributes,
} from 'react';

export type SerializedInput = {
    label: string;
    value: string;
    /**
     * Character limit for the input, usually for textarea.
     */
    limit?: number;
    wrapperClassName?: string;
    multiline?: boolean;
    error?: string;
} & InputHTMLAttributes &
    TextareaHTMLAttributes;

type customInputOptional = {
    custom?: boolean;
    customComponent?: React.ReactNode;
};
type customInputMandatory = {
    custom: boolean;
    customComponent: React.ReactNode;
};

/**
 * This type assure that custom and component are both present or both absent.
 */
export type SerializedCustomInput = SerializedInput &
    (customInputOptional | customInputMandatory);


export type GetTicket={
    id:number;
    title:string;
    description:string;
    priority:string;
    status:string;
    assigned_to:{
        id:number;
        name:string;
    };
    reporter?:string;
    created_at:Date;

}
export type SendTicket={
    title:string;
    description:string;
    priority:string;
}
export type PriorityTicket={
    description:string;
    priority:string;
}
export type ResponsePriorityTicket={
    expected_priority:string;
    match:boolean;
}


export type SimilarTicket={
    Issue_key:string;
    Description:string;
    Created_at:Date;
}