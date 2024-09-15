"use client"
import React, { useEffect } from 'react';

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
import { useCartStore } from '@/store/cart';
import { PizzaSize, PizzaType } from '@/constants/pizza';
import { updateItemQuantity } from '@/services/cart';

interface Props {
    className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children,className }) => {
    const [totalAmount, fetchCartItems, updateItemQuantity,items,removeCartItem] = useCartStore(state => [
        state.totalAmount, 
        state.fetchCartItems,
        state.updateItemQuantity,
        state.items,
        state.removeCartItem
       
    ])
    const [redirecting, setRedirecting] = React.useState(false)

    useEffect(() => {
      fetchCartItems()
    }, [])

    const onClickCountButton = (id: number, quantity: number, type: 'plus'| 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity)
    }
    
  return (
    <Sheet>  
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
        <SheetHeader>
            <SheetTitle>
                In cart <span className='font-bold'>{items.length}</span>
            </SheetTitle>
        </SheetHeader>
        <div className='-mx-6 mt-5 overflow-auto flex-1 scrollbar'>
         
              {
                items.map((item) => (
                       <div className='mb-2' key={item.id}>
                    <CartDrawerItem 
                       
                        id={item.id} 
                        imageUrl={item.imageUrl}
                        details={item.pizzaSize && item.pizzaType? getCartItemDetails(item.ingredients,item.pizzaType as PizzaType, item.pizzaSize as PizzaSize) : ''} 
                        name={item.name} 
                        price={item.price} 
                        quantity={item.quantity}
                        onClickCountButton={(type) =>
                            onClickCountButton(item.id, item.quantity, type)
                          }
                          onClickRemove={() => removeCartItem(item.id)}
                         />  
                         </div> 
                ))
              }
          
       </div>
        <SheetFooter className='-mx-6 bg-white p-8 flex-col'>
            <div className='w-full'>
                <div className='flex mb-4'>
                    <span className='flex flex-1 text-lg text-neutral-500'>
                        Total
                        <div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2'/>
                    </span>

                    <span className='font-bold text-lg'>{totalAmount} $</span>
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