import { PropsWithChildren } from 'react';
import ReactQueryProvider from './ReactQueryProvider';
import ThemeProvider from './ThemeProvider';

const Providers = ({ children }: Required<PropsWithChildren>) => (
  <ThemeProvider enableSystem attribute="class" defaultTheme="system" disableTransitionOnChange storageKey="theme">
    <ReactQueryProvider>{children}</ReactQueryProvider>
  </ThemeProvider>
);

export default Providers;
