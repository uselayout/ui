import * as React from "react";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/registry/layout/avatar/avatar";

export const importLine =
  `import { Avatar, AvatarImage, AvatarFallback } from "@/registry/layout/avatar/avatar";`;

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

export const demos: Demo[] = [
  {
    title: "With image",
    component: (
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="https://github.com/radix-ui.png"
            alt="Radix UI"
          />
          <AvatarFallback>RX</AvatarFallback>
        </Avatar>
      </div>
    ),
    code: `<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`,
  },
  {
    title: "Fallback initials",
    component: (
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>MK</AvatarFallback>
        </Avatar>
      </div>
    ),
    code: `<Avatar>
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
<Avatar>
  <AvatarFallback>AB</AvatarFallback>
</Avatar>`,
  },
  {
    title: "Avatar stack",
    component: (
      <div className="flex -space-x-3">
        {["JD", "AB", "MK", "PQ"].map((initials) => (
          <Avatar
            key={initials}
            className="size-9 ring-2 ring-background"
          >
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
        ))}
      </div>
    ),
    code: `<div className="flex -space-x-3">
  {["JD", "AB", "MK", "PQ"].map((initials) => (
    <Avatar key={initials} className="size-9 ring-2 ring-background">
      <AvatarFallback className="text-xs">{initials}</AvatarFallback>
    </Avatar>
  ))}
</div>`,
  },
];
