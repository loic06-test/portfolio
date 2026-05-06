export type NavItem = {
  id: string
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { id: 'about', label: 'À propos', href: '#about' },
  { id: 'projects', label: 'Projets', href: '#projects' },
  { id: 'skills', label: 'Expertises', href: '#skills' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]
