import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
  };
}

export function ProductCard({ item }: iAppProps) {
  return (
    <div className="rounded-lg">
      <Carousel className="mx-auto w-full">
        <CarouselContent>
          {item.images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[330px]">
                <Image
                  src={item}
                  alt="Product Image"
                  fill
                  className="size-full rounded-lg object-cover object-center"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>

      <div className="mt-2 flex items-center justify-between">
        <h1 className="text-xl font-semibold">{item.name}</h1>
        <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10">
          ${item.price}
        </h3>
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-gray-600">
        {item.description}
      </p>

      <Button asChild className="mt-5 w-full">
        <Link href={`/product/${item.id}`}>Learn More!</Link>
      </Button>
    </div>
  );
}

export function LoadingProductCard() {
  return (
    <div className="flex flex-col">
      <Skeleton className="h-[330px] w-full" />
      <div className="mt-2 flex flex-col gap-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
      <Skeleton className="mt-5 h-10 w-full" />
    </div>
  );
}