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
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 19H16" className="text-primary/70" />
        <path d="M12 16V19" className="text-primary/70" />
        <path d="M5 16H19" className="text-primary" />
        <path d="M6 12C6 10.8954 6.89543 10 8 10H16C17.1046 10 18 10.8954 18 12V16H6V12Z" className="text-primary" fill="hsl(var(--card))" />
        <path d="M7 6C7 4.89543 7.89543 4 9 4H15C16.1046 4 17 4.89543 17 6V10H7V6Z" className="text-primary/80" fill="hsl(var(--card))"/>
        <path d="M12 2V4" className="text-accent"/>
      </g>
    </svg>
  );
}
