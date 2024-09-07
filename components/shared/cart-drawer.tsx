import React from 'react';

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'

interface Props {
    className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children,className }) => {
  return (
    <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
            
        </SheetContent>
    </Sheet>
  );
};