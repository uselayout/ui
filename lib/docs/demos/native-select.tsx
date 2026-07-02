import * as React from "react";

import { NativeSelect } from "@/registry/layout/native-select/native-select";
import { Label } from "@/registry/layout/label/label";

export const importLine = `import { NativeSelect } from "@/components/ui/native-select"`;

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

export const demos: Demo[] = [
  {
    title: "Default",
    component: (
      <div className="flex flex-col gap-2 w-full max-w-sm">
        <Label htmlFor="country">Country</Label>
        <NativeSelect id="country" defaultValue="">
          <option value="" disabled>Select a country</option>
          <option value="gb">United Kingdom</option>
          <option value="us">United States</option>
          <option value="de">Germany</option>
          <option value="fr">France</option>
          <option value="jp">Japan</option>
        </NativeSelect>
      </div>
    ),
    code: `<div className="flex flex-col gap-2">
  <Label htmlFor="country">Country</Label>
  <NativeSelect id="country" defaultValue="">
    <option value="" disabled>Select a country</option>
    <option value="gb">United Kingdom</option>
    <option value="us">United States</option>
    <option value="de">Germany</option>
    <option value="fr">France</option>
  </NativeSelect>
</div>`,
  },
  {
    title: "With option groups",
    component: (
      <div className="flex flex-col gap-2 w-full max-w-sm">
        <Label htmlFor="timezone">Timezone</Label>
        <NativeSelect id="timezone" defaultValue="Europe/London">
          <optgroup label="Europe">
            <option value="Europe/London">London (GMT+0)</option>
            <option value="Europe/Paris">Paris (GMT+1)</option>
            <option value="Europe/Berlin">Berlin (GMT+1)</option>
          </optgroup>
          <optgroup label="Americas">
            <option value="America/New_York">New York (GMT-5)</option>
            <option value="America/Los_Angeles">Los Angeles (GMT-8)</option>
          </optgroup>
          <optgroup label="Asia Pacific">
            <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
            <option value="Australia/Sydney">Sydney (GMT+11)</option>
          </optgroup>
        </NativeSelect>
      </div>
    ),
    code: `<NativeSelect id="timezone" defaultValue="Europe/London">
  <optgroup label="Europe">
    <option value="Europe/London">London (GMT+0)</option>
    <option value="Europe/Paris">Paris (GMT+1)</option>
  </optgroup>
  <optgroup label="Americas">
    <option value="America/New_York">New York (GMT-5)</option>
  </optgroup>
</NativeSelect>`,
  },
  {
    title: "Sizes",
    component: (
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <NativeSelect defaultValue="default">
          <option value="default">Default size</option>
        </NativeSelect>
        <NativeSelect defaultValue="small" className="h-8 text-xs">
          <option value="small">Small override</option>
        </NativeSelect>
      </div>
    ),
    code: `<NativeSelect defaultValue="default">
  <option value="default">Default size</option>
</NativeSelect>
<NativeSelect defaultValue="small" className="h-8 text-xs">
  <option value="small">Small override</option>
</NativeSelect>`,
  },
  {
    title: "Disabled",
    component: (
      <div className="flex flex-col gap-2 w-full max-w-sm">
        <Label htmlFor="role-disabled">Role</Label>
        <NativeSelect id="role-disabled" disabled defaultValue="admin">
          <option value="admin">Administrator</option>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </NativeSelect>
      </div>
    ),
    code: `<NativeSelect id="role-disabled" disabled defaultValue="admin">
  <option value="admin">Administrator</option>
  <option value="editor">Editor</option>
  <option value="viewer">Viewer</option>
</NativeSelect>`,
  },
];
