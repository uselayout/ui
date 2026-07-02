"use client";

import * as React from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/registry/layout/button/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/registry/layout/alert-dialog/alert-dialog";

export const importLine = `import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"`;

function DeleteProjectAlert() {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="destructive"><Trash2 />Delete project</Button>}
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The project and all its design tokens,
            components, and extraction history will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Delete project
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function SignOutAlert() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline">Sign out</Button>} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign out of Layout?</AlertDialogTitle>
          <AlertDialogDescription>
            You will need to sign in again to access your projects and design
            systems.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Stay signed in</AlertDialogCancel>
          <AlertDialogAction>Sign out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export const demos = [
  {
    title: "Delete confirmation",
    component: <DeleteProjectAlert />,
    code: `<AlertDialog>
  <AlertDialogTrigger
    render={<Button variant="destructive"><Trash2 />Delete project</Button>}
  />
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete project?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
        Delete project
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
  },
  {
    title: "Sign out",
    component: <SignOutAlert />,
    code: `<AlertDialog>
  <AlertDialogTrigger render={<Button variant="outline">Sign out</Button>} />
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Sign out of Layout?</AlertDialogTitle>
      <AlertDialogDescription>
        You will need to sign in again to access your projects.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Stay signed in</AlertDialogCancel>
      <AlertDialogAction>Sign out</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
  },
];
