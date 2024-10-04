import { Title } from "@/components/shared/title";
import { Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const cancelPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <Title
        text={"Something went wrong"}
        size="xl"
        className="mt-12 font-bold"
      />
      <Image
        src="/assets/images/cancel-icon.svg"
        className="m-32"
        height={300}
        width={300}
        alt="check"
      ></Image>
      <Link href="/">
        <Button size="lg" className="flex items-center gap-1">
          <ArrowLeft />
          Return to home page
        </Button>
      </Link>
    </div>
  );
};
export default cancelPage;
