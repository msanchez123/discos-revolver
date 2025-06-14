import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ItemDetail from "./pages/ItemDetail";
import AddItem from "./pages/AddItem";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/disco/:id" element={<ItemDetail />} />
        <Route path="/nuevo" element={<AddItem />} />
        <Route path="/sobre-nosotros" element={<AboutUs />} />
      </Routes>
    </>
  );
}

export default App;
