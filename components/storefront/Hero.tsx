import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export async function Hero() {
    return (
      <Carousel>
        <CarouselContent>
          <CarouselItem key="1">
            <div className="relative h-[60vh] lg:h-[80vh]">
              <Image
                alt="Banner Image"
                src="/banner1.jpeg"
                fill
                className="size-full rounded-xl object-cover"
              />
              <div className="absolute left-6 top-6 rounded-xl bg-black bg-opacity-75 p-6 text-white shadow-lg transition-transform hover:scale-105">
                <h1 className="text-xl font-bold lg:text-4xl">Welcome Offer!</h1>
              </div>
            </div>
          </CarouselItem>

          <CarouselItem key="2">
            <div className="relative h-[60vh] lg:h-[80vh]">
              <Image
                alt="Banner Image"
                src="/banner2.jpeg"
                fill
                className="size-full rounded-xl object-cover"
              />
              <div className="absolute left-6 top-6 rounded-xl bg-black bg-opacity-75 p-6 text-white shadow-lg transition-transform hover:scale-105">
                <h1 className="text-xl font-bold lg:text-4xl">Grab Now</h1>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>
    );
  }