import { styles } from "@/utils/styles";
import { Avatar } from "@nextui-org/react";
import React from "react";
import Ratings from "../Ratings";

const ReviewCard = () => {
  return (
    <div className="flex  gap-5">
      <div className="">
        <Avatar size="lg" />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <span className={`${styles.label} !text-xl text-white`}>Allen</span>
          <span className={`${styles.label} !text-sm`}>5 days ago</span>
          <Ratings rating={5} />
        </div>
        <div className={`${styles.paragraph} whitespace-pre-line`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nemo
          saepe facilis porro facere et itaque laboriosam, modi eaque maiores
          eius iure necessitatibus atque ducimus quam animi ea aut autem quia
          beatae eveniet enim magni quaerat? Reprehenderit illo mollitia omnis
          nemo doloremque cumque provident corporis rem dolorum, minus,
          doloribus officia?
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
