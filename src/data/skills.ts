export type SkillGroup = {
  title: string
  description: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Communication',
    description:
      'Cadrer un message, choisir un ton, livrer des supports cohérents.',
    items: [
      'Stratégie de communication',
      'Identité de marque',
      'Communication digitale & réseaux',
      'Communication événementielle',
      'Direction artistique',
    ],
  },
  {
    title: 'Création',
    description:
      'Mettre la marque en images — lisible, mémorable, soigné.',
    items: [
      'Design graphique',
      'Édition print & digital',
      'Création de contenu social',
      'Charte visuelle & déclinaisons',
      'Mise en page & typographie',
    ],
  },
  {
    title: 'Univers couverts',
    description:
      'Six domaines aux codes très différents — c’est ce que j’aime.',
    items: [
      'Twitch & gaming',
      'Médical',
      'Restauration',
      'Associatif',
      'Sport',
      'Musique & événementiel',
    ],
  },
]

export const tools = [
  'Canva',
  'Affinity',
  'Photoshop',
  'HTML',
  'Excel',
  'Word',
  'PowerPoint',
]
