const UserCard = ({ type }: { type: string }) => {
  return (
    <div className="rounded-2xl odd:bg-purple-200 even:bg-yellow-200 p-4 flex-1">
      {type}
    </div>
  );
};

export default UserCard;
