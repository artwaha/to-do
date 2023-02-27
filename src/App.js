import { Outlet } from "react-router-dom";
import TasksDashboard from "./components/TasksDashboard";
import Footer from "./containers/Footer";
import Navbar from "./containers/Navbar";
import TodoContextProvider from "./containers/TodoContextProvider";

function App() {
  return (
    <TodoContextProvider>
      <div className='flex flex-col min-h-screen'>
        <Navbar />
        <TasksDashboard />
        <main className='flex-1 flex'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </TodoContextProvider>
  );
}

export default App;
