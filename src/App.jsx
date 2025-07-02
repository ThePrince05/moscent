
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import Footer from './components/Footer';
// import ProtectedRoute from './components/ProtectedRoute'; // Will uncomment when we build this

function App() {
  return (
    <Router>
    
      <div className="flex flex-col min-h-screen"> {/* Added for sticky footer layout */}
        <Navbar />
        <div className="flex-grow"> {/* This div will contain your page content and push footer down */}
          <Routes>
            {/* Customer-Facing */}
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/orders" element={<Orders />} />

            {/* Admin-Only */}
            {/* We'll wrap these with <ProtectedRoute> later */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
          </Routes>
        </div>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;