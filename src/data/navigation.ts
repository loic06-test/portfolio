export type NavItem = {
  id: string
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { id: 'about', label: 'À propos', href: '#about' },
  { id: 'projects', label: 'Projets', href: '#projects' },
  { id: 'expertises', label: 'Expertises', href: '#expertises' },
  { id: 'parcours', label: 'Parcours', href: '#parcours' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]
