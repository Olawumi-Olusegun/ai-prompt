import { getUserOrders } from "@/actions/orders/getUserOrders";
import React from "react";
import UserAllOrders from "./_page";
import { getUser } from "@/actions/user/getUser";

const MyOrders = async () => {
  const orders = await getUserOrders();
  const user = await getUser();
  return (
    <div>
      <UserAllOrders
        orders={orders}
        user={user.user}
        isSellerExist={user.shop}
      />
    </div>
  );
};

export default MyOrders;
