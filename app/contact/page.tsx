import { getUser } from "@/actions/user/getUser";
import ComtactComp from "./_page";

const ContactPage = async () => {
  const data = await getUser();
  return <ComtactComp data={data} />;
};

export default ContactPage;
