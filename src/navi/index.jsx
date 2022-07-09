import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../home";

export default function Navi() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
      </Routes>
    </Router>
  );
}
