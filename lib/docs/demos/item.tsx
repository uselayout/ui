import * as React from "react";
import { Bell, File, MessageSquare, Settings, Star, Trash2 } from "lucide-react";

import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemGroup,
  ItemSeparator,
} from "@/registry/layout/item/item";
import { Button } from "@/registry/layout/button/button";

export const importLine =
  `import { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemGroup, ItemSeparator } from "@/registry/layout/item/item";`;

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

export const demos: Demo[] = [
  {
    title: "Notification list",
    component: (
      <div className="w-full max-w-sm rounded-lg border">
        <ItemGroup>
          <Item>
            <ItemMedia>
              <Bell className="size-4" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>New comment on your post</ItemTitle>
              <ItemDescription>Jane left a reply 2 minutes ago</ItemDescription>
            </ItemContent>
            <ItemActions>
              <span className="size-2 rounded-full bg-primary" />
            </ItemActions>
          </Item>
          <ItemSeparator />
          <Item>
            <ItemMedia>
              <MessageSquare className="size-4" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Team mention in #general</ItemTitle>
              <ItemDescription>Alex mentioned the team 1 hour ago</ItemDescription>
            </ItemContent>
          </Item>
          <ItemSeparator />
          <Item>
            <ItemMedia>
              <Star className="size-4" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Your project was starred</ItemTitle>
              <ItemDescription>layout-ui received 12 new stars</ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      </div>
    ),
    code: `<ItemGroup>
  <Item>
    <ItemMedia><Bell className="size-4" /></ItemMedia>
    <ItemContent>
      <ItemTitle>New comment on your post</ItemTitle>
      <ItemDescription>Jane left a reply 2 minutes ago</ItemDescription>
    </ItemContent>
    <ItemActions>
      <span className="size-2 rounded-full bg-primary" />
    </ItemActions>
  </Item>
  <ItemSeparator />
  <Item>
    <ItemMedia><MessageSquare className="size-4" /></ItemMedia>
    <ItemContent>
      <ItemTitle>Team mention in #general</ItemTitle>
      <ItemDescription>Alex mentioned the team 1 hour ago</ItemDescription>
    </ItemContent>
  </Item>
</ItemGroup>`,
  },
  {
    title: "File list with actions",
    component: (
      <div className="w-full max-w-sm space-y-1">
        {["design-system.pdf", "brand-guidelines.zip", "logo-assets.svg"].map(
          (file) => (
            <Item key={file} variant="outline">
              <ItemMedia>
                <File className="size-4" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{file}</ItemTitle>
                <ItemDescription>Uploaded today</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="ghost" size="icon" aria-label="Delete file">
                  <Trash2 className="size-4" />
                </Button>
              </ItemActions>
            </Item>
          )
        )}
      </div>
    ),
    code: `<Item variant="outline">
  <ItemMedia><File className="size-4" /></ItemMedia>
  <ItemContent>
    <ItemTitle>design-system.pdf</ItemTitle>
    <ItemDescription>Uploaded today</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button variant="ghost" size="icon" aria-label="Delete file">
      <Trash2 className="size-4" />
    </Button>
  </ItemActions>
</Item>`,
  },
  {
    title: "Settings navigation",
    component: (
      <div className="w-56 rounded-lg border p-1">
        <ItemGroup>
          <Item className="cursor-pointer">
            <ItemMedia className="bg-transparent">
              <Settings className="size-4" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>General</ItemTitle>
            </ItemContent>
          </Item>
          <Item className="cursor-pointer">
            <ItemMedia className="bg-transparent">
              <Bell className="size-4" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Notifications</ItemTitle>
            </ItemContent>
          </Item>
        </ItemGroup>
      </div>
    ),
    code: `<div className="rounded-lg border p-1">
  <Item className="cursor-pointer">
    <ItemMedia className="bg-transparent"><Settings className="size-4" /></ItemMedia>
    <ItemContent><ItemTitle>General</ItemTitle></ItemContent>
  </Item>
  <Item className="cursor-pointer">
    <ItemMedia className="bg-transparent"><Bell className="size-4" /></ItemMedia>
    <ItemContent><ItemTitle>Notifications</ItemTitle></ItemContent>
  </Item>
</div>`,
  },
];
