import { PropsWithChildren, ReactNode } from "react";

export type FilterBarProps = {
  filters: {
    label: string;
    htmlFor: string;
    filter: ReactNode;
  }[];
};
export function FilterBar({ filters }: FilterBarProps) {
  return (
    <div className="w-full flex items-center justify-start py-4 gap-4">
      {filters.map((filter, index) => (
        <div key={index} className="flex items-center gap-2">
          <label htmlFor={filter.htmlFor}>{filter.label}</label>
          {filter.filter}
        </div>
      ))}
    </div>
  );
}

export type PageHeaderProps = {
  title: string;
  actions: ReactNode;
};
export function PageHeader({ title, actions }: PageHeaderProps) {
  return (
    <div className="w-full flex justify-between py-4">
      <h1>{title}</h1>
      {actions}
    </div>
  );
}

export type CardGridProps = PropsWithChildren;
export function CardGrid({ children }: CardGridProps) {
  return <div className="grid grid-cols-3 gap-4">{children}</div>;
}
