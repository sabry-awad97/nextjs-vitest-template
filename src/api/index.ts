import type { AppType } from '@/app/api/[[...route]]/route';
import { hc } from 'hono/client';

const client = hc<AppType>('');

export const api = client.api;
