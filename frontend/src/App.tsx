import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import LoggedInTemplatePage from './pages/LoggedIn';
import BoardPage from './pages/board/board.page';
import BlocklogPage from './pages/blocklog/blocklog.page';
import TicketCreationPage from './pages/ticket-creation/ticket-creation.page';
import TimelinePage from './pages/timeline/timeline.page';

function App() {
  return (
    <AnimatePresence>
        <Routes location={useLocation()}>
        <Route  path="/" element={<LoggedInTemplatePage />} >
           <Route  index path="board" element={<BoardPage />} />
           <Route  path="blocklog" element={<BlocklogPage />} />
           <Route  path="timeline" element={<TimelinePage />} />
        </Route>
        <Route  path="/create-ticket" element={<TicketCreationPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
