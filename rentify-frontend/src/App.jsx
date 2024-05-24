import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
// import HeaderNew from "./components/header/HeaderNew";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
