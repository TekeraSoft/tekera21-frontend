import React from "react";

const SuperAdmin = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");

  const res = await data.json();

  return (
    <div className="flex gap-4">
      {res.map((item: any) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
};

export default SuperAdmin;
