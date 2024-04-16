"use client";

import { priceToIDR } from "@/lib/utils";
import ProductCard from "./product-card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import Image from "next/image";

interface Props {
  title: string;
  image: string;
  price: number;
  sold: number;
  rating: number;
  discount?: number;
}

const ProductCardWrapper: React.FC<Props> = (props) => {
  const { image, price, rating, sold, title, discount } = props;

  const priceIDR = priceToIDR(price);
  const fixPrice = discount ? price - (price * discount) / 100 : price;

  const [counter, setCounter] = useState(1);
  const [total, setTotal] = useState(fixPrice);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => {
    setCounter(1);
    setTotal(fixPrice);
    setIsDialogOpen(false);
  };

  const handleIncrement = () => {
    const totalCounter = counter + 1;

    setCounter(totalCounter);
    setTotal(fixPrice * totalCounter);
  };

  const handleDecrement = () => {
    const totalCounter = counter - 1;

    setCounter(totalCounter);
    setTotal(fixPrice * totalCounter);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const changeCounter = Number(e.target.value);

    setCounter(changeCounter);
    setTotal(fixPrice * changeCounter);
  };

  const handleAddToCart = () => {
    handleCloseDialog();
  };

  return (
    <>
      <ProductCard
        onClick={handleOpenDialog}
        image={image}
        price={price}
        rating={rating}
        sold={sold}
        title={title}
        discount={discount}
      />
      {isDialogOpen && (
        <Dialog open={isDialogOpen}>
          <DialogContent
            onCloseClick={handleCloseDialog}
            className="sm:max-w-md"
          >
            <DialogHeader>
              <AspectRatio
                ratio={1 / 1}
                className="overflow-hidden rounded-lg border border-orange"
              >
                <Image alt={title} src={image} fill sizes="100vw" />
              </AspectRatio>
            </DialogHeader>
            <div className="flex flex-col">
              <h2 className="text-lg font-bold md:text-xl lg:text-2xl">
                {title}
              </h2>
              {/* price */}
              <div className="my-[2px] flex justify-between text-sm font-medium text-[#181818] md:text-base lg:my-2 lg:text-lg">
                {discount ? (
                  <p>Rp.{priceToIDR(price - (price * discount) / 100)}</p>
                ) : null}
                <p>
                  {discount ? (
                    <s className="text-[#909090]">Rp.{priceIDR}</s>
                  ) : (
                    `Rp.${priceIDR}`
                  )}
                </p>
              </div>
              {/* counter */}
              <div className="flex items-center justify-between font-medium">
                <div>
                  <p className="md:text-lg lg:text-xl">Jumlah:</p>
                </div>
                <div className="flex w-32 items-center justify-center md:text-lg lg:text-xl">
                  <button
                    type="button"
                    disabled={counter <= 1}
                    onClick={handleDecrement}
                    className="h-8 w-8 rounded border bg-gray font-bold focus:bg-green disabled:text-black/20 md:h-10 md:w-10"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={counter}
                    className="h-8 w-12 text-center md:h-10 md:w-14 lg:w-16"
                    onChange={handleChangeInput}
                  />
                  <button
                    type="button"
                    onClick={handleIncrement}
                    className="h-8 w-8 rounded border bg-gray font-bold focus:bg-green md:h-10 md:w-10"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                disabled={counter < 1}
                onClick={handleAddToCart}
                className="relative w-full font-medium"
              >
                Keranjang
                <span className="absolute right-2 text-[10px] lg:text-[12px]">
                  Rp.{priceToIDR(total)}
                </span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ProductCardWrapper;