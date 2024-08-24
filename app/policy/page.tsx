import { getUser } from "@/actions/user/getUser";
import PolicyComp from "./_page";

const PolicyPage = async () => {
  const data = await getUser();
  return <PolicyComp data={data} />;
};

export default PolicyPage;
