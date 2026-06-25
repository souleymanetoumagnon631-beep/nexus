import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import Customers from "./pages/Customers";
import Stock from "./pages/Stock";
import Deliveries from "./pages/Deliveries";
import Settings from "./pages/Settings";
import AIInsights from "./pages/AIInsights";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page (public) */}
        <Route path="/" element={<Landing />} />

        {/* App (authenticated area) */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="factures" element={<Invoices />} />
          <Route path="clients" element={<Customers />} />
          <Route path="stock" element={<Stock />} />
          <Route path="livraisons" element={<Deliveries />} />
          <Route path="ia" element={<AIInsights />} />
          <Route path="parametres" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;