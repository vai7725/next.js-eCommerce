import PriceTag from "@/components/PriceTag";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import AddToCartButton from "./AddToCartButton";
import { incrementProductQuantity } from "./actions";

type ProductPageProps = {
  params: {
    id: string;
  };
};

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  return product;
});

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);
  return {
    title: `${product.name} | eCommerce`,
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);

  if (!product) notFound();
  return (
    <div className="flex flex-col lg:flex-row">
      <Image
        src={product.imageUrl}
        alt={product.name}
        height={500}
        width={500}
        className="rounded-lg"
        priority
      />
      <div className=" flex  flex-col  sm:mt-2 lg:ml-2 lg:justify-center">
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <PriceTag className="mt-4" price={product.price} />
        <p className="py-6">{product.description}</p>
        <AddToCartButton
          productId={id}
          incrementProductQuantity={incrementProductQuantity}
        />
      </div>
    </div>
  );
}
