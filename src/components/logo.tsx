import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
        <path
            d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"
            className="text-primary/70"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
        />
        <path
            d="M4 16c-1.1 0-2 .9-2 2v3h20v-3c0-1.1-.9-2-2-2H4Z"
            className="text-primary"
            fill="currentColor"
        />
        <path
            d="M12 4c-1.1 0-2 .9-2 2v2a2 2 0 1 0 4 0V6c0-1.1-.9-2-2-2Z"
            className="text-accent"
            fill="currentColor"
        />
    </svg>
  );
}
