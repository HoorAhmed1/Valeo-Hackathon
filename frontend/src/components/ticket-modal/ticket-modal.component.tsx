import { useEffect, useState } from "react";
import { Modal } from "../modal/modal.component";
import { CustomInput } from "../input/Input.component";
import { Label } from "../input/input.styles";
import { TicketHolder, FormHolder, DataHolder, PersonProfile, ChooseContainer, ChooseInput } from "./ticket-modal.styles";
import personalImage from "../../assets/user.jpg"
import { GoDotFill } from "react-icons/go";
import { StatusIcon, StatusInput, StatusContainer, StatusItem } from "../../pages/ticket-creation/ticket-creation.styles";
import Button from "../button/button.component";
import { GetTicket } from "../../types/serialized-input";
import { GetSimilarTicket } from "../../services/ticket.services";

interface ModalProps {
    ID: number;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    ticket: GetTicket | undefined;
}
type Priority = {
    color: string;
    status: string;
};
const TicketModal: React.FC<ModalProps> = ({
    showModal,
    setShowModal,
    ID,
    ticket
}) => {
    const [priority, setPriority] = useState(ticket?.priority);
    const [priorityColor, setPriorityColor] = useState(ticket?.priority==='Blocker'?'#ED363A':ticket?.priority==='Major'?'#F8F0A7':'#008200');
    const [priorityIsRunning, setPriorityIsRunning] = useState(false);
    const [status, setStatus] = useState('Blocklog');
    const [StatusIsRunning, setStatusIsRunning] = useState(false);
    const [title, setTitle] = useState('');
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [tickets, setTickets] = useState<GetTicket[]>();

    useEffect(() => {
        let mounted = true;
        GetSimilarTicket(ID)
            .then(data => {
                if (mounted) {
                    setTickets(data);
                }
            })
            .catch(error => {
                console.error("Error fetching similar tickets:", error);
            });
    
        return () => {
            mounted = false;
        };
    }, []);

    const priorities: Priority[] = [
        {
            color: '#ED363A',
            status: 'Blocker',
        },
        {
            color: '#F8F0A7',
            status: 'Major',
        },
        {
            color: '#008200',
            status: 'Minor',
        },
    ];
    const stat: Priority[] = [
        {
            color: 'var(--slate-600)',
            status: 'Blocklog',
        },
        {
            color: 'var(--slate-600)',
            status: 'Todo',
        },
        {
            color: 'var(--slate-600)',
            status: 'In review',
        },
        {
            color: 'var(--slate-600)',
            status: 'Done',
        },
    ];
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            const customInputForm =
                document.querySelector('.custom-input-form');
            if (customInputForm && !customInputForm.contains(event.target)) {
                setPriorityIsRunning(false);
            }
            const customForm =
            document.querySelector('.input-form');
        if (customForm && !customForm.contains(event.target)) {
            setStatusIsRunning(false);
        }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = {
            title,
            projectName,
            priority,
            description,
        };
        console.log(formData);
    };
    return (<Modal
        title="Ticket Details"
        width="lg"
        isOpen={showModal} setIsOpen={setShowModal} >
        <TicketHolder>
            <FormHolder>
                <div className="flex gap-4 w-[100%] pb-2">
                    <span className="flex gap-2 items-center">
                        <Label>Title:</Label>
                        <h1 className="text-md text-[var(--slate-600)]">Project</h1>
                    </span>
                    <span className="flex gap-2 items-center ">
                        <Label>Project Name:</Label>
                    </span>
                    <h1 className="text-md text-[var(--slate-600)] ">{ ticket?.title || "Computer Project"}</h1>
                </div>
                <span className="flex gap-2 items-start flex-col pb-2">
                    <Label>Description:</Label>
                    <h1 className="text-md text-[var(--slate-600)]">{ticket?.description||
                    "The error message “Target container is not a DOM element” typically occurs when React tries to render a component into a container that doesn’t exist or isn’t correctly referenced in the DOM."}
                      </h1>
                </span>
                <div className="flex gap-4 w-[100%] justify-between ">
                <div className="w-full relative">
                <StatusIcon size={24} color={priorityColor} />
                <StatusInput
                    required
                    color={priorityColor}
                    label="Priority"
                    type="text"
                    className="custom-input-form"
                    value={priority}
                    onClick={() => {
                        setPriorityIsRunning(true);
                    }}
                />
                {priorityIsRunning && (
                    <StatusContainer>
                        {priorities.map((status) => (
                            <StatusItem
                                onClick={() => {
                                    setPriority(status.status);
                                    setPriorityColor(status.color);
                                }}
                            >
                                <GoDotFill
                                    size={24}
                                    color={status.color}
                                />
                                <span>{status.status}</span>
                            </StatusItem>
                        ))}
                    </StatusContainer>
                )}
            </div>
                </div>
                <span className="flex gap-2 items-start flex-col pb-2 pt-[10px]">
                    <Label>Suggested Related Ticket IDs:</Label>
                        {tickets?
                                      tickets.map((ticket) =>
                                        <span className="bg-[var(--slate-50)] text-[var(--slate-500)] font-bold rounded-full flex items-center px-2 py-1 text-xs">
                                      {"Ticket "+ticket.id} 
                                  </span>
                                    )       :  
                            <h1 className="text-md text-[var(--slate-600)]">  No similar tickets found.</h1>
                    }
                </span>
            </FormHolder>
            <DataHolder>
                <span className="flex gap-2 items-start flex-col">
                    <Label>Reporter:</Label>
                    <div className="flex gap-2 items-center justify-center">
                    <PersonProfile src={personalImage} alt="personal image" />
                    <h1 className="text-md text-[var(--slate-700)]">Ahmed Mostafa</h1>
                    </div>                </span>
                <span className="flex gap-2 items-start flex-col w-[100%]">
                    <Label>Assignee:</Label>
                    <div className="flex gap-2 items-center justify-center">
                    <PersonProfile src={personalImage} alt="personal image" />
                    <h1 className="text-md text-[var(--slate-700)]">{ticket?.assigned_to.name || "Ahmed Hany"}</h1>
                    </div>
                    <p className="w-[100%] flex justify-end items-end cursor-pointer text-xs hover:text-blue-500 text-sky-500">Change the assignee.</p>
                </span>
                <div className="w-full relative pt-[4px]">
                <StatusIcon size={24} color="var(--slate-600)" />
                <ChooseInput
                    required
                    color="var(--slate-600)"
                    label="Status"
                    type="text"
                    className="input-form"
                    value={status}
                    onClick={() => {
                        setStatusIsRunning(true);
                    }}
                />
                {StatusIsRunning && (
                    <ChooseContainer>
                        {stat.map((status) => (
                            <StatusItem
                            onClick={() => {
                                setStatus(status.status);
                                setStatusIsRunning(false);

                            }}
                            >
                                <span>{status.status}</span>
                            </StatusItem>
                        ))}
                    </ChooseContainer>
                )}
            </div>
            </DataHolder>
        </TicketHolder>
    <div className="p-[1rem] flex justify-end items-end  gap-2">
    <Button
                    select="danger"
                    outline={true}
                    className="border-none!"
                    onClick={() =>
                        setShowModal(false)}
                    >
                    Cancel
                </Button>
        <Button
        className="rounded-xs!"
        >Save</Button>
        </div>
    </Modal>)
}
export default TicketModal;