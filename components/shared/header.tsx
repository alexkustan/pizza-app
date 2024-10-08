import React from "react";
import { Container } from "./container";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui";
import { User } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";

interface Props {
  hasSearch?: boolean;
  className?: string;
  hasCart?: boolean;
}

const Header: React.FC<Props> = ({
  hasSearch = true,
  hasCart = true,
  className,
}) => {
  return (
    <header className={cn("border-b")}>
      <Container className="flex items-center justify-between py-8">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl font-black uppercase">next pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                Absolutely delicious!
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10  flex-1 ">
            <SearchInput />
          </div>
        )}

        <div className="flex gap-3 items-center">
          <Button variant="outline" className="gap-1 flex items-center">
            <User size={16} />
            Log in
          </Button>
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};

export default Header;
