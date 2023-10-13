"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

type CartEntryProps = {
  cartItem: CartItemWithProduct;
  setProductsQuantity: (productId: string, quantity: number) => Promise<void>;
};

export default function CartEntry({
  cartItem: { product, quantity },
  setProductsQuantity,
}: CartEntryProps) {
  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  const [idPending, startTransition] = useTransition();

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-lg"
        />
        <div>
          <Link href={`/products/${product.id}`} className="font-bold">
            {product.name}
          </Link>
          <div>Price:{product.price}</div>
          <div className="item-center my-1 flex  gap-2">
            Quantity:
            <select
              defaultValue={quantity}
              className="select-bordered select w-full max-w-[80px]"
              onChange={(e) => {
                const newQuantity = parseInt(e.currentTarget.value);
                startTransition(async () => {
                  await setProductsQuantity(product.id, newQuantity);
                });
              }}
            >
              <option value="0">0 (remove)</option>
              {quantityOptions}
            </select>
          </div>
          <div className="item-center flex gap-3">
            Total: {product.price * quantity}
            {idPending && (
              <span className="loading loading-spinner loading-sm"></span>
            )}
          </div>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
}
