import type { SVGProps } from "react";

export const Icons = {
  cake: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
      <path d="M4 16c-1.1 0-2 .9-2 2v3h20v-3c0-1.1-.9-2-2-2H4Z" />
      <path d="M12 4c-1.1 0-2 .9-2 2v2a2 2 0 1 0 4 0V6c0-1.1-.9-2-2-2Z" />
      <path d="M12 11v2" />
      <path d="M16 11v2" />
      <path d="M8 11v2" />
    </svg>
  ),
  sweet: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m11.5 2 3.83 3.83c.94.94 2.46.94 3.4 0l2.54-2.54c.94-.94.94-2.46 0-3.4L17.44.06c-.94-.94-2.46-.94-3.4 0L11.5 2.6Z" />
      <path d="m22 12.5-2.6 2.6a3.25 3.25 0 0 1-4.6 0L12.5 13" />
      <path d="m13 12.5 2.3 2.3a3.44 3.44 0 0 1 0 4.88L12.5 22.5" />
      <path d="M2.6 11.5 6.43 7.67c.94-.94 2.46-.94 3.4 0l2.54 2.54c.94.94.94 2.46 0 3.4L8.54 17.44c-.94.94-2.46.94-3.4 0L2.6 14.9c-.94-.94-.94-2.46 0-3.4Z" />
      <path d="m11.5 13-2.3-2.3a3.44 3.44 0 0 0-4.88 0L1.5 13.5" />
      <path d="M12.5 11.5 9.7 8.7a3.25 3.25 0 0 0-4.6 0L2.5 11.5" />
    </svg>
  ),
  drink: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2v10" />
      <path d="M18.88 12h-1.12" />
      <path d="m22 14-4 4" />
      <path d="M6.24 12H5.12" />
      <path d="m2 14 4 4" />
      <path d="M12 12a5 5 0 0 0-5 5v4h10v-4a5 5 0 0 0-5-5Z" />
      <path d="M12 6a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" transform="translate(0 2)" />
    </svg>
  ),
};
