import { styles } from "@/utils/styles";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

const Future = () => {
  return (
    <div className="w-full relative p-4 md:p-[unset] grid md:grid-cols-2 py-8">
      <div className="col-span-1">
        <Image
          src={`https://pixner.net/aikeu/assets/images/tools-thumb.png`}
          width={800}
          height={500}
          alt=""
          className="md:w-[90%] md:ml-[-50px] 2xl:ml:-[-90px] pointer-events-none "
        />
      </div>
      <div className="col-span-1 w-full flex items-center justify-center">
        <div className="2xl:w-[60%] ">
          <Button
            className={`${styles.button} mb-[30px] h-[37px] bg-[#12211f]`}
          >
            Future
          </Button>
          <h5 className={`${styles.heading} mb-5 !leading-[50px]`}>
            Unleashing The Glorious Future of AI Generated Images
          </h5>
          <p className={`${styles.paragraph} pb-5`}>
            One of the most prominent technoques in AI image generation use of
            Generative Adversarial Networks
          </p>
        </div>
      </div>
    </div>
  );
};

export default Future;
