import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import History from './History';

describe('History Page CSS', () => {
  it('applies the correct hero banner image styles', () => {
    const { container } = render(<History />);
    const heroBanner = container.querySelector('.hero-banner-image');
    expect(heroBanner).toBeInTheDocument();
    // Example: check that the class is present
    expect(heroBanner).toHaveClass('hero-banner-image');
    // Example: check computed style (object-fit)
    const styles = getComputedStyle(heroBanner);
    expect(styles.objectFit).toBe('cover');
    // You can add more assertions for other styles if needed
  });
});
