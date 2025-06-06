import Link from "next/link";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductImage from "@/components/ProductImage"; 
import { Button } from "@/components/ui/button";
import Pagination from "@/components/Pagination";

import { getProducts } from "@/lib/admin/actions/product";

const Page = async ({ searchParams }: PageProps) => {
  const { query, sort, page } = await searchParams;

  const { data: allProducts, metadata } = await getProducts({
    query,
    sort,
    page,
  });

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Products</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/products/new">+ Create a New Product</Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <Table className="overflow-hidden">
          <TableHeader>
            <TableRow className="h-14 border-none bg-light-300">
              <TableHead className="w-[500px]">Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>View</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {allProducts?.length > 0 ? (
              allProducts?.map((product) => (
                <TableRow key={product.id} className="border-b-dark-100/5">
                  <TableCell className="py-5 font-medium">
                    <div className="flex w-96 flex-row items-center gap-2 text-sm font-semibold text-dark-400">
                      <ProductImage
                        variant="extraSmall"
                        imageUrl={product.imageUrl}
                      />
                      <p className="flex-1">{product.name}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-dark-200">
                    {product.category}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-dark-200">
                    ${product.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-dark-200">
                    {product.totalStock}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-dark-200">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button asChild className="view-btn !shadow">
                      <Link href={`/admin/products/${product.id}`}>View</Link>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-row items-center gap-3.5">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="relative size-5"
                      >
                        <Image
                          src="/icons/admin/edit.svg"
                          fill
                          className="object-contain"
                          alt="edit"
                        />
                      </Link>
                      <Image
                        src="/icons/admin/trash.svg"
                        width={20}
                        height={20}
                        className="object-contain"
                        alt="delete"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="pt-10 text-center">
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-8">
        <Pagination variant="light" hasNextPage={metadata?.hasNextPage} />
      </div>
    </section>
  );
};

export default Page;
