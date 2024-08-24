import { getUser } from "@/actions/user/getUser";
import AboutComp from "./_page";

const AboutPage = async () => {
  const data = await getUser();
  return <AboutComp data={data} />;
};

export default AboutPage;
