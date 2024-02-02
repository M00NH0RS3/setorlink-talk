import * as React from "react";
import type { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgCamOff = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 38 29"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="#fff"
      d="M35.834 4.882a3.06 3.06 0 0 0-3.333.54l-3.874 3.603V6.413a5.405 5.405 0 0 0-5.405-5.405H7.008a5.405 5.405 0 0 0-5.405 5.405v14.413a5.405 5.405 0 0 0 5.405 5.404h16.214a5.405 5.405 0 0 0 5.405-5.404v-2.613l3.892 3.604a3.14 3.14 0 0 0 2.09.81 3 3 0 0 0 1.243-.27 2.88 2.88 0 0 0 1.801-2.666V7.548a2.88 2.88 0 0 0-1.82-2.666m-10.81 15.944a1.8 1.8 0 0 1-1.802 1.801H7.008a1.8 1.8 0 0 1-1.802-1.801V6.413A1.8 1.8 0 0 1 7.008 4.61h16.214a1.8 1.8 0 0 1 1.802 1.802zm9.008-2.523L28.97 13.62l5.062-4.684z"
    />
    <rect
      width={4.633}
      height={40.031}
      x={31.845}
      fill="#fff"
      rx={2}
      transform="rotate(52.413 31.845 0)"
    />
  </svg>
);
export default SvgCamOff;
