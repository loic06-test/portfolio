export const personal = {
  name: 'Loïc Karrer',
  /** Diacritic-free form for uppercase contexts — `text-transform: uppercase`
   *  on "Loïc" yields "LOÏC" (with diaeresis), which the design avoids. */
  nameUpper: 'LOIC KARRER',
  initials: 'LK',
  baseline: 'Communication digitale, identité visuelle & création de contenu.',
  role: 'Communication & création digitale',
  location: 'Nice, France',
  origin: 'Franco-américain',
  status: 'Étudiant BUT GEA · alternance 2026',
  available: true,
  short:
    'Étudiant à l’IUT Nice Côte d’Azur (BUT GEA · option GEMA), je conçois en autodidacte des supports de communication pour des univers variés — du gaming au médical, du sport à la musique.',
  long: [
    '23 ans, en 2ème année de BUT GEA option GEMA à l’IUT Nice Côte d’Azur, actuellement en stage de communication chez MyCenterSolution à Antibes (avril → mai 2026). Je bascule en alternance dès ma 3ème année.',
    'Tout ce que je sais en design et en communication, je l’ai appris en autodidacte — projet après projet. J’ai conçu des identités et des supports pour des chaînes Twitch, des cabinets médicaux, des restaurants, des associations, des clubs de sport et des projets musicaux et événementiels. Chaque univers a ses codes — j’aime les apprendre.',
  ],
  interests: ['Handball', 'Musculation', 'Musique', 'Camping'],
  email: 'loickarrer@gmail.com',
  phone: '+33 6 26 45 15 05',
} as const
