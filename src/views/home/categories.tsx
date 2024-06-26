"use client";

import { useAppSelector } from "@/lib/hooks";
import CategoryCard, {
  CategoryCardLoadingWrapper,
} from "@/components/home/category-card";
import React from "react";

const Categories: React.FC = () => {
  const { data, loading } = useAppSelector((state) => state.categories);

  if (loading) return <CategoriesLoading />;

  const renderCategories = () => {
    return data.map((category, idx) => (
      <CategoryCard
        key={idx}
        description={category.description}
        image={category.image}
        title={category.title}
      />
    ));
  };

  return (
    <section id="categories" className="mt-[30px] px-5 lg:mt-20 lg:px-16">
      <div className="mb-5 text-[20px] font-bold leading-tight  md:text-2xl lg:hidden">
        <h2 className="leading-tight text-black">Apa saja product</h2>
        <h2 className="font-extrabold text-darkGreen">Saryurmoms?</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
        <div className="hidden flex-col justify-center font-bold leading-snug lg:flex lg:space-y-3 lg:text-4xl">
          <h2 className="text-black">Apa saja product</h2>
          <h2 className="font-extrabold text-darkGreen"> Saryurmoms?</h2>
        </div>

        {renderCategories()}
      </div>
    </section>
  );
};

export const CategoriesLoading: React.FC = () => {
  return (
    <section id="categories" className="mt-[30px] px-5 lg:mt-32 lg:px-10">
      <div className="mb-5 text-[20px] font-bold leading-tight  md:text-2xl lg:hidden">
        <h2 className="leading-tight text-black">Apa saja product</h2>
        <h2 className="font-extrabold text-darkGreen">Saryurmoms?</h2>
      </div>
      <CategoryCardLoadingWrapper />
    </section>
  );
};

export default Categories;
