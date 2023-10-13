"use client";

import { ShoppingCart, getCart } from "@/lib/db/cart";
import Link from "next/link";

type ShoppingCartButtonProps = {
  cart: ShoppingCart | null;
};

export default function ShoppingCartButton({ cart }: ShoppingCartButtonProps) {
  const closeDropdown = () => {
    const elem = document.activeElement as HTMLElement;
    if (elem) {
      elem.blur();
    }
  };
  return (
    <div className="dropdown-end dropdown">
      <label tabIndex={0} className="btn-ghost btn-circle btn ">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          <span className="badge badge-sm indicator-item">
            {cart?.size || 0}
          </span>
        </div>
      </label>
      <div
        tabIndex={0}
        className="card dropdown-content card-compact z-30 mt-3 w-52 bg-base-100"
      >
        <div className="card-body">
          <span className="text-lg font-bold">{cart?.size || 0} Items</span>
          <span className="text-info">Subtotal: ${cart?.subtotal || 0}</span>
          <div className="card-actions">
            <Link
              href={"/cart"}
              className="btn-primary btn-block btn"
              onClick={closeDropdown}
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
