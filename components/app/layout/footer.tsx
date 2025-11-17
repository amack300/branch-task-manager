import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Smile } from 'lucide-react';

export const Footer = () => {
  return (
    <footer
      data-testid="footer-element"
      className="flex flex-col container mt-auto p-4"
    >
      <p className="flex text-sm text-gray-600 border-t-1 border-gray-300 pt-4">
        <span className="flex items-center mx-auto">
          Built with love by
          <Button asChild variant="link" className="p-0 mx-1">
            <Link
              href="https://www.linkedin.com/in/anthonymack/"
              target="_blank"
            >
              Anthony Mack
            </Link>
          </Button>
          <Smile size="16" />
        </span>
      </p>
    </footer>
  );
};
