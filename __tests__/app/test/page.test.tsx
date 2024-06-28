import TestPage from '@/app/test/page';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('@tanstack/react-query', async importOriginal => ({
  ...((await importOriginal()) as any),
  useQuery: vi.fn(),
}));

vi.mock('@/api', () => ({
  api: {
    hello: {
      $get: vi.fn(),
    },
  },
}));

const queryClient = new QueryClient();

const renderTestPage = (queryReturnValue: any) => {
  (useQuery as any).mockReturnValue(queryReturnValue);
  render(
    <QueryClientProvider client={queryClient}>
      <TestPage />
    </QueryClientProvider>,
  );
};

describe('TestPage Component', () => {
  it('should display loading initially', () => {
    renderTestPage({ data: undefined });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display message when data is fetched successfully', async () => {
    const mockData = { message: 'Hello, Hono!' };

    renderTestPage({ data: mockData });

    expect(screen.getByText(mockData.message)).toBeInTheDocument();
  });
});
