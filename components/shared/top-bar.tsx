import { cn } from '@/lib/utils';
import React from 'react';
import { Categories } from './categories';
import { SortPopup } from './sort-popup';
import { Container } from './container';
import { Category } from '@prisma/client';
import { categories } from '@/prisma/constants';

interface Props {
    categories: Category[]
    className?: string;
}

export const Topbar: React.FC<Props> = ({ categories,className }) => {
  return (
    <div className={cn(' sticky top-0 bg-white shadow-lg shadow-black/5 z-10 pt-5 pb-5',className)}>
        <Container className='flex items-center justify-between'>
            <Categories items={categories}/>
            <SortPopup/>
        </Container>
    </div>
  );
};