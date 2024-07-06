import { ComponentProps } from "react";

export type CardProps = ComponentProps<"div">;
export default function Card({ children }: CardProps) {
  return (
    <div className="flex flex-col border border-slate-200 w-96 rounded-lg p-4 gap-4">
      {children}
    </div>
  );
}
