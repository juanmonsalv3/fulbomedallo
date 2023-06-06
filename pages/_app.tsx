import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from '@/app/components/layout';

export interface MyAppProps extends AppProps {}

const defaultTheme = createTheme();

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props;
  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={defaultTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
          <Toaster position='bottom-center' />
        </Layout>
      </ThemeProvider>
    </>
  );
}
