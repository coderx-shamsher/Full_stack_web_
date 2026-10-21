
import "./Topbar.css";

type TopbarProps = {
  activePage: string;
  search: string;
  onSearchChange: (value: string) => void;
};

function Topbar({
  activePage,
  search,
  onSearchChange,
}: TopbarProps) {
  return (
    <header className="topbar">
      <div className="topbar-title">
        <h2>{activePage}</h2>
        <p>Manage your files in one place</p>
      </div>

      <div className="topbar-actions">
        <input
          type="text"
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search files..."
          aria-label="Search files"
        />

        <div className="user-profile">
          <span className="user-avatar">CX</span>
          <span>My Account</span>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
