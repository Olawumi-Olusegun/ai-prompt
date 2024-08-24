import React from "react";
import MarketPlaceClient from "./_page";
import { getUser } from "@/actions/user/getUser";
import { getAllPrompts } from "@/actions/prompts/getAllPrompts";

const MarketPlacePage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const page = searchParams["page"] ?? "1";
  const pageNumber = parseInt(page);
  const user = await getUser();
  const allProptsData = await getAllPrompts(pageNumber);
  return (
    <div>
      <MarketPlaceClient
        data={user}
        allProptsData={allProptsData?.prompts}
        totalPrompts={allProptsData?.totalPrompts}
      />
    </div>
  );
};

export default MarketPlacePage;
