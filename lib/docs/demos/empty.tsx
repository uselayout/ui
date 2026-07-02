import * as React from "react";
import { FileText, Inbox, Search } from "lucide-react";

import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/registry/layout/empty/empty";
import { Button } from "@/registry/layout/button/button";

export const importLine =
  `import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/registry/layout/empty/empty";`;

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

export const demos: Demo[] = [
  {
    title: "No results",
    component: (
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <Search className="size-6" />
          </EmptyMedia>
          <EmptyTitle>No results found</EmptyTitle>
          <EmptyDescription>
            We could not find anything matching your search. Try adjusting your
            filters or search terms.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline">Clear filters</Button>
        </EmptyContent>
      </Empty>
    ),
    code: `<Empty>
  <EmptyHeader>
    <EmptyMedia>
      <Search className="size-6" />
    </EmptyMedia>
    <EmptyTitle>No results found</EmptyTitle>
    <EmptyDescription>
      We could not find anything matching your search.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button variant="outline">Clear filters</Button>
  </EmptyContent>
</Empty>`,
  },
  {
    title: "Empty inbox",
    component: (
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <Inbox className="size-6" />
          </EmptyMedia>
          <EmptyTitle>Your inbox is empty</EmptyTitle>
          <EmptyDescription>
            New messages from your team will appear here.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    ),
    code: `<Empty>
  <EmptyHeader>
    <EmptyMedia>
      <Inbox className="size-6" />
    </EmptyMedia>
    <EmptyTitle>Your inbox is empty</EmptyTitle>
    <EmptyDescription>
      New messages from your team will appear here.
    </EmptyDescription>
  </EmptyHeader>
</Empty>`,
  },
  {
    title: "Create your first document",
    component: (
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <FileText className="size-6" />
          </EmptyMedia>
          <EmptyTitle>No documents yet</EmptyTitle>
          <EmptyDescription>
            Create your first document to get started with your project.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Create document</Button>
        </EmptyContent>
      </Empty>
    ),
    code: `<Empty>
  <EmptyHeader>
    <EmptyMedia>
      <FileText className="size-6" />
    </EmptyMedia>
    <EmptyTitle>No documents yet</EmptyTitle>
    <EmptyDescription>
      Create your first document to get started.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Create document</Button>
  </EmptyContent>
</Empty>`,
  },
];
