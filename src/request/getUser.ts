export default async function getUser() {
  console.log("getUser caller");
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
