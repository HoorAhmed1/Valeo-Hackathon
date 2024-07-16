import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import LoggedInTemplatePage from './pages/LoggedIn';
import BoardPage from './pages/board/board.page';

function App() {
  return (
    <AnimatePresence>
        <Routes location={useLocation()}>
        <Route index element={<LoggedInTemplatePage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
