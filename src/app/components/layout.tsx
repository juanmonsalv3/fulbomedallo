import { PropsWithChildren } from 'react';
import ResponsiveAppBar from './AppBar';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <ResponsiveAppBar />
      <main>{children}</main>
    </>
  );
}
