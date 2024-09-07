import { Container } from '@/components/shared/container';
import { GroupVariants } from '@/components/shared/group-variants';
import { ProductImage } from '@/components/shared/product-image';
import { Title } from '@/components/shared/title';
import { pizzaSizes } from '@/constants/pizza';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }
  return (
    <Container className="flex flex-col my-10">
      <div className='flex flex-1'>
        <ProductImage imageUrl={product.imageUrl} size={35}/>
         <div className='w-[490px] bg-[#f7f6f5] p-7'>
           <Title text={product.name} className='font-extrabold mb-1'/>
           <GroupVariants 
           items={pizzaSizes}/>
           <p className='text-gray-400'>Lorem1 ipsum dolor sit amet consectetur adipisicing elit. Iusto autem, quae tempora voluptates voluptatibus, consectetur vitae neque illum natus porro doloribus, aliquam suscipit voluptatem sunt dolorem necessitatibus placeat nobis commodi.</p>
         </div>
      </div>
    </Container>
  );
}