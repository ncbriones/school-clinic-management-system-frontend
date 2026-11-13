import { useAuthContext } from "@/contexts/auth";
import { UserCircleIcon } from "@phosphor-icons/react";

const UserCard = () => {
  const { name, role } = useAuthContext();
  return (
    <div className="flex border-white p-2 rounded-xl bg-secondary">
      <UserCircleIcon size={45} className="" />
      <div className="ml-2">
        <h2 className="font-bold">{name}</h2>
        <h3>ROLE: {role}</h3>
      </div>
    </div>
  );
};

export default UserCard;
