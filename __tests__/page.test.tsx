import Home from '@/app/page';
import { render, screen } from '@testing-library/react';

// vi.mock('@/app/page', async importOriginal => {
//   const actual: {} = await importOriginal();
//   return {
//     ...actual,
//     default: () => <h1>Hello World!</h1>,
//   };
// });

it('Home', () => {
  render(<Home />);
  expect(screen.getByRole('heading', { level: 1, name: 'Hello World!' })).toBeDefined();
});
