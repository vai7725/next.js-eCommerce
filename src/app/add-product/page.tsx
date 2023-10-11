import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Add Product | Ecommerce",
};

async function addProduct(formData: FormData) {
  "use server";

  //   console.log(formData);
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  //   console.log(price);

  if (!name || !description || !imageUrl || !price) {
    throw new Error("Missing required fields");
  }

  await prisma.product.create({
    data: {
      name,
      description,
      imageUrl,
      price,
    },
  });

  redirect("/");
}

export default function AddProduct() {
  return (
    <div>
      <h1 className="mb-3 text-lg font-semibold">Add Product</h1>
      <form action={addProduct}>
        <input
          type="text"
          name="name"
          className="input-bordered input mb-3 w-full"
          required
          placeholder="Name"
        />
        <textarea
          name="description"
          id=""
          className="textarea-bordered textarea mb-3 w-full"
          required
          placeholder="Description"
        ></textarea>
        <input
          type="url"
          name="imageUrl"
          className="input-bordered input mb-3 w-full"
          required
          placeholder="Image URL"
        />
        <input
          type="number"
          name="price"
          className="input-bordered input mb-3 w-full"
          required
          placeholder="Price"
        />
        <FormSubmitButton className="btn-block">Add product</FormSubmitButton>
      </form>
    </div>
  );
}
