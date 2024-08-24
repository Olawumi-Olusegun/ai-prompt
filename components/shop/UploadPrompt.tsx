import React, { ChangeEvent, useState } from "react";
import { styles } from "../../utils/styles";
import { useAuth } from "@clerk/nextjs";
import {
  Button,
  Input,
  Select,
  Selection,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import Image from "next/image";
import { IoDocumentAttachOutline } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { RiLoader2Line } from "react-icons/ri";

interface PromptData {
  name: string;
  shortDescription: string;
  description: string;
  images: string[];
  attachments: string[];
  estimatedPrice: string;
  price: string;
  tags: string;
}

const categoryItems = [
  {
    id: 0,
    title: "Chatgpt",
  },
  {
    id: 1,
    title: "MidJourney",
  },
  {
    id: 2,
    title: "Bard",
  },
  {
    id: 3,
    title: "Dalle",
  },
];

const promptItem = {
  name: "",
  shortDescription: "",
  description: "",
  images: [],
  attachments: [],
  estimatedPrice: "",
  price: "",
  tags: "",
};

const UploadPrompt = () => {
  const router = useRouter();

  const [promptData, setPromptData] = useState<PromptData>(promptItem);

  const [dragging, setDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<Selection>(new Set([]));

  const { userId } = useAuth();

  const handleImageFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = function () {
          if (reader.readyState === 2) {
            setPromptData((prevData) => ({
              ...prevData,
              images: [...prevData.images, reader.result as string],
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleAttachmentFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = function () {
          if (reader.readyState === 2) {
            setPromptData((prevData) => ({
              ...prevData,
              attachments: [...prevData.attachments, reader.result as string],
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleImageDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);

    if (event.dataTransfer.files) {
      const files = Array.from(event.dataTransfer.files);

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setPromptData((prevData) => ({
              ...prevData,
              images: [...prevData.images, reader.result as string],
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleAttachmentDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const files = Array.from(event.dataTransfer.files);

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setPromptData((prevData) => ({
              ...prevData,
              attachments: [...prevData.attachments, reader.result as string],
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(event.target.value);
    setCategory(new Set(event.target.value));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // try {
    //   setIsLoading(true);
    //   const categoryString = Array.from(category).join(",");
    //   const { data } = await axios.post("/api/upload-prompt", {
    //     ...promptData,
    //     category: categoryString,
    //     sellerId: userId,
    //   });
    //   toast.success("Prompt uploaded successfully");
    //   setPromptData(promptItem);
    //   router.push("/shop/prompts");
    // } catch (error: any) {
    //   console.log(error);
    //   toast.error(error?.response?.data);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="w-full px-5 py-10">
      <h1 className={`${styles.heading} text-center py-5 text-xl md:text-2xl`}>
        Upload Your Prompt
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-[90%] m-auto flex flex-col gap-10 mt-10"
      >
        <Input
          id="name"
          name="name"
          type="text"
          value={promptData.name}
          variant="bordered"
          size="lg"
          radius="sm"
          required
          placeholder="Enter your prompt name"
          classNames={{
            input: [
              "outline-red-500",
              "bg-green-500",
              "focus-visible: outline-red-500",
            ],
          }}
          // className="outline-none border-none !bg-transparent"
          onChange={(event) =>
            setPromptData((prevState) => ({
              ...prevState,
              name: event.target.value,
            }))
          }
        />
        <Input
          id="shortDescription"
          name="shortDescription"
          type="text"
          value={promptData.shortDescription}
          variant="bordered"
          size="lg"
          radius="sm"
          required
          placeholder="Enter short description for your prompt"
          onChange={(event) =>
            setPromptData((prevState) => ({
              ...prevState,
              shortDescription: event.target.value,
            }))
          }
        />
        <Textarea
          id="description"
          name="description"
          type="text"
          value={promptData.description}
          variant="bordered"
          size="lg"
          radius="sm"
          required
          placeholder="Enter prompt description"
          onChange={(event) =>
            setPromptData((prevState) => ({
              ...prevState,
              description: event.target.value,
            }))
          }
        />
        <div className="w-full flex flex-col md:flex-row gap-3">
          <Input
            id="estimatedPrice"
            name="estimatedPrice"
            type="number"
            value={promptData.estimatedPrice}
            variant="bordered"
            size="lg"
            radius="sm"
            required
            min={1}
            placeholder="Enter prompt estimated price"
            onChange={(event) =>
              setPromptData((prevState) => ({
                ...prevState,
                estimatedPrice: event.target.value,
              }))
            }
          />
          <Input
            id="price"
            name="price"
            type="number"
            value={promptData.price}
            variant="bordered"
            size="lg"
            radius="sm"
            required
            min={1}
            placeholder="Enter prompt price"
            onChange={(event) =>
              setPromptData((prevState) => ({
                ...prevState,
                price: event.target.value,
              }))
            }
          />
        </div>

        <div className="w-full flex flex-col md:flex-row gap-3">
          <Select
            id="category"
            name="category"
            variant="bordered"
            size="lg"
            radius="sm"
            required
            className="text-white"
            placeholder="Select one category"
            onChange={handleSelectionChange}
          >
            {categoryItems.map((item) => (
              <SelectItem
                key={item.title}
                value={item.title}
                className="text-black"
              >
                {item.title}
              </SelectItem>
            ))}
          </Select>

          <Input
            id="tags"
            name="tags"
            type="text"
            value={promptData.tags}
            variant="bordered"
            size="lg"
            radius="sm"
            required
            min={1}
            placeholder="Enter prompt tags"
            className="focus-visible:outline-red-500 focus-within:outline-red"
            onChange={(event) =>
              setPromptData((prevState) => ({
                ...prevState,
                tags: event.target.value,
              }))
            }
          />
        </div>

        <div className="w-full">
          <input
            type="file"
            required
            accept="image/*"
            multiple
            id="file"
            className="hidden"
            onChange={handleImageFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full cursor-pointer hover:bg-white/10 duration-300 rounded-md min-h-[15vh] border-white p-3 border  flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleImageDrop}
          >
            {promptData.images.length !== 0 ? (
              <div className="w-full flex flex-wrap">
                {promptData.images.map((item) => (
                  <Image
                    src={item}
                    alt=""
                    width={500}
                    height={400}
                    key={item}
                    className="w-full md:w-[48%] object-cover rounded-md md:m-2 my-2 pointer-events-none"
                  />
                ))}
              </div>
            ) : (
              <span className="text-white">
                Drag and drop your prompt images here or click to browse
              </span>
            )}
          </label>
        </div>
        <div className="w-full">
          <input
            type="file"
            required
            accept=".txt, .pdf"
            multiple
            id="attachments"
            className="hidden"
            onChange={handleAttachmentFileChange}
          />
          <label
            htmlFor="attachments"
            className={`w-full cursor-pointer hover:bg-white/10 duration-300 rounded-md min-h-[15vh] border-white p-3 border  flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleAttachmentDrop}
          >
            {promptData.attachments.length !== 0 ? (
              <div className="flex items-center">
                <IoDocumentAttachOutline className="text-3xl" />
                <span className={`${styles.label} pl-2 !text-2xl pt-1`}>
                  {promptData?.attachments?.length}{" "}
                  {promptData?.attachments?.length > 1 ? "files" : "file"}
                </span>
              </div>
            ) : (
              <span className="text-white">
                Drag and drop your prompt files here or click to browse
              </span>
            )}
          </label>
        </div>
        <div className="w-full flex items-center justify-center">
          <Button
            color="primary"
            size="lg"
            className={`${styles.button} flex items-center justify-center gap-1.5 disabled:bg-gray-800 disabled:cursor-not-allowed`}
            type="submit"
            disabled={isLoading}
            disableAnimation={isLoading}
          >
            {isLoading && <RiLoader2Line className="animate-spin" />}
            Upload your prompt
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadPrompt;
