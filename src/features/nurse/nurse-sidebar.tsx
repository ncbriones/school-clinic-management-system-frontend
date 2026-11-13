import { NavLink, useNavigate } from "react-router-dom";
import {
  ChartLineIcon,
  FolderUserIcon,
  PillIcon,
  UsersThreeIcon,
  ClipboardTextIcon,
} from "@phosphor-icons/react";
import { useAuthContext } from "@/contexts/auth";
import UserCard from "@/components/shared/user-card";
import { useState } from "react";
import LogoutConfirmationForm from "@/components/shared/logout-confirmation-form";
import Modal from "@/components/shared/modal";

const Sidebar = () => {
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState<boolean>(false);
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav
      className={`flex flex-col top-0 left-0 bg-primary h-screen text-white duration-400 m-0 shadow-lg p-3 gap-7`}
    >
      <h1 className="text-xl font-bold text-center">
        School Clinic Management System
      </h1>
      <UserCard />
      <ul className="flex flex-col gap-7">
        <li className="">
          <NavLink
            className={({ isActive }) =>
              `sidebar ${isActive ? "bg-green-900 rounded-xl" : ""}`
            }
            to="/"
          >
            <ChartLineIcon size={30} />
            <span
              className={`font-semibold self-center gap-4 text-center font-inter`}
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
            to="/patients"
          >
            <UsersThreeIcon size={30} />
            <span
              className={`font-semibold self-center gap-4 text-center font-inter`}
            >
              Patients
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
              className={`font-semibold self-center gap-4 text-center font-inter`}
            >
              Records
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `sidebar ${isActive ? "bg-green-900 rounded-xl" : ""}`
            }
            to="/inventory"
          >
            <PillIcon size={30} />
            <span
              className={`font-semibold self-center gap-4 text-center font-inter`}
            >
              Inventory
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `sidebar ${isActive ? "bg-green-900 rounded-xl" : ""}`
            }
            to="/protocol"
          >
            <ClipboardTextIcon size={30} />
            <span
              className={`font-semibold self-center gap-4 text-center font-inter`}
            >
              Protocol
            </span>
          </NavLink>
        </li>
      </ul>

      <button
        className="bg-green-900 border-0 rounded-2xl p-3 text-md font-bold hover:scale-102 transition-all mt-auto"
        onClick={() => setIsOpenLogoutModal(true)}
      >
        Logout
      </button>
      <Modal
        title="Confirm Logout"
        isOpen={isOpenLogoutModal}
        onClose={() => setIsOpenLogoutModal(false)}
      >
        <LogoutConfirmationForm
          onClose={() => setIsOpenLogoutModal(false)}
          onConfirm={handleLogout}
        />
      </Modal>
    </nav>
  );
};

export default Sidebar;
