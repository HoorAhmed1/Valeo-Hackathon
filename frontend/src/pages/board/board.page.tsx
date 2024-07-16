import Button from "../../components/button/button.component";
import { DataContainer, Holder, NavBar, PageContainer, PersonProfile, SearchBar, } from "./board.styles";
import personalImage from "../../assets/user.jpg"
import { PageTitle } from "../../index.styles";
import { IoMdSearch } from "react-icons/io";
const BoardPage = () => {
    return (<PageContainer>
        <NavBar>
            <Button>
                Create
            </Button>
            <PersonProfile src={personalImage} alt="personal image" />
        </NavBar>
        <Holder>
            <div className="flex flex-col justify-between gap-4">
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
            
        </Holder>
        <DataContainer>

        </DataContainer>
    </PageContainer>)
}

export default BoardPage;