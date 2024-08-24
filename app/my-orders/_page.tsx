"use client";
import { styles } from "@/utils/styles";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import { IoCloseOutline } from "react-icons/io5";
import {
  AiFillStar,
  AiOutlineCloudDownload,
  AiOutlineStar,
} from "react-icons/ai";
import { Button } from "@nextui-org/react";
import { newReview } from "@/actions/reviews/newReview";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { PiSpinnerGapBold } from "react-icons/pi";
import Header from "@/components/layouts/Header";
import { BiSolidEdit } from "react-icons/bi";
interface UserAllOrders {
  orders: any;
  user: any;
  isSellerExist: any;
}

const UserAllOrders = ({ orders, user, isSellerExist }: UserAllOrders) => {
  const [promptId, setPromptId] = useState("");
  const [rating, setRating] = useState(0);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { userId } = useAuth();

  const router = useRouter();

  const hasReviewed = orders
    .find((item: any) => item.promptId === promptId)
    ?.prompt.reviews.some((review: any) => review.userId === userId);

  console.log(hasReviewed);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Prompts Title", flex: 0.8 },
    { field: "price", headerName: "Prompts Price", flex: 0.5 },
    {
      field: "download",
      headerName: "Download Source Code",
      flex: 0.5,
      renderCell: (params: any) => {
        return (
          <div className="w-full h-full flex items-center justify-center ">
            <BiSolidEdit
              onClick={() => {
                setOpen((prev) => !prev);
                setPromptId(params.row.prompt?.id);
              }}
              className="text-2xl text-white cursor-pointer "
            />
          </div>
        );
      },
    },
    { field: "orderedAt", headerName: "Ordered At", flex: 0.5 },
    {
      field: "review",
      headerName: "Give a Review",
      flex: 0.5,
      renderCell: (params: any) => {
        const sourceCodeFiles = params.row.download;

        return (
          <div className="w-full h-full flex items-center justify-center ">
            {sourceCodeFiles &&
              sourceCodeFiles?.map((file: any, index: number) => (
                <a href={file.url} key={`file-${index}`} download>
                  <AiOutlineCloudDownload className="text-2xl text-white cursor-pointer" />
                </a>
              ))}
          </div>
        );
      },
    },
  ];

  const rows: any = [];

  orders?.forEach((order: any) => {
    rows.push({
      id: order.id,
      name: order?.prompt?.name,
      price: `$${order?.prompt?.price}`,
      download: order?.prompt?.promptUrl,
      orderedAt: format(order.createdAt),
      prompt: order?.prompt,
    });
  });

  const handleRating = (ratingValue: number) => {
    const newRating = rating === ratingValue ? 0 : ratingValue;
    setRating(newRating);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId) {
      toast.error("Please signin");
      router.replace("/sign-in");
      return;
    }

    if (rating === 0 || !rating || comment.trim() === "") {
      toast.error("Please fill the all fields!");
      return;
    }

    if (!rating || !comment.trim() || !promptId.trim() || !userId) {
      return;
    }

    if (hasReviewed) {
      toast.error("You have already reviewed this prompt");
      return;
    }

    try {
      setIsCommenting(true);
      await newReview({ rating, comment, promptId, userId });
      toast.success("Prompt reviewed successfully");
      setComment("");
      setRating(-1);
      setOpen(false);
    } catch (error) {
      toast.success("Error encountered");
    } finally {
      setIsCommenting(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Header activeItem={0} user={user} isSellerExist={isSellerExist} />
      <div className="w-full lg:w-[90%] mx-auto flex flex-col gap-5">
        <h1 className={`${styles.heading} text-center py-5 w-full`}>
          All orders
        </h1>
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            //   height={isDashboard ? "35vh" : "90vh"}
            height={"90vh"}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: "#fff",
              },
              "& .MuiDataGrid-sortIcon": {
                color: "#fff",
              },
              "& .MuiDataGrid-row": {
                color: "#fff",
                borderBottom: "1px solid #ffffff30!important",
              },
              "& .MuiTablePagination-root": {
                color: "#fff",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none!important",
              },
              "& .name-column--cell": {
                color: "#fff",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#3e4396 important",
                borderBottom: "none",
                color: "#fff",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "#1F2A40",
              },
              "& .MuiDataGrid-footerContainer": {
                color: "dark",
                borderTop: "none",
                backgroundColor: "#3e4396",
              },
              "& .MuiCheckbox-root": {
                color: `#b7ebde !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
        </Box>
      </div>

      {open && (
        <div className="fixed bg-black bg-opacity-45 backdrop-blur-md  p-2 inset-0 h-screen w-full flex items-center justify-center z-[9999999999999]">
          <form
            onSubmit={handleSubmit}
            className="relative group w-full md:w-[60%] mx-auto lg:py-5 bg-white rounded-md  p-5"
          >
            <h1
              className={`${styles.label} text-center text-black/80 !text-lg font-bold font-Montserrat`}
            >
              Give One Review
            </h1>

            <button
              type="button"
              className="text-black cursor-pointer absolute p-1.5 top-3 right-4 bg-gray-100 hover:bg-gray-300 duration-300 rounded-full "
            >
              <IoCloseOutline
                onClick={() => setOpen(false)}
                size={24}
                className="text-gray-700 group-hover:text-gray-900"
              />
            </button>

            <h5
              className={`${styles.label} text-black/80 mt-10 !text-sm font-bold font-Montserrat`}
            >
              Give a Rating: <span className="text-red-700">*</span>
            </h5>

            <div className="w-full mt-3 flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((_, index) => {
                if (rating >= index + 1)
                  return (
                    <AiFillStar
                      key={index}
                      onClick={() => handleRating(index + 1)}
                      size={25}
                      color="rgb(246,186,0)"
                      className="cursor-pointer"
                    />
                  );
                else
                  return (
                    <AiOutlineStar
                      key={index}
                      onClick={() => handleRating(index + 1)}
                      size={25}
                      color="rgb(246,186,0)"
                      className="cursor-pointer"
                    />
                  );
              })}
            </div>
            <div className="w-full">
              <textarea
                name="comment"
                id="comment"
                placeholder="Write your comment..."
                rows={6}
                className="resize-y w-full my-5 border-2 border-gray-400 rounded-md p-3 text-gray-600"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              ></textarea>
            </div>
            <div className="w-full">
              <Button
                id="submit"
                type="submit"
                disabled={isCommenting || hasReviewed}
                className={`${styles.button} disabled:cursor-not-allowed disabled:bg-gray-500 my-2 p-2 bg-green-600 flex items-center justify-center gap-1.5`}
              >
                {isCommenting && <PiSpinnerGapBold className="animate-spin" />}
                <span className="">Send Review</span>
              </Button>
            </div>
          </form>

          {/* <Modal>
          </Modal> */}
        </div>
      )}
    </>
  );
};

export default UserAllOrders;
