"use client";

import * as React from "react";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "@/registry/layout/select/select";

export const importLine =
  `import { Select, SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectSeparator } from "@/registry/layout/select/select";`;

export interface Demo {
  title: string;
  component: React.ReactNode;
  code: string;
}

const timezones: { region: string; zones: { value: string; label: string }[] }[] =
  [
    {
      region: "Americas",
      zones: [
        { value: "America/New_York", label: "New York (UTC-5)" },
        { value: "America/Chicago", label: "Chicago (UTC-6)" },
        { value: "America/Denver", label: "Denver (UTC-7)" },
        { value: "America/Los_Angeles", label: "Los Angeles (UTC-8)" },
      ],
    },
    {
      region: "Europe",
      zones: [
        { value: "Europe/London", label: "London (UTC+0)" },
        { value: "Europe/Paris", label: "Paris (UTC+1)" },
        { value: "Europe/Berlin", label: "Berlin (UTC+1)" },
        { value: "Europe/Helsinki", label: "Helsinki (UTC+2)" },
      ],
    },
    {
      region: "Asia / Pacific",
      zones: [
        { value: "Asia/Tokyo", label: "Tokyo (UTC+9)" },
        { value: "Asia/Singapore", label: "Singapore (UTC+8)" },
        { value: "Australia/Sydney", label: "Sydney (UTC+11)" },
      ],
    },
  ];

export const demos: Demo[] = [
  {
    title: "Timezone picker",
    component: (
      <Select<string> defaultValue="Europe/London">
        <SelectTrigger className="w-64" placeholder="Select timezone" />
        <SelectContent>
          {timezones.map((group, idx) => (
            <React.Fragment key={group.region}>
              {idx > 0 && <SelectSeparator />}
              <SelectGroup>
                <SelectLabel>{group.region}</SelectLabel>
                {group.zones.map((tz) => (
                  <SelectItem key={tz.value} value={tz.value}>
                    {tz.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </React.Fragment>
          ))}
        </SelectContent>
      </Select>
    ),
    code: `<Select defaultValue="Europe/London">
  <SelectTrigger className="w-64" placeholder="Select timezone" />
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Europe</SelectLabel>
      <SelectItem value="Europe/London">London (UTC+0)</SelectItem>
      <SelectItem value="Europe/Paris">Paris (UTC+1)</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Americas</SelectLabel>
      <SelectItem value="America/New_York">New York (UTC-5)</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`,
  },
  {
    title: "Plan selector",
    component: (
      <Select<string> defaultValue="pro">
        <SelectTrigger className="w-48" />
        <SelectContent>
          <SelectItem value="free">Free</SelectItem>
          <SelectItem value="pro">Pro</SelectItem>
          <SelectItem value="team">Team</SelectItem>
          <SelectItem value="enterprise">Enterprise</SelectItem>
        </SelectContent>
      </Select>
    ),
    code: `<Select defaultValue="pro">
  <SelectTrigger className="w-48" />
  <SelectContent>
    <SelectItem value="free">Free</SelectItem>
    <SelectItem value="pro">Pro</SelectItem>
    <SelectItem value="team">Team</SelectItem>
    <SelectItem value="enterprise">Enterprise</SelectItem>
  </SelectContent>
</Select>`,
  },
  {
    title: "Disabled state",
    component: (
      <Select<string> disabled defaultValue="pro">
        <SelectTrigger className="w-48" />
        <SelectContent>
          <SelectItem value="pro">Pro</SelectItem>
        </SelectContent>
      </Select>
    ),
    code: `<Select disabled defaultValue="pro">
  <SelectTrigger className="w-48" />
  <SelectContent>
    <SelectItem value="pro">Pro</SelectItem>
  </SelectContent>
</Select>`,
  },
];
