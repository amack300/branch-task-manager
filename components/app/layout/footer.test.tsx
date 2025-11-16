import { render, screen } from '@/utils/testing';

import { Footer } from './footer';

describe('Footer', () => {
  it('renders footer', () => {
    render(<Footer />);
    expect(screen.getByTestId('footer-element')).toBeInTheDocument();
  });
});
