"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { InputHTMLAttributes, SelectHTMLAttributes, useCallback } from "react";

type TextFilterProps = InputHTMLAttributes<HTMLInputElement>;
export function TextFilter(props: TextFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    router.push(
      pathname +
        "?" +
        createQueryString(props.name ?? "", e.currentTarget.value)
    );
  };

  return (
    <>
      <input
        {...props}
        defaultValue={searchParams.get(props.name ?? "") ?? ""}
        onKeyUp={handleKeyUp}
      />
    </>
  );
}

export type SelectOption = {
  label: string;
  value: string;
};
type SelectFilterProps = {
  options: SelectOption[];
} & SelectHTMLAttributes<HTMLSelectElement>;

export function SelectFilter(props: SelectFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <>
      <select
        {...props}
        value={searchParams.get(props.name ?? "") || ""}
        onChange={(e) => {
          router.push(
            pathname + "?" + createQueryString(props.name ?? "", e.target.value)
          );
        }}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}
