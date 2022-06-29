import "./App.css";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Breadcrumb } from "./components/Breadcrumb";
import { EmployeeList } from "./components/List/index.js";
import { Footer } from "./components/Footer";
import { Card } from "./components/Card";
import { useEffect, useState } from "react";
import ModalComp from "./components/Modal";
import axios from "axios";



function App() {
  const [employees, setEmployee] = useState([]);
  const [showmodal, setShowmodal] = useState({ state: 0, values: null });
  const [sidebarClass, setSidebarClass] = useState("sb-nav-fixed");
  useEffect(() => {
    if (showmodal.values === null) {
      axios.get("https://jsonplaceholder.typicode.com/users")
        .then(response => setEmployee(response.data))
        .catch(err => console.log(err));
      setShowmodal(e => ({ ...e, values: "" }));
    }
    return () => { };
  }, [showmodal]);

  function toggleSidebarClass() {
    setSidebarClass(
      sidebarClass.includes("toggled")
        ? "sb-nav-fixed"
        : "sb-nav-fixed sb-sidenav-toggled"
    );
  }

  return (
    <>
      <div className={sidebarClass + " pr ov-y"}>
        <Navbar toggleSidebarClass={toggleSidebarClass} />
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <Sidebar />
          </div>
          <div id="layoutSidenav_content">
            <main className="h-75">
              <div className="container-fluid px-4">
                <h1 className="mt-4">Tables</h1>
                <Breadcrumb />
                <Card>
                  DataTables is a third party plugin that is used to generate the
                  demo table below. For more information about DataTables, please
                  visit the
                  <a target="_blank" href="https://datatables.net/">
                    official DataTables documentation
                  </a>
                  .
                </Card>
                <Card title="DataTable Example">
                  <EmployeeList setShowmodal={setShowmodal} items={employees} />
                </Card>
              </div>
            </main>
            <Footer />
          </div>
        </div>
      </div>
      {
        showmodal.state === 1
          ? <ModalComp
            status={showmodal}
            setEmployee={setEmployee}
            initialVal={employees}
            values={null}
            changeStatus={setShowmodal} />
          : showmodal.state === 2
          && <ModalComp
            status={showmodal}
            setEmployee={setEmployee}
            initialVal={employees}
            values={showmodal.values}
            changeStatus={setShowmodal} />
      }

    </>
  );
}

export default App;
