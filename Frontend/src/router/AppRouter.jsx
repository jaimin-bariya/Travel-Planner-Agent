import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Home, History, StartPlanning } from "@/pages";




const AppRouter = () => {
  return (
    <>
      
      <Router>

        <Routes>

            <Route element={<MainLayout/>}>
                <Route path='/' element={<Home/>} />
                <Route path="/history" element={<History/>} />
                <Route path="/start-planning" element={<StartPlanning/>} />
            </Route>

        </Routes>

      </Router>
      
    </>
  );
};

export default AppRouter;