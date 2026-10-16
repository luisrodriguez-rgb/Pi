export interface Milestone {
  id: string;
  sceneNumber: number;
  year: string;
  title: {
    es: string;
    en: string;
  };
  subtitle: {
    es: string;
    en: string;
  };
  discoverer: string;
  location: string;
  decimalsCount: number | string;
  piApproximation: string;
  theme: 'obsidian' | 'gold' | 'parchment' | 'emerald' | 'amber' | 'cyber';
  quote?: {
    es: string;
    en: string;
    author: string;
  };
}

export const MILESTONES: Milestone[] = [
  {
    id: 'cycle',
    sceneNumber: 1,
    year: 'El Inicio de los Tiempos',
    title: {
      es: 'El Ciclo Eterno',
      en: 'The Eternal Cycle'
    },
    subtitle: {
      es: 'El orden nace del caos numérico',
      en: 'Order emerges from numerical chaos'
    },
    discoverer: 'La Geometría del Universo',
    location: 'El Cosmos',
    decimalsCount: '∞',
    piApproximation: '3.1415926535...',
    theme: 'obsidian',
    quote: {
      es: 'El gran libro del universo no puede ser entendido a menos que primero aprendamos el lenguaje y los caracteres en que está escrito: las matemáticas.',
      en: 'The grand book of the universe cannot be understood unless one first learns the language and the characters in which it is written: mathematics.',
      author: 'Galileo Galilei (1623)'
    }
  },
  {
    id: 'unroll',
    sceneNumber: 2,
    year: '2000 a.C.',
    title: {
      es: 'El Desenrollado',
      en: 'The Unrolling'
    },
    subtitle: {
      es: 'De la cuerda a la recta numérica',
      en: 'From rope to number line'
    },
    discoverer: 'Escribas babilónicos y egipcios',
    location: 'Mesopotamia y Valle del Nilo',
    decimalsCount: 1,
    piApproximation: '3.125 (25/8)',
    theme: 'gold',
    quote: {
      es: 'Corta el perímetro de cualquier círculo con diámetro 1: jamás caerá en un número entero.',
      en: 'Unroll the circumference of any circle of diameter 1: it will never land on an exact integer.',
      author: 'Papiro Rhind'
    }
  },
  {
    id: 'archimedes',
    sceneNumber: 3,
    year: '250 a.C.',
    title: {
      es: 'La Trampa de Arquímedes',
      en: 'Archimedes’ Trap'
    },
    subtitle: {
      es: 'El método del agotamiento con 96 lados',
      en: 'The method of exhaustion with 96 sides'
    },
    discoverer: 'Arquímedes de Siracusa',
    location: 'Magna Grecia (Siracusa)',
    decimalsCount: 3,
    piApproximation: '3.1418 (223/71 < π < 22/7)',
    theme: 'amber',
    quote: {
      es: 'Atrapó al círculo entre dos jaulas poligonales de 96 lados hasta que no hubo escapatoria.',
      en: 'He trapped the circle between two 96-sided polygonal cages until there was no escape.',
      author: 'Sobre la medida del círculo'
    }
  },
  {
    id: 'tombstone',
    sceneNumber: 4,
    year: '1610 d.C.',
    title: {
      es: '35 Decimales en una Lápida',
      en: '35 Decimals on a Tombstone'
    },
    subtitle: {
      es: 'Una vida entera entregada a una sola constante',
      en: 'A whole lifetime devoted to a single constant'
    },
    discoverer: 'Ludolph van Ceulen',
    location: 'Leiden, Países Bajos',
    decimalsCount: 35,
    piApproximation: '3.14159265358979323846264338327950288',
    theme: 'obsidian',
    quote: {
      es: 'Calculó 35 cifras exactas con polígonos de 2⁶² lados. Pidió que fueran grabadas en su lápida de San Pedro en Leiden.',
      en: 'He calculated 35 exact figures using polygons with 2⁶² sides. He requested them chiseled onto his tombstone at St. Peter’s in Leiden.',
      author: 'Epitafio de Van Ceulen'
    }
  },
  {
    id: 'buffon',
    sceneNumber: 5,
    year: '1777 d.C.',
    title: {
      es: 'Las Agujas de Buffon',
      en: 'Buffon’s Needles'
    },
    subtitle: {
      es: 'Cuando el azar calcula la geometría',
      en: 'When pure chance calculates geometry'
    },
    discoverer: 'Georges-Louis Leclerc, Conde de Buffon',
    location: 'París, Francia',
    decimalsCount: 4,
    piApproximation: '2L / (D · P) → π',
    theme: 'parchment',
    quote: {
      es: 'Lanza suficientes agujas sobre un piso de duelas de madera: la probabilidad de que crucen una grieta contiene a π.',
      en: 'Toss enough needles onto parallel wooden floorboards: the probability of crossing a crack contains π.',
      author: 'Essai d’arithmétique morale'
    }
  },
  {
    id: 'ramanujan',
    sceneNumber: 6,
    year: '1914 d.C.',
    title: {
      es: 'El Cuaderno de Ramanujan',
      en: 'Ramanujan’s Notebook'
    },
    subtitle: {
      es: 'Series hipergeométricas que destrozaron la lentitud',
      en: 'Hypergeometric series that shattered slowness'
    },
    discoverer: 'Srinivasa Ramanujan',
    location: 'Kumbakonam, India / Cambridge, Reino Unido',
    decimalsCount: '8 por término',
    piApproximation: '9801 / (2√2 · 1103) = 3.14159273...',
    theme: 'emerald',
    quote: {
      es: 'Una ecuación para mí no tiene sentido a menos que exprese un pensamiento de Dios.',
      en: 'An equation for me has no meaning unless it expresses a thought of God.',
      author: 'Srinivasa Ramanujan'
    }
  },
  {
    id: 'eniac',
    sceneNumber: 7,
    year: '1949 d.C.',
    title: {
      es: 'ENIAC: La Era del Silicio',
      en: 'ENIAC: The Silicon Dawn'
    },
    subtitle: {
      es: '70 horas consecutivas de tubos de vacío para 2,037 decimales',
      en: '70 continuous vacuum-tube hours for 2,037 decimals'
    },
    discoverer: 'George Reitwiesner y John von Neumann',
    location: 'Laboratorio Balístico de Aberdeen, Maryland',
    decimalsCount: 2037,
    piApproximation: '3.1415926535... [2,037 dígitos]',
    theme: 'amber',
    quote: {
      es: 'Las tarjetas perforadas alimentaron a la bestia de 30 toneladas. Lo que a la humanidad le costó 4,000 años, ENIAC lo pulverizó en un fin de semana.',
      en: 'Punched cards fed the 30-ton beast. What took humanity 4,000 years, ENIAC pulverized in a single weekend.',
      author: 'Registro técnico del Ejército de EE.UU.'
    }
  },
  {
    id: 'feynman',
    sceneNumber: 8,
    year: '1989 d.C.',
    title: {
      es: 'El Punto de Feynman',
      en: 'The Feynman Point'
    },
    subtitle: {
      es: 'La sobrecogedora ilusión del decimal 762: 999999',
      en: 'The chilling illusion at decimal 762: 999999'
    },
    discoverer: 'Richard Feynman / Douglas Hofstadter',
    location: 'Pasadena, California',
    decimalsCount: 762,
    piApproximation: '...857973 999999 873115...',
    theme: 'obsidian',
    quote: {
      es: 'Feynman bromeaba diciendo que quería memorizar π hasta el decimal 762 para poder recitar "nueve, nueve, nueve, nueve, nueve, nueve... y así sucesivamente", fingiendo que era racional.',
      en: 'Feynman joked he wished to memorize π to decimal 762 so he could recite "nine, nine, nine, nine, nine, nine... and so on", pretending it was rational.',
      author: 'Richard Feynman'
    }
  },
  {
    id: 'spigot',
    sceneNumber: 9,
    year: '1997 d.C.',
    title: {
      es: 'El Código en C de Dik Winter',
      en: 'Dik Winter’s Circular C Spigot'
    },
    subtitle: {
      es: '160 caracteres en forma de círculo que escupen infinito sin decimales flotantes',
      en: '160 circle-shaped characters spitting infinity without floating point arithmetic'
    },
    discoverer: 'Dik T. Winter',
    location: 'CWI Amsterdam',
    decimalsCount: 'Dinámico',
    piApproximation: 'Spigot Algorithm (Base mixta)',
    theme: 'cyber',
    quote: {
      es: 'El algoritmo no necesita calcular los decimales anteriores con punto flotante: abre un grifo (spigot) y deja que los dígitos caigan gota a gota.',
      en: 'The algorithm requires no previous floating point precision: it opens a spigot and lets digits drip one by one.',
      author: 'Dik T. Winter'
    }
  },
  {
    id: 'library',
    sceneNumber: 10,
    year: 'Presente y Más Allá',
    title: {
      es: 'La Biblioteca de Infinitos',
      en: 'The Library of Infinities'
    },
    subtitle: {
      es: 'Toda tu vida está codificada en algún rincón de π',
      en: 'Your entire existence is encoded somewhere within π'
    },
    discoverer: 'Tú y el Cosmos',
    location: '1,000,000 de dígitos en tu navegador',
    decimalsCount: '1,000,000+',
    piApproximation: '3.14159265358979323846...',
    theme: 'obsidian',
    quote: {
      es: 'El círculo nunca se cierra, solo aumenta su resolución.',
      en: 'The circle never closes; it only increases its resolution.',
      author: 'pi-tribute.dev'
    }
  }
];
