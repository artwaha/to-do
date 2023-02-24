import { Outlet } from "react-router-dom";
import AddTask from "./components/AddTask";
import Footer from "./containers/Footer";
import Navbar from "./containers/Navbar";
import TodoContextProvider from "./containers/TodoContextProvider";

function App() {
  return (
    <TodoContextProvider>
      <div className='flex flex-col min-h-screen'>
        <Navbar />
        <AddTask />
        <main className='flex-1 flex'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </TodoContextProvider>
  );
}

export default App;
