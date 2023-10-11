import React from "react";

type PriceTagProps = {
  price: number;
  className?: string;
};

export default function PriceTag({ price, className }: PriceTagProps) {
  return <div className={`badge ${className}`}>$ {price}</div>;
}
