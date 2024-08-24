import { getShopOrders } from "@/actions/orders/getShopOrders";
import { getUser } from "@/actions/user/getUser";
import ShopAllOrders from "@/components/shop/ShopAllOrders";
import ShopSidebar from "@/components/shop/ShopSidebar";

const OrdersPage = async () => {
  const sellerId = await getUser();
  const ordersData = await getShopOrders({ sellerId: sellerId?.user?.id });

  return (
    <div className="flex w-full">
      <div className="h-screen sticky top-0 left-0 flex  z-20 p-2 bg-[#111c42] md:w-[20%] 2xl:w-[17%] ">
        <ShopSidebar active={3} />
      </div>
      <div className="md:w-[80%] 2xl:w-[83%]">
        <ShopAllOrders isDashboard={false} ordersData={ordersData} />
      </div>
    </div>
  );
};

export default OrdersPage;
