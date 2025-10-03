import React, { Suspense } from 'react';
import {
  Container,
  Title,
  TopBar,
  Filters,
  FiltersSkeleton,
  ProductsGroupList,
  BackToTop
} from '@/shared/components/common';
import { GetSearchParams, findPizzas } from '@/shared/lib/find-pizzas';

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const params = await searchParams;
  const categories = await findPizzas(params);

  return (
    <div className=''>
      <Container className='px-4 mt-10'>
        <Title text="Explore our menu" size='lg' className='font-extrabold' />
      </Container>

      <TopBar categories={categories.filter((category) => category.products.length > 0)} />

      <Container className='flex flex-row mt-10 px-4 pb-14'>
        <div className="hidden lg:flex gap-[80px]">
          <div className="w-[250px]">
            <Suspense fallback={<FiltersSkeleton />}>
              <Filters />
            </Suspense>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col gap-16 pl-6">
            {
              categories.map((category) =>
                category.products.length > 0 && (
                  <ProductsGroupList
                    key={category.id}
                    title={category.name}
                    categoryId={category.id}
                    items={category.products}
                  />
                ))
            }

          </div>
        </div>
      </Container>
      <BackToTop />
    </div>
  );
}
