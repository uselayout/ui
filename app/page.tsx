import { Button } from "@/registry/layout/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/layout/card/card";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-8 p-12">
      <h1 className="font-display text-3xl font-semibold">Layout UI</h1>
      <div className="flex flex-wrap gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Reskinnable by design</CardTitle>
          <CardDescription>
            Every component consumes semantic tokens only. Swap the brand,
            keep the markup.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            This card re-skins entirely from the token contract.
          </p>
        </CardContent>
        <CardFooter className="gap-2">
          <Button size="sm">Confirm</Button>
          <Button size="sm" variant="outline">
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
