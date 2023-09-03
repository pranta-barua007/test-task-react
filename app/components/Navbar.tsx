'use client'
 
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const navLinks = [
    {href: '/', label: 'Form'},
    {href: '/search', label: 'Search and Edit'}
]

function Navbar() {
  const pathname = usePathname();

  return (
    <header>
      <nav className="w-full flex justify-center items-center gap-4 py-4">
      {navLinks.map((link, idx) => {
        const isActive = pathname === link.href;
 
        return (
          <Link
            className={isActive ? 'text-blue-400' : 'text-black'}
            href={link.href}
            key={idx}
          >
            {link.label}
          </Link>
        )
      })}
      </nav>
    </header>
  );
}

export default Navbar;
