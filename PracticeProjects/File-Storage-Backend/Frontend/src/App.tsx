import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import "./App.css";
import Topbar from "./components/layout/Topbar";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [search, setSearch] = useState("")

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        onPageChange={setActivePage}
      />

      <div className="main-panel">
        <Topbar
          activePage={activePage}
          search={search}
          onSearchChange={setSearch}
        />

        {activePage === "Dashboard" || activePage === "My Files" ? (
          <DashboardPage  />
        ) : (
          <main className="content">
            <h1>{activePage}</h1>
            <p className="subtitle">
              This page will be implemented later.
            </p>
          </main>
        )}
      </div>
    </div>
  );
}

export default App;
