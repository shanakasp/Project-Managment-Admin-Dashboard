import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Bar from "./scenes/bar";
import Calendar from "./scenes/calendar/calendar";
import AddNewClient from "./scenes/client/AddNewClient";
import ClientInformation from "./scenes/client/clientInformation";
import EditClientInformation from "./scenes/client/clientInformation/EditClient.jsx";
import ViewClientInformation from "./scenes/client/clientInformation/ViewClient.jsx";
import Contacts from "./scenes/contacts";
import Dashboard from "./scenes/dashboard";
import AddNewEmployee from "./scenes/employee/AddNewEmployee.jsx";
import EditEmployee from "./scenes/employee/employeeInformation/EditEmployee.jsx";
import ViewEmployee from "./scenes/employee/employeeInformation/ViewEmployee.jsx";
import Employee from "./scenes/employee/employeeInformation/index.jsx";
import FAQ from "./scenes/faq";
import Form from "./scenes/form";
import Geography from "./scenes/geography";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import AddProject from "./scenes/projects/addProject/index.jsx";
import Edit from "./scenes/projects/projects/Edit.jsx";
import ViewProject from "./scenes/projects/projects/ViewProject.jsx";
import Project from "./scenes/projects/projects/index.jsx";
import Team from "./scenes/team";
import Signup from "./scenes/auth/signup/Signup.jsx"
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />

              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/newproject" element={<AddProject />} />
              <Route path="/project" element={<Project />} />
              <Route
                path="/project/viewproject/:id"
                element={<ViewProject></ViewProject>}
              />
              <Route path="/project/editproject/:id" element={<Edit></Edit>} />

              <Route path="/addclient" element={<AddNewClient />} />
              <Route path="/client" element={<ClientInformation />} />
              <Route
                path="/client/viewclient/:id"
                element={<ViewClientInformation />}
              />
              <Route
                path="/client/editclient/:id"
                element={<EditClientInformation />}
              />

              <Route path="/addemployee" element={<AddNewEmployee />} />
              <Route path="/employee" element={<Employee />} />
              <Route
                path="/employee/viewemployee/:id"
                element={<ViewEmployee />}
              />
              <Route
                path="/employee/editemployee/:id"
                element={<EditEmployee />}
              />

<Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
