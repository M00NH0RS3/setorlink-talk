import * as React from "react";
import type { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgSend = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 26 26"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="#A8A8A8"
      d="m1.125.095 23.956 12.053a.804.804 0 0 1 0 1.428L1.126 25.628a.773.773 0 0 1-1.045-.362.8.8 0 0 1-.054-.556L2.4 15.56a.79.79 0 0 1 .626-.583l10.736-1.827a.39.39 0 0 0 .292-.232l.028-.096a.4.4 0 0 0-.234-.432l-.086-.026-10.797-1.837a.79.79 0 0 1-.626-.582L.026 1.013A.8.8 0 0 1 .581.04a.77.77 0 0 1 .544.055"
    />
  </svg>
);
export default SvgSend;
