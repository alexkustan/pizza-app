"use client"
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
import { Button } from '../ui';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails } from '@/lib/get-cart-item-details';

interface Props {
    className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children,className }) => {
    const [redirecting, setRedirecting] = React.useState(false)
  return (
    <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
        <SheetHeader>
            <SheetTitle>
                In cart <span className='font-bold'>3 items</span>
            </SheetTitle>
        </SheetHeader>
        <div className='-mx-6 mt-5 overflow-auto flex-1 scrollbar'>
            <div className='mb-2'>
                <CartDrawerItem id={1} imageUrl={''} details={getCartItemDetails(2,30,[{name: 'masdkkd'}, {name: 'asdasd'}])} name={'peperoni'} price={8} quantity={1}/>
            </div> 
       </div>
        <SheetFooter className='-mx-6 bg-white p-8 flex-col'>
            <div className='w-full'>
                <div className='flex mb-4'>
                    <span className='flex flex-1 text-lg text-neutral-500'>
                        Total
                        <div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2'/>
                    </span>

                    <span className='font-bold text-lg'>5 $</span>
                </div>
            </div>
            <Link href="/cart">
            <Button 
                onClick={() => setRedirecting(true)}
               type='submit'
               className='w-full h-12 text-base'>
              Proced to order
              <ArrowRight className='w-5 ml-2'/>
            </Button>
            </Link>
        </SheetFooter>
        </SheetContent>
    </Sheet>
  );
};