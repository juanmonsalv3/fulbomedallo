import NextLink from 'next/link';
import MuiLink, { LinkProps } from '@mui/material/Link';
import MuiButton, { ButtonProps } from '@mui/material/Button';
import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

type CustomLinkProps = (Omit<ButtonProps, 'type'> | Omit<LinkProps, 'type'>) & {
  type: 'button' | 'link';
  href: string;
};

const StyledLink = styled(NextLink)`
  text-decoration: none;
`;

export default function CustomLink({
  type,
  href,
  children,
  ...props
}: PropsWithChildren<CustomLinkProps>) {
  if (type === 'link' || !type) {
    return (
      <StyledLink href={href} passHref>
        <MuiLink {...(props as LinkProps)}>{children}</MuiLink>
      </StyledLink>
    );
  } /*if (type === 'button')*/ else {
    return (
      <StyledLink href={href} passHref>
        <MuiButton {...(props as ButtonProps)}>{children}</MuiButton>
      </StyledLink>
    );
  }
}
