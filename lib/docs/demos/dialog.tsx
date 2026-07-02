"use client";

import * as React from "react";
import { useState } from "react";

import { Button } from "@/registry/layout/button/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/registry/layout/dialog/dialog";

export const importLine = `import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"`;

function EditProfileDialog() {
  const [name, setName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex@example.com");

  return (
    <Dialog>
      <DialogTrigger render={<Button>Edit profile</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Update your display name and email address. Changes are saved
            immediately.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Display name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-9 rounded-md border border-input bg-transparent px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-9 rounded-md border border-input bg-transparent px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <DialogClose render={<Button>Save changes</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SimpleDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="secondary">Learn more</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>About Layout UI</DialogTitle>
          <DialogDescription>
            Layout UI is a component library built on Base UI primitives and the
            Layout design token system.
          </DialogDescription>
        </DialogHeader>
        <p className="mt-2 text-sm text-muted-foreground">
          Every component follows the token contract defined in globals.css.
          Tokens cascade from the Layout namespace into shadcn-compatible
          utilities, so your theme always wins.
        </p>
        <DialogFooter>
          <DialogClose render={<Button>Got it</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const demos = [
  {
    title: "Edit profile",
    component: <EditProfileDialog />,
    code: `<Dialog>
  <DialogTrigger render={<Button>Edit profile</Button>} />
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Update your display name and email address.
      </DialogDescription>
    </DialogHeader>
    <div className="mt-4 flex flex-col gap-4">
      <input className="h-9 rounded-md border border-input bg-transparent px-3 text-sm" />
    </div>
    <DialogFooter>
      <DialogClose render={<Button variant="outline">Cancel</Button>} />
      <DialogClose render={<Button>Save changes</Button>} />
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  },
  {
    title: "Informational",
    component: <SimpleDialog />,
    code: `<Dialog>
  <DialogTrigger render={<Button variant="secondary">Learn more</Button>} />
  <DialogContent>
    <DialogHeader>
      <DialogTitle>About Layout UI</DialogTitle>
      <DialogDescription>
        Layout UI is a component library built on Base UI primitives.
      </DialogDescription>
    </DialogHeader>
    <p className="mt-2 text-sm text-muted-foreground">
      Every component follows the token contract defined in globals.css.
    </p>
    <DialogFooter>
      <DialogClose render={<Button>Got it</Button>} />
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  },
];
