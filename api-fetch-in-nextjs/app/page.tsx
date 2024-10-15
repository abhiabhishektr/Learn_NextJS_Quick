import axios from "axios";

async function getUserDetails() {
  const response = await axios.get("https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details")
	return response.data;
}

export default async function Home() {
  const user = await getUserDetails();
  return (
    <div>
      {user.name}
      <p>{user.email}</p>
      
    </div>
  );
}