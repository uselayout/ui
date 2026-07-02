import * as React from "react";

import { AspectRatio } from "@/registry/layout/aspect-ratio/aspect-ratio";

export const importLine =
  `import { AspectRatio } from "@/registry/layout/aspect-ratio/aspect-ratio";`;

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

export const demos: Demo[] = [
  {
    title: "16:9 image",
    component: (
      <div className="w-full max-w-sm overflow-hidden rounded-lg">
        <AspectRatio ratio={16 / 9}>
          <img
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800"
            alt="Photo by Drew Beamer"
            className="size-full object-cover"
          />
        </AspectRatio>
      </div>
    ),
    code: `<div className="overflow-hidden rounded-lg">
  <AspectRatio ratio={16 / 9}>
    <img
      src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800"
      alt="Photo by Drew Beamer"
      className="size-full object-cover"
    />
  </AspectRatio>
</div>`,
  },
  {
    title: "Square thumbnail",
    component: (
      <div className="w-32 overflow-hidden rounded-md">
        <AspectRatio ratio={1}>
          <div className="flex size-full items-center justify-center bg-muted text-muted-foreground text-sm">
            1:1
          </div>
        </AspectRatio>
      </div>
    ),
    code: `<div className="w-32 overflow-hidden rounded-md">
  <AspectRatio ratio={1}>
    <img src="thumbnail.jpg" alt="Thumbnail" className="size-full object-cover" />
  </AspectRatio>
</div>`,
  },
  {
    title: "Video embed",
    component: (
      <div className="w-full max-w-sm overflow-hidden rounded-lg bg-muted">
        <AspectRatio ratio={16 / 9}>
          <div className="flex size-full items-center justify-center text-muted-foreground text-sm">
            Video player placeholder
          </div>
        </AspectRatio>
      </div>
    ),
    code: `<AspectRatio ratio={16 / 9}>
  <iframe
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    className="size-full"
    allowFullScreen
  />
</AspectRatio>`,
  },
];
