import NextLink from 'next/link';
import MuiLink, { LinkProps } from '@mui/material/Link';
import MuiButton, { ButtonProps } from '@mui/material/Button';
import { PropsWithChildren } from 'react';

type CustomLinkProps = (Omit<ButtonProps, 'type'> | Omit<LinkProps, 'type'>) & {
  type: 'button' | 'link';
  href: string;
};

export default function Link({
  type,
  href,
  children,
  ...props
}: PropsWithChildren<CustomLinkProps>) {
  if (type === 'link' || !type) {
    return (
      <NextLink href={href} passHref>
        <MuiLink {...props as LinkProps}>{children}</MuiLink>
      </NextLink>
    );
  } /*if (type === 'button')*/ else {
    return (
      <NextLink href={href} passHref>
        <MuiButton {...props as ButtonProps}>{children}</MuiButton>
      </NextLink>
    );
  }
}
