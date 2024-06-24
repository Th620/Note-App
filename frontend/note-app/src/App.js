import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Singin from "./pages/Singin";
import TagSearch from "./pages/TagSearch";

function App() {
  return (
      <div className="App">
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/tags" element={<TagSearch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Singin />} />
        </Routes>
      </div>
  );
}

export default App;
