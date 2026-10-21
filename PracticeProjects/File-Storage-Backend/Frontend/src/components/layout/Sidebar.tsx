import {
    Cloud,
    LayoutDashboard,
    Files,
    Users,
    Clock,
    Trash2,
    Settings,
    LogOut,
  } from "lucide-react";
  
  interface SidebarProps {
    activePage: string;
    onPageChange: (page: string) => void;
  }
  
  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "My Files", icon: Files },
    { label: "Shared with me", icon: Users },
    { label: "Recent", icon: Clock },
    { label: "Trash", icon: Trash2 },
  ];
  
  export default function Sidebar({
    activePage,
    onPageChange,
  }: SidebarProps) {
    return (
      <aside className="sidebar">
        <div className="brand">
          <Cloud size={29} />
          <span>FileVault</span>
        </div>
  
        <p className="nav-caption">WORKSPACE</p>
  
        <nav className="nav-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
  
            return (
              <button
                key={item.label}
                className={`nav-item ${
                  activePage === item.label ? "active" : ""
                }`}
                onClick={() => onPageChange(item.label)}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
  
        <div className="sidebar-bottom">
          <button
            className="nav-item"
            onClick={() => onPageChange("Settings")}
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>
  
          <button
            className="nav-item"
            onClick={() => onPageChange("Logout")}
          >
            <LogOut size={19} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    );
  }