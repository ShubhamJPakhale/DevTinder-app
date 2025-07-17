import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, about, photoUrl, age, gender } = user;
  console.log(user);
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt={firstName} />
      </figure>
      <div className="card-body">
        <h2 className="card-title flex items-center justify-between">
          <span>{firstName + " " + lastName}</span>
          <span className="text-red-500">{gender === "male" ? "M" : "F"}</span>
        </h2>
        {age && gender && <p>{age + " " + gender.toLocaleUpperCase()}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
