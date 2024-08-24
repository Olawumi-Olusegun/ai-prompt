import React from "react";
import MainPage from "./_mainpage";
import { getUser } from "@/actions/user/getUser";
import { getAllPrompts } from "@/actions/prompts/getAllPrompts";

const Homepage = async () => {
  const data = await getUser();
  const promptsData = await getAllPrompts();

  return (
    <>
      <MainPage
        user={data?.user}
        isSellerExist={data.shop ? true : false}
        promptsData={promptsData.prompts}
      />
    </>
  );
};

export default Homepage;
