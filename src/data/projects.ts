export type Project = {
  id: string
  index: string
  title: string
  client: string
  year: string
  category: string
  scope: string[]
  excerpt: string
  /** Optional preview image — rendered as a full-bleed cover when present. */
  cover?: string
  /** How the cover is fitted in the card.
   *  `cover` (default) crops to fill — best for screenshots / mockups.
   *  `contain` shows the whole image with padding — best for logos. */
  coverFit?: 'cover' | 'contain'
  /** Background colour behind the cover when `contain` leaves visible padding.
   *  `'dark'` (default) keeps the themed gradient. `'white'` sets pure white.
   *  Any other CSS colour value is applied as-is (e.g. `'#30302f'`). */
  coverBg?: 'dark' | 'white' | (string & {})
  /** CSS `object-position` override — useful when a logo has asymmetric
   *  internal whitespace. */
  coverPosition?: string
  /** CSS `padding` override for the cover — when the default
   *  `clamp(1rem, 3vw, 2rem)` is too generous and the logo looks too small. */
  coverPadding?: string
}

export const projects: Project[] = [
  {
    id: 'kikaz',
    index: '01',
    title: 'Kikaz',
    client: 'Streamer · Twitch',
    year: '2026',
    category: 'Twitch & gaming',
    scope: ['Logo', 'Scènes live', 'Direction artistique', 'Overlay'],
    excerpt:
      'Identité de chaîne Twitch complète pour Kikaz — logo, scènes live, direction artistique et habillage cohérent du début à la fin du flux.',
    cover: 'https://i.imgur.com/XqKxxEY.png',
    coverFit: 'contain',
    coverPadding: '0.5rem',
    coverPosition: '100% 50%',
  },
  {
    id: 'pole-sante-antibes-centre',
    index: '02',
    title: 'Pôle Santé Antibes Centre',
    client: 'Centre de santé · Antibes',
    year: '2026',
    category: 'Médical · Web',
    scope: ['Refonte UX/UI', 'Site complet', 'Intégration'],
    excerpt:
      'Refonte complète du site web du Pôle Santé Antibes Centre — architecture, parcours patient et identité visuelle alignées sur un ton sobre et rassurant.',
    cover: 'https://i.imgur.com/7MRcZa6.png',
    coverFit: 'contain',
    coverBg: 'white',
  },
  {
    id: 'amelis-sante',
    index: '03',
    title: 'Amelis Santé',
    client: 'Amelis · Santé',
    year: '2026',
    category: 'Médical · Identité',
    scope: ['Logo', 'Direction artistique', 'Site internet'],
    excerpt:
      'Identité visuelle et site internet pour Amelis Santé — logo, charte graphique et présence en ligne pensés comme un système cohérent.',
    cover: 'https://i.imgur.com/NbJt5Ou.png',
    coverFit: 'contain',
    coverBg: 'white',
  },
  {
    id: 'gea-pour-tous',
    index: '04',
    title: 'GEA Pour Tous',
    client: 'Association étudiante · BUT GEA',
    year: '2026',
    category: 'Associatif & étudiant',
    scope: ['Logo', 'Publications Instagram', 'Site internet'],
    excerpt:
      'Communication d’une association étudiante du BUT GEA — logo, ligne éditoriale Instagram et site internet sur-mesure pour fédérer la promo.',
    cover: 'https://i.imgur.com/h00CSdq.jpeg',
    coverFit: 'contain',
    coverBg: 'white',
  },
  {
    id: 'frigo16',
    index: '05',
    title: 'Frigo16',
    client: 'Salle de musique',
    year: '2025',
    category: 'Musique & lieu',
    scope: ['Logo'],
    excerpt:
      'Identité d’une salle de musique — logo pensé pour vivre aussi bien sur les supports print, web qu’en signalétique.',
    cover: 'https://i.imgur.com/Y5uYAJm.png',
  },
  {
    id: 'special-magazine',
    index: '06',
    title: 'Special Magazine',
    client: 'Magazine indépendant',
    year: '2025',
    category: 'Édition & magazine',
    scope: ['Direction artistique', 'Mise en page', 'Design éditorial'],
    excerpt:
      'Direction artistique et mise en page pour Special Magazine — typographie, grille, traitement éditorial et choix iconographiques.',
    cover: 'https://i.imgur.com/C8xJgGu.png',
    coverFit: 'contain',
    coverBg: '#00491b',
  },
  {
    id: 'meet-and-greet-alice-oseman',
    index: '07',
    title: 'Meet & Greet — Alice Oseman',
    client: 'Rencontre lecture · Événementiel',
    year: '2025',
    category: 'Événementiel & culturel',
    scope: ['Affiche'],
    excerpt:
      'Affiche pour une rencontre lecture autour d’Alice Oseman — composition typographique sobre et habillage événementiel.',
    cover: 'https://i.imgur.com/pw5lmob.png',
    coverFit: 'contain',
    coverBg: '#202322',
  },
  {
    id: 'monna',
    index: '08',
    title: 'Monna',
    client: 'Artiste · Musique',
    year: '2025',
    category: 'Musique · Cover',
    scope: ['Cover d’album'],
    excerpt:
      'Cover d’album pour Monna — direction artistique et exécution graphique de la pochette, pensée pour les plateformes de streaming et le print.',
    cover: 'https://i.imgur.com/Na3igNS.png',
    coverFit: 'contain',
    coverBg: '#30302f',
  },
]
