"use client"

import { Dialog} from '@/components/ui';
import { DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ChoosePizzaForm } from '../choose-pizza-form';
import { ChooseProductForm } from '../choose-product-form';
import { IProduct } from '@/@types/prisma';

interface Props {
    product: IProduct;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({product, className }) => {
    const router = useRouter()
    const isPizzaForm = Boolean(product.items[0].pizzaType)
  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
        <DialogContent className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[580px] bg-white overflow-hidden', className)}>
          {isPizzaForm ? (
          <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients} items={product.items} onSubmit={function (itemId: number, ingredients: number[]): void {
          } }/>
          ):(
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
          )
          }
        </DialogContent>
    </Dialog>
  );
};