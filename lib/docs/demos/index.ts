// GENERATED FILE — do not edit. Regenerate with: node scripts/gen-demo-index.mjs
import type * as React from "react";

import * as accordionDemos from "./accordion";
import * as alertDemos from "./alert";
import * as alertDialogDemos from "./alert-dialog";
import * as aspectRatioDemos from "./aspect-ratio";
import * as avatarDemos from "./avatar";
import * as badgeDemos from "./badge";
import * as breadcrumbDemos from "./breadcrumb";
import * as buttonDemos from "./button";
import * as buttonGroupDemos from "./button-group";
import * as calendarDemos from "./calendar";
import * as cardDemos from "./card";
import * as carouselDemos from "./carousel";
import * as chartDemos from "./chart";
import * as checkboxDemos from "./checkbox";
import * as collapsibleDemos from "./collapsible";
import * as comboboxDemos from "./combobox";
import * as contextMenuDemos from "./context-menu";
import * as dataTableDemos from "./data-table";
import * as datePickerDemos from "./date-picker";
import * as dialogDemos from "./dialog";
import * as drawerDemos from "./drawer";
import * as dropdownMenuDemos from "./dropdown-menu";
import * as emptyDemos from "./empty";
import * as fieldDemos from "./field";
import * as hoverCardDemos from "./hover-card";
import * as inputDemos from "./input";
import * as inputGroupDemos from "./input-group";
import * as inputOtpDemos from "./input-otp";
import * as itemDemos from "./item";
import * as kbdDemos from "./kbd";
import * as labelDemos from "./label";
import * as menubarDemos from "./menubar";
import * as nativeSelectDemos from "./native-select";
import * as navigationMenuDemos from "./navigation-menu";
import * as paginationDemos from "./pagination";
import * as popoverDemos from "./popover";
import * as progressDemos from "./progress";
import * as radioGroupDemos from "./radio-group";
import * as resizableDemos from "./resizable";
import * as scrollAreaDemos from "./scroll-area";
import * as selectDemos from "./select";
import * as separatorDemos from "./separator";
import * as sheetDemos from "./sheet";
import * as skeletonDemos from "./skeleton";
import * as sliderDemos from "./slider";
import * as spinnerDemos from "./spinner";
import * as switchDemos from "./switch";
import * as tableDemos from "./table";
import * as tabsDemos from "./tabs";
import * as textareaDemos from "./textarea";
import * as toastDemos from "./toast";
import * as toggleDemos from "./toggle";
import * as toggleGroupDemos from "./toggle-group";
import * as tooltipDemos from "./tooltip";

export interface DemoEntry {
  title: string;
  component: React.ReactNode;
  code: string;
}

interface DemoModule {
  demos: DemoEntry[];
  importLine?: string;
}

export const demoRegistry: Record<string, DemoModule> = {
  "accordion": accordionDemos,
  "alert": alertDemos,
  "alert-dialog": alertDialogDemos,
  "aspect-ratio": aspectRatioDemos,
  "avatar": avatarDemos,
  "badge": badgeDemos,
  "breadcrumb": breadcrumbDemos,
  "button": buttonDemos,
  "button-group": buttonGroupDemos,
  "calendar": calendarDemos,
  "card": cardDemos,
  "carousel": carouselDemos,
  "chart": chartDemos,
  "checkbox": checkboxDemos,
  "collapsible": collapsibleDemos,
  "combobox": comboboxDemos,
  "context-menu": contextMenuDemos,
  "data-table": dataTableDemos,
  "date-picker": datePickerDemos,
  "dialog": dialogDemos,
  "drawer": drawerDemos,
  "dropdown-menu": dropdownMenuDemos,
  "empty": emptyDemos,
  "field": fieldDemos,
  "hover-card": hoverCardDemos,
  "input": inputDemos,
  "input-group": inputGroupDemos,
  "input-otp": inputOtpDemos,
  "item": itemDemos,
  "kbd": kbdDemos,
  "label": labelDemos,
  "menubar": menubarDemos,
  "native-select": nativeSelectDemos,
  "navigation-menu": navigationMenuDemos,
  "pagination": paginationDemos,
  "popover": popoverDemos,
  "progress": progressDemos,
  "radio-group": radioGroupDemos,
  "resizable": resizableDemos,
  "scroll-area": scrollAreaDemos,
  "select": selectDemos,
  "separator": separatorDemos,
  "sheet": sheetDemos,
  "skeleton": skeletonDemos,
  "slider": sliderDemos,
  "spinner": spinnerDemos,
  "switch": switchDemos,
  "table": tableDemos,
  "tabs": tabsDemos,
  "textarea": textareaDemos,
  "toast": toastDemos,
  "toggle": toggleDemos,
  "toggle-group": toggleGroupDemos,
  "tooltip": tooltipDemos,
};

export const importLines: Record<string, string> = Object.fromEntries(
  Object.entries(demoRegistry)
    .filter(([, m]) => m.importLine)
    .map(([slug, m]) => [slug, m.importLine as string])
);
