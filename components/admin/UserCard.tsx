import Avatar from "../Avatar";

interface Props {
  name: string;
  email: string;
}

const UserCard = ({ name, email }: Props) => (
  <div className="user-card">
    <Avatar name={name} />
    <p className="name">{name}</p>
    <p className="email">{email}</p>
  </div>
);

export default UserCard;
