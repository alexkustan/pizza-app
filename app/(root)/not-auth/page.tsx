import { InfoBlock } from "@/components/shared/info-block";
import React from "react";

const NotAuthPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title="Acces denied"
        text="This page can be seen only for authoraized users"
        imageUrl="/assets/images/lock.png"
      />
    </div>
  );
};
export default NotAuthPage;
