import type { ReactNode, SVGProps } from 'react';

type IconProps = Omit<SVGProps<SVGSVGElement>, 'children'> & { size?: number };

function createIcon(viewBox: string, children: ReactNode, strokeWidth = 1.5) {
  return function Icon({ size = 24, ...rest }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        {...rest}
      >
        {children}
      </svg>
    );
  };
}

export const ShieldIcon = createIcon(
  '0 0 24 24',
  <>
    <path d="M12 3l7 3v5.5c0 4.3-3 7.7-7 9.5-4-1.800-7-5.200-7-9.500V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </>,
);
export const TruckIcon = createIcon(
  '0 0 24 24',
  <>
    <path d="M2 6.500h12V16H2zM14 10h4l3 3.200V16h-7" />
    <circle cx="6.500" cy="17.500" r="1.800" />
    <circle cx="17" cy="17.500" r="1.800" />
  </>,
);
export const CardIcon = createIcon(
  '0 0 24 24',
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 10h18M6.500 15h4" />
  </>,
);
export const SearchIcon = createIcon(
  '0 0 24 24',
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="M16.500 16.500L21 21" />
  </>,
);
export const OrdersIcon = createIcon(
  '0 0 24 24',
  <>
    <path d="M3 8l2-4h14l2 4v12H3z" />
    <path d="M3 8h18M16 13h-6M12.500 10.500L10 13l2.500 2.500" />
  </>,
);
export const HeartIcon = createIcon(
  '0 0 24 24',
  <path d="M12 20.500s-8-4.800-9.500-10A5 5 0 0 1 12 7.500a5 5 0 0 1 9.500 3c-1.500 5.200-9.500 10-9.500 10z" />,
);
export const UserIcon = createIcon(
  '0 0 24 24',
  <>
    <circle cx="12" cy="12" r="9.500" />
    <circle cx="12" cy="10" r="3" />
    <path d="M6 18.500c1.800-3.200 10.200-3.200 12 0" />
  </>,
);
export const CartIcon = createIcon(
  '0 0 24 24',
  <>
    <path d="M2.500 4h3l2.600 11h9.800l2.200-8.500H6.500" />
    <circle cx="9.500" cy="19" r="1.400" />
    <circle cx="17" cy="19" r="1.400" />
  </>,
);
export const CrownIcon = createIcon(
  '0 0 24 24',
  <path d="M3 8l4.500 4L12 5l4.500 7L21 8l-1.500 11h-15zM5 16h14" />,
);
export const MenuIcon = createIcon('0 0 24 24', <path d="M4 6h16M4 12h16M4 18h16" />, 1.8);
export const ChevronLeftIcon = createIcon('0 0 24 24', <path d="M14.500 6l-6 6 6 6" />, 2);
export const ChevronRightIcon = createIcon('0 0 24 24', <path d="M9.500 6l6 6-6 6" />, 2);
export const CloseIcon = createIcon('0 0 24 24', <path d="M5 5l14 14M19 5L5 19" />, 1.600);
export const MinusIcon = createIcon('0 0 24 24', <path d="M5 12h14" />, 1.600);
export const PlusIcon = createIcon('0 0 24 24', <path d="M5 12h14M12 5v14" />, 1.800);

export const InstagramIcon = createIcon(
  '0 0 24 24',
  <>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.200" cy="6.800" r=".6" fill="currentColor" />
  </>,
);
export const FacebookIcon = createIcon(
  '0 0 24 24',
  <path d="M15 3h-2.500A3.500 3.500 0 0 0 9 6.500V9H6v4h3v8h4v-8h3l1-4h-4V6.500c0-.3.2-.5.500-.5H15z" />,
);
export const LinkedinIcon = createIcon(
  '0 0 24 24',
  <>
    <rect x="3" y="9" width="4" height="12" />
    <circle cx="5" cy="5" r="2" />
    <path d="M10 9h4v2c.8-1.400 2.200-2.200 4-2.200 3 0 3.500 2 3.500 4.700V21h-4v-6.500c0-1.400-.4-2.200-1.700-2.200-1.400 0-2 1-2 2.300V21h-4z" />
  </>,
);

export const DevicesIcon = createIcon(
  '0 0 64 64',
  <>
    <rect x="6" y="10" width="40" height="28" rx="2" />
    <path d="M6 32h40M20 38l-2 8M32 38l2 8M14 46h24" />
    <rect x="42" y="26" width="14" height="26" rx="2" />
    <path d="M47 47h4" />
  </>,
  3,
);
export const StoreIcon = createIcon(
  '0 0 64 64',
  <>
    <path d="M8 22l4-12h40l4 12M8 22c0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0" />
    <path d="M10 30v24h44V30M38 38h10v16H38M16 40h14l-2 8H18zM18 52h.1M26 52h.1" />
  </>,
  2.500,
);
export const BottleIcon = createIcon(
  '0 0 64 64',
  <>
    <path d="M26 6h8v8l4 7v35H22V21l4-7z" />
    <rect x="26" y="30" width="8" height="14" />
    <path d="M42 40h12v16H42z" />
  </>,
  2.500,
);
export const ToolsIcon = createIcon(
  '0 0 64 64',
  <>
    <path d="M10 54L40 24M54 54L24 24" />
    <path d="M10 14l6-6 12 12-6 6zM36 20l8-8 10 10-8 8" />
  </>,
  2.500,
);
export const HealthIcon = createIcon(
  '0 0 64 64',
  <>
    <path d="M32 26s-10-6-10-13a6 6 0 0 1 10-4 6 6 0 0 1 10 4c0 7-10 13-10 13z" />
    <path d="M6 46h10l10 4 12-2 8-4a3 3 0 0 1 3 5l-12 8-14 2-12-4H6z" />
  </>,
  2.500,
);
export const FitnessIcon = createIcon(
  '0 0 64 64',
  <>
    <circle cx="40" cy="12" r="4" />
    <path d="M38 20l-8 12 8 6-2 12M30 32l-8-2M38 20l8 8M14 22v34M8 56h50M14 22h8" />
  </>,
  2.500,
);
export const FashionIcon = createIcon(
  '0 0 64 64',
  <>
    <path d="M24 6l4 8 4-8M28 14l-6 16 -10 24h36l-8-24-6-16" />
    <path d="M44 14l4-5h8l-2 6-6 8z" />
  </>,
  2.500,
);
