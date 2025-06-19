import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";

function App() {
  return (
    <Router>
       <Navbar />
      <Routes>
        {/* Customer-Facing */}
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/orders" element={<Orders />} />

        {/* Admin-Only */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
