import { CardContainer, PersonProfile, TicketText, TicketTitle,PriorityFlag } from "./ticket-box.style";
import personalImage from "../../assets/user.jpg"
import { assign } from "lodash";

type TicketInfoProps = {
    TicketId?: string;
    Assignee: string;
    Reporter?: string;
    Description: string;
    Status?: string;
    Priority: string;
    Title:string;
};

const TicketInfo = ({
    TicketId,
    Assignee,
    Reporter,
    Description,
    Status,
    Priority,
    Title
}: TicketInfoProps) => {

   
    // const CreditOptions = [
    //     {
    //         option: 'Set default',
    //         handler: () => {
             
    //         },
    //     },
    //     {
    //         option: 'Remove',
    //         handler: () => {
    //         },
    //     },
    // ];
    return (
        <CardContainer>
           <TicketTitle>{Title}</TicketTitle>
           <TicketText>{Description}</TicketText>
           <div className="flex w-[100%] justify-between items-center">
            <div className="flex gap-2 items-center">
            <PersonProfile src={personalImage} title={Assignee}/>
            <h1 className="text-sm text-[var(--slate-600)]">{Assignee}</h1>
            </div>
           <PriorityFlag 
           color= {Priority==="Blocker"?'#ED363A':Priority==='Major'?'#F8F0A7':'#008200'}/>
           </div>
        </CardContainer>
    );
};
export default TicketInfo;