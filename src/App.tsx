
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/HomePage";
import Phonebook from "./components/Phonebook";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="phonebook" element={<Phonebook />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
