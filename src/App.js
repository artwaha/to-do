import { Outlet } from "react-router-dom";
import TasksDashboard from "./components/TasksDashboard";
import Footer from "./containers/Footer";
import Navbar from "./containers/Navbar";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <TasksDashboard />
      <main className="flex-1 flex">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
