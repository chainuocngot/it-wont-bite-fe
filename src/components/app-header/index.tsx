import Image from 'next/image';
import Link from 'next/link';

import UserDropdown from '@/components/app-header/user-dropdown';

export default function AppHeader() {
  return (
    <header className="border-b px-6 sticky top-0 z-100 bg-background">
      <div className="w-full flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold">
          <Image
            className="dark:invert h-10 w-30"
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={40}
            priority
          />
        </Link>

        <UserDropdown />
      </div>
    </header>
  );
}
