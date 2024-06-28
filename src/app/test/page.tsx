'use client';

import { api } from '@/api';
import { useQuery } from '@tanstack/react-query';

export default function TestPage() {
  const { data } = useQuery({
    queryKey: ['hello'],
    queryFn: async () => {
      const res = await api.hello.$get({
        query: {
          name: 'Hono',
        },
      });

      const data = await res.json();

      return data;
    },
  });

  if (!data) return <p>Loading...</p>;

  return <p>{data.message}</p>;
}
