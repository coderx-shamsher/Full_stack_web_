// import React from "react";
import "./styles/themeslist.css";
const ThemesList = () => {
  return (
    <>
      <div className="card">
        <ul
          className="list"
          style="--color:#5353ff;--hover-storke:#fff; --hover-color:#fff"
        >
          <li className="element">
            <label for="rename">
              <input type="radio" id="rename" name="filed" checked="" />
              <svg
                className="lucide lucide-pencil"
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2"
                stroke="#7e8590"
                fill="none"
                viewBox="0 0 24 24"
                height="25"
                width="25"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                <path d="m15 5 4 4"></path>
              </svg>
              Rename
            </label>
          </li>
          <li className="element" style="--color:#5353ff">
            <label className="label" for="addmember">
              <input type="radio" id="addmember" name="filed" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7e8590"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-user-round-plus"
              >
                <path d="M2 21a8 8 0 0 1 13.292-6"></path>
                <circle cx="10" cy="8" r="5"></circle>
                <path d="M19 16v6"></path>
                <path d="M22 19h-6"></path>
              </svg>
              Add Member
            </label>
          </li>
          <div className="separator"></div>
          <li className="element" style="--color:#5353ff">
            <label for="settings">
              <input type="radio" id="settings" name="filed" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7e8590"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-settings"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              Settings
            </label>
          </li>
          <li className="element delete" style="--color:#8e2a2a">
            <label for="delete">
              <input type="radio" id="delete" name="filed" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7e8590"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-trash-2"
              >
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                <line x1="10" x2="10" y1="11" y2="17"></line>
                <line x1="14" x2="14" y1="11" y2="17"></line>
              </svg>
              Delete
            </label>
          </li>
          <div className="separator"></div>
          <li
            className="element"
            style="--color:rgba(56, 45, 71, 0.836);--hover-storke:#bd89ff;--hover-color:#bd89ff"
          >
            <label for="teamaccess">
              <input type="radio" id="teamaccess" name="filed" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7e8590"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-users-round"
              >
                <path d="M18 21a8 8 0 0 0-16 0"></path>
                <circle cx="10" cy="8" r="5"></circle>
                <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
              </svg>
              Team Access
            </label>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ThemesList;
