// Import statements for the original demo modules that predate the
// per-module `importLine` export. Newer modules export their own.
export const baseImportLines: Record<string, string> = {
  button: `import { Button } from "@/components/ui/button"`,
  badge: `import { Badge } from "@/components/ui/badge"`,
  card: `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card"`,
  input: `import { Input } from "@/components/ui/input"`,
  textarea: `import { Textarea } from "@/components/ui/textarea"`,
  label: `import { Label } from "@/components/ui/label"`,
  separator: `import { Separator } from "@/components/ui/separator"`,
  skeleton: `import { Skeleton } from "@/components/ui/skeleton"`,
  alert: `import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert"`,
  table: `import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table"`,
  spinner: `import { Spinner } from "@/components/ui/spinner"`,
  kbd: `import { Kbd, KbdGroup } from "@/components/ui/kbd"`,
};
