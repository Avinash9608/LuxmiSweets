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
        d="M12 2L5.87868 8.12132C4.70711 9.29289 4.70711 11.2321 5.87868 12.4037L12 18.525L18.1213 12.4037C19.2929 11.2321 19.2929 9.29289 18.1213 8.12132L12 2Z"
        className="text-primary"
        fill="currentColor"
      />
      <path
        d="M12 2L5.87868 8.12132C4.70711 9.29289 4.70711 11.2321 5.87868 12.4037L12 18.525"
        className="text-accent"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
