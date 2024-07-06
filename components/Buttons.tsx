import { cn } from "@/lib";
import Link from "next/link";
import { ComponentProps } from "react";

export type Varianted = {
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "danger"
    | "warning"
    | "success"
    | "info"
    | "light"
    | "dark";
};

export type ButtonProps = Varianted & ComponentProps<"button">;

export function Button(props: ButtonProps) {
  let css = "rounded-lg px-4 py-2 flex gap-2";
  css = variantCss(css, props.variant ?? "primary");
  return (
    <button {...props} className={cn(css, props.className)}>
      {props.children}
    </button>
  );
}

export type ButtonLinkProps = Varianted &
  ComponentProps<"a"> & { href: string };
export function ButtonLink(props: ButtonLinkProps) {
  let css = "rounded-lg px-4 py-2 flex gap-2";
  css = variantCss(css, props.variant ?? "primary");
  return (
    <Link {...props} className={cn(css, props.className)}>
      {props.children}
    </Link>
  );
}

function variantCss(css: string, variant: string | undefined): string {
  switch (variant) {
    case "primary":
      css += " bg-blue-500 text-white hover:bg-blue-600";
      css += " [&_*]:stroke-white";
      break;
    case "secondary":
      css += " bg-slate-500 text-white hover:bg-slate-600";
      css += " [&_*]:stroke-white";
      break;
    case "tertiary":
      css += " bg-slate-200 text-slate-600 hover:bg-slate-300";
      css += " [&_*]:stroke-slate-600";
      break;
    case "danger":
      css += " bg-red-500 text-white hover:bg-red-600";
      css += " [&_*]:stroke-white";
      break;
    case "warning":
      css += " bg-yellow-500 text-white hover:bg-yellow-600";
      css += " [&_*]:stroke-white";
      break;
    case "success":
      css += " bg-green-500 text-white hover:bg-green-600";
      css += " [&_*]:stroke-white";
      break;
    case "info":
      css += " bg-blue-500 text-white hover:bg-blue-600";
      css += " [&_*]:stroke-white";
      break;
    case "light":
      css += " bg-slate-50 text-slate-600 hover:bg-slate-100";
      css += " [&_*]:stroke-slate-600";
      break;
    case "dark":
      css += " bg-slate-600 text-white hover:bg-slate-900";
      css += " [&_*]:stroke-white";
      break;
    default:
      css += " bg-slate-500 text-white hover:bg-slate-600";
      css += " [&_*]:stroke-white";
      break;
  }

  return css;
}
