"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/layout/carousel/carousel";

export const importLine = `import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"`;

const items = [
  { id: 1, title: "Colours", description: "Extract colour palettes and intent tokens" },
  { id: 2, title: "Typography", description: "Capture font families, sizes, and weights" },
  { id: 3, title: "Spacing", description: "Document spacing scales and grid systems" },
  { id: 4, title: "Components", description: "Map reusable component patterns" },
  { id: 5, title: "Effects", description: "Preserve shadow, blur, and border styles" },
];

function CardCarousel() {
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.id}>
            <div className="p-1">
              <div className="flex aspect-square items-center justify-center rounded-lg border border-border bg-card p-6">
                <div className="text-center">
                  <p className="text-2xl font-semibold">{item.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

function VerticalCarousel() {
  return (
    <Carousel orientation="vertical" className="w-full max-w-xs" opts={{ align: "start" }}>
      <CarouselContent className="-mt-1 h-[200px]">
        {items.map((item) => (
          <CarouselItem key={item.id} className="pt-1 basis-1/3">
            <div className="flex h-full items-center justify-center rounded-md border border-border bg-card p-3">
              <p className="text-sm font-medium">{item.title}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export const demos = [
  {
    title: "Card slides",
    component: <CardCarousel />,
    code: `<Carousel className="w-full max-w-sm">
  <CarouselContent>
    {items.map((item) => (
      <CarouselItem key={item.id}>
        <div className="flex aspect-square items-center justify-center rounded-lg border border-border bg-card p-6">
          <p className="text-2xl font-semibold">{item.title}</p>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
  },
  {
    title: "Vertical",
    component: <VerticalCarousel />,
    code: `<Carousel orientation="vertical" opts={{ align: "start" }}>
  <CarouselContent className="-mt-1 h-[200px]">
    {items.map((item) => (
      <CarouselItem key={item.id} className="pt-1 basis-1/3">
        <div className="flex h-full items-center justify-center rounded-md border border-border bg-card p-3">
          <p className="text-sm font-medium">{item.title}</p>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
  },
];
