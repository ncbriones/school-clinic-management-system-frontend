import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ArrowLineRightIcon,
  ChartLineIcon,
  FolderUserIcon,
  HouseIcon,
  PillIcon,
} from "@phosphor-icons/react";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <nav
      className={`flex flex-col top-0 left-0 bg-gray-900 h-screen text-white duration-400 ${isExpanded ? "w-50" : "w-auto"} m-0 shadow-lg p-3 gap-10`}
      // onMouseEnter={() => setIsExpanded(true)}
      // onMouseLeave={() => setIsExpanded(false)}
    >
      <ArrowLineRightIcon
        className={`cursor-pointer transition-all duration-300 self-center ${isExpanded && "rotate-180 ml-auto"}`}
        size={30}
        onClick={() => setIsExpanded((prev) => !prev)}
      />
      <ul className="flex flex-col gap-8">
        <li className="">
          <NavLink
            className={({ isActive }) =>
              `sidebar ${isActive ? "bg-green-900 rounded-xl" : ""}`
            }
            to="/"
          >
            <HouseIcon size={30} />
            <span
              className={`font-semibold self-center gap-4 text-center font-inter ${!isExpanded && "hidden"}`}
            >
              Home
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `sidebar ${isActive ? "bg-green-900 rounded-xl" : ""}`
            }
            to="/dashboard"
          >
            <ChartLineIcon size={30} />
            <span
              className={`font-semibold self-center gap-4 text-center font-inter ${!isExpanded && "hidden"}`}
            >
              Dashboard
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `sidebar ${isActive ? "bg-green-900 rounded-xl" : ""}`
            }
            to="/records"
          >
            <FolderUserIcon size={30} />
            <span
              className={`font-semibold self-center gap-4 text-center font-inter ${!isExpanded && "hidden"}`}
            >
              Records
            </span>
          </NavLink>
        </li>
        <li className="">
          <NavLink
            className={({ isActive }) =>
              `sidebar ${isActive ? "bg-green-900 rounded-xl" : ""}`
            }
            to="/inventory"
          >
            <PillIcon size={30} />
            <span
              className={`font-semibold self-center gap-4 text-center font-inter ${!isExpanded && "hidden"}`}
            >
              Inventory
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
