import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';

const NoSSR = ({ children }: Required<PropsWithChildren>) => children;
export default dynamic(() => Promise.resolve(NoSSR), { ssr: false });
