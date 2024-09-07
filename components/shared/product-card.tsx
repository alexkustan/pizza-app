import Link from 'next/link';
import React from 'react';
import { Button } from '../ui';
import { Plus } from 'lucide-react';
import { Title } from './title';

interface Props {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    className?: string;
}

export const ProductCard: React.FC<Props> = ({ id, name, price, imageUrl, className }) => {
  return (
    <div className={className}>
        <Link href={`/product/${id}`}>
        <div className='flex justify-center p-6'>
            <img src={imageUrl} height={292} width={292} alt={name}/>
        </div>
        <Title text={name} size='sm' className='mb-1 mt-3 font-bold'/>

        <p className='text-sm text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ad ipsum harum reprehenderit</p>
        <div className='flex justify-between items-center mt-4'>
          <span className='text-[20px]'>
            from{' '}<b>{price} $</b>
          </span>
          <Button className='text-base font-bold' variant="secondary">
            <Plus className='w-5 h-5 mr-1'/>
            Add
          </Button>
        </div>
        </Link>
    </div>
  );
};