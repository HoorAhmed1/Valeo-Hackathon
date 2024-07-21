import Button from "../../components/button/button.component";
import { DataContainer, Holder, ImagesHolder, NavBar, PageContainer, PersonProfile, SearchBar, TasksBox, TasksTitleHolder, TaskTitleHolder, } from "./board.styles";
import personalImage from "../../assets/user.jpg"
import { PageTitle } from "../../index.styles";
import { IoMdSearch, IoMdNotifications } from "react-icons/io";
import Accordion from "../../components/accordion/accordion.component";
import { TbGraphFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import TicketInfo from "../../components/ticket-box/ticket-box.component";
import { useEffect, useState } from "react";
import TicketModal from "../../components/ticket-modal/ticket-modal.component";
import { GetAllTicket } from "../../services/ticket.services";
import { GetTicket } from "../../types/serialized-input";

const BoardPage = () => {
    const navigate = useNavigate();
    const [ticketShow, setTicketShow] = useState(false);
    const [id, setID]= useState(0);
    const [tickets, setTickets] = useState<GetTicket[]>();
    const handleEdit = (ID: number) => {
        setID(ID);
        setTicketShow((prev) => !prev);
    };
    useEffect(() => {
        let mounted = true;
        GetAllTicket()
            .then(data => {
                if (mounted) {
                    setTickets(data);
                }
            })
            .catch(error => {
                console.error("Error fetching tickets:", error);
            });
    
        return () => {
            mounted = false;
        };
    }, []);


    return (<PageContainer>
        <NavBar>
            <Button onClick={() => navigate('/create-ticket')}>
                Create
            </Button>
            <div className="flex gap-4 items-center">
                <IoMdNotifications className="cursor-pointer" size={28} color='var(--slate-400)' title='notification' />
                <PersonProfile src={personalImage} alt="personal image" />
            </div>
        </NavBar>
        <Holder>
            <div className="flex flex-col justify-between gap-4 py-4 h-full">
                <PageTitle className={'text-left'} >
                    BOARD
                </PageTitle>
                <SearchBar>
                    <IoMdSearch color="#4C4C4F" size="20" />
                    <input
                        type="search"
                        id="default-search"
                    />
                </SearchBar>
            </div>
            <div className="flex-1 flex justify-between pt-10 pl-4">
                <ImagesHolder>
                    <PersonProfile title="person name" src={personalImage} index="10" />
                    <PersonProfile src={personalImage} index="9" />
                    <PersonProfile src={personalImage} index="8" />
                    <PersonProfile src={personalImage} index="7" />
                    <PersonProfile src={personalImage} index="6" />
                </ImagesHolder>
                <Button>
                    <span className="flex gap-2">
                        <TbGraphFilled size={20} />
                        Insight
                    </span>
                </Button>
            </div>
        </Holder>
        <DataContainer>
            <TasksTitleHolder>
                <TaskTitleHolder>
                    <h1>BLOCKAGE</h1>
                    <p>12</p>
                </TaskTitleHolder>
                <TaskTitleHolder>
                    <h1>TODO</h1>
                    <p>1</p>
                </TaskTitleHolder>
                <TaskTitleHolder>
                    <h1>IN REVIEW</h1>
                    <p>20</p>
                </TaskTitleHolder>
                <TaskTitleHolder>
                    <h1>DONE</h1>
                    <p>12</p>
                </TaskTitleHolder>
            </TasksTitleHolder>
            <Accordion title="Project 1" >
                <TasksBox>
                    {tickets?.map((ticket,key) =>
             {  return(<div className="w-[100%]"
             onClick={() => handleEdit(key)}>
             <TicketInfo
                 Title={ticket.title}
                 Assignee={ticket.assigned_to} 
                 Description={ticket.description} 
                 Priority={ticket.priority} 
                 />
             </div>)})}
                </TasksBox>
                <TasksBox></TasksBox>
                <TasksBox></TasksBox>
                <TasksBox></TasksBox>
            </Accordion>
        </DataContainer>
        <TicketModal
             ticket={tickets && tickets[id]}
            showModal={ticketShow}
            setShowModal={setTicketShow} ID={(tickets && tickets[id].id)||0}/>
    </PageContainer>)
}

export default BoardPage;