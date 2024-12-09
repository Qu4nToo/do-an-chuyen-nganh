import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function CarouselDemo() {
  // Array of image sources for the carousel items
  const images = [
    "/banner1.png",
    "/banner1.png",
    "/banner1.png",
    "/banner1.png",
    "/banner1.png",
  ]

  return (
    <Carousel className="w-full ">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
            <Card className="border-0"> {/* Removed border */}
              <Card>
                <CardContent className=" items-center justify-center ">
                  <img
                    src={image}
                    alt={`Banner ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </CardContent>
                </Card>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
