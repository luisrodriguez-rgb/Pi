export interface Milestone {
  id: string;
  sceneNumber: number;
  year: string;
  location: string;
  title: {
    es: string;
    en: string;
  };
  subtitle: {
    es: string;
    en: string;
  };
  precisionValue: string;
  theme: string;
  quote: {
    es: string;
    en: string;
    author: string;
  };
}

export const MILESTONES: Milestone[] = [
  {
    id: 'rhind',
    sceneNumber: 1,
    year: '1650 a.C. · Tebas',
    location: 'Tebas, Antiguo Egipto',
    title: {
      es: 'El Papiro y la Cuerda',
      en: 'The Papyrus and the Cord'
    },
    subtitle: {
      es: 'El escriba Ahmes y la primera cuadratura de graneros',
      en: 'The scribe Ahmes and the first granary quadrature'
    },
    precisionValue: '3.16049',
    theme: 'egypt',
    quote: {
      es: '«Quita un noveno del diámetro y construye un cuadrado con el resto. Por primera vez en la historia, la humanidad intenta atrapar una curva dentro de líneas rectas.»',
      en: '«Take away 1/9 of the diameter and construct a square on the remainder. For the first time in history, humanity attempts to trap a curve within straight lines.»',
      author: 'Papiro de Rhind (Problema 48, Museo Británico)'
    }
  },
  {
    id: 'syracuse',
    sceneNumber: 2,
    year: '212 a.C. · Siracusa',
    location: 'Siracusa, Magna Grecia',
    title: {
      es: '«No molestes a mis círculos»',
      en: '«Do Not Disturb My Circles»'
    },
    subtitle: {
      es: 'El asedio romano y la prensa hidráulica de 96 lados',
      en: 'The Roman siege and the 96-sided hydraulic press'
    },
    precisionValue: '3.1418',
    theme: 'syracuse',
    quote: {
      es: '«Noli turbare circulos meos. Mataron al hombre en la arena; su trampa geométrica sobrevivió dos mil años.»',
      en: '«Noli turbare circulos meos. They struck the man down in the sand; his geometric cage survived two millennia.»',
      author: 'Últimas palabras de Arquímedes de Siracusa'
    }
  },
  {
    id: 'china',
    sceneNumber: 3,
    year: '480 d.C. · Jiankang',
    location: 'Jiankang, China (Dinastía Liu Song)',
    title: {
      es: 'El Monstruo de 24,576 Lados',
      en: 'The 24,576-Sided Colossus'
    },
    subtitle: {
      es: 'Zu Chongzhi, varillas de bambú y la legendaria Milü 355/113',
      en: 'Zu Chongzhi, counting rods, and the legendary Milü 355/113'
    },
    precisionValue: '3.1415929',
    theme: 'china',
    quote: {
      es: '«Años moviendo varillas de bambú en el suelo. Un récord de precisión que nadie en la Tierra logró superar durante 800 años.»',
      en: '«Years moving bamboo rods upon the floor. A precision milestone unbroken on Earth for 800 years.»',
      author: 'Crónica del Libro de Song (Zhui Shu)'
    }
  },
  {
    id: 'leiden',
    sceneNumber: 4,
    year: '1610 · Leiden',
    location: 'Leiden, Países Bajos',
    title: {
      es: '35 Dígitos en una Lápida',
      en: '35 Digits on a Tombstone'
    },
    subtitle: {
      es: 'El maestro de esgrima Ludolph van Ceulen y un polígono de 2⁶² lados',
      en: 'Fencing master Ludolph van Ceulen and a 2⁶²-sided polygon'
    },
    precisionValue: '3.14159265358979323846264338327950288',
    theme: 'leiden',
    quote: {
      es: '«Qui in vita sua multum laboravit... Dedicó su vida a medir el círculo y pidió que los 35 decimales fueran grabados para siempre sobre su tumba.»',
      en: '«Qui in vita sua multum laboravit... He devoted his life to measuring the circle, decreeing all 35 decimals chiseled upon his tomb.»',
      author: 'Epitafio en la Iglesia de San Pedro, Leiden'
    }
  },
  {
    id: 'london',
    sceneNumber: 5,
    year: '1706 · Londres',
    location: 'Londres y San Petersburgo',
    title: {
      es: 'El Bautizo del Símbolo π',
      en: 'The Baptism of the Symbol π'
    },
    subtitle: {
      es: 'De la pesada frase en latín a la página 263 de William Jones',
      en: 'From cumbersome Latin prose to William Jones’ page 263'
    },
    precisionValue: '3.1415926535...',
    theme: 'london',
    quote: {
      es: '«Durante milenios no tuvo nombre. En 1706, William Jones imprimió por primera vez la letra griega π, y Euler la convirtió en el lenguaje de la ciencia.»',
      en: '«For millennia it bore no name. In 1706, William Jones first printed the Greek letter π, and Euler cast it into the universal language of science.»',
      author: 'Synopsis Palmariorum Matheseos (1706)'
    }
  },
  {
    id: 'paris',
    sceneNumber: 6,
    year: '1777 · París',
    location: 'Castillo de Montbard, París',
    title: {
      es: 'Las Agujas en el Suelo de Madera',
      en: 'Needles Upon the Wooden Parquet'
    },
    subtitle: {
      es: 'El Conde de Buffon y el nacimiento de la probabilidad geométrica',
      en: 'The Count of Buffon and the birth of geometric probability'
    },
    precisionValue: '3.1446',
    theme: 'paris',
    quote: {
      es: '«Lanza agujas al azar sobre un suelo de madera: π ya no pertenecía solo a los círculos. Estaba escondido en el tejido mismo del azar.»',
      en: '«Toss needles at random onto a wooden floor: π no longer belonged only to circles. It was woven into the fabric of chance itself.»',
      author: 'Georges-Louis Leclerc, Conde de Buffon'
    }
  },
  {
    id: 'shanks',
    sceneNumber: 7,
    year: '1873 · París',
    location: 'Houghton-le-Spring y París',
    title: {
      es: 'El Trágico Error de William Shanks',
      en: 'The Tragic Error of William Shanks'
    },
    subtitle: {
      es: '707 decimales calculados a mano y la cúpula del Palais de la Découverte',
      en: '707 handwritten decimals and the dome of the Palais de la Découverte'
    },
    precisionValue: '3.14159... [Falla en el #528]',
    theme: 'shanks',
    quote: {
      es: '«Veinte años de su vida tallados en madera dorada en la cúpula de París. Hasta que en 1946 una calculadora descubrió que el dígito 528 era erróneo: sus últimos 180 números eran ceniza.»',
      en: '«Twenty years of his life carved in gilded wood in the Paris dome. Until 1946, when a mechanical calculator discovered digit 528 was wrong: his final 180 digits were ash.»',
      author: 'Crónica del Palais de la Découverte'
    }
  },
  {
    id: 'eniac',
    sceneNumber: 8,
    year: '1914 → 1949',
    location: 'Madras y Laboratorio de Aberdeen',
    title: {
      es: 'El Sueño de Namagiri y el ENIAC',
      en: 'Namagiri’s Dream and the ENIAC'
    },
    subtitle: {
      es: 'De las revelaciones de Ramanujan a las 70 horas de tubos de vacío',
      en: 'From Ramanujan’s mystic notebook to 70 hours of vacuum tubes'
    },
    precisionValue: '2,037 dígitos',
    theme: 'eniac',
    quote: {
      es: '«Ramanujan saltaba 8 decimales por paso con fórmulas soñadas en la India. En 1949, ENIAC devoró tarjetas perforadas durante 70 horas y pulverizó 4,000 años de historia humana.»',
      en: '«Ramanujan leaped 8 decimals per step with dream-inspired formulas in India. In 1949, ENIAC chewed punched cards for 70 hours, pulverizing 4,000 years of human arithmetic.»',
      author: 'Informe Balístico de Aberdeen'
    }
  },
  {
    id: 'cyber',
    sceneNumber: 9,
    year: '1988 · Hackers',
    location: 'Pasadena y Amsterdam',
    title: {
      es: 'El Punto de Feynman y el Círculo en C',
      en: 'The Feynman Point & The Circular C Code'
    },
    subtitle: {
      es: 'La ilusión del decimal 762 (999999) y el Spigot de 160 caracteres',
      en: 'The illusion at decimal 762 (999999) and the 160-char Spigot'
    },
    precisionValue: '...999999... [Posición 762]',
    theme: 'cyber',
    quote: {
      es: '«"Nueve, nueve, nueve, nueve, nueve, nueve... y así sucesivamente". Por un instante fingió que π era racional, antes de que el código circular de Dik Winter demostrara que el infinito no tiene fin.»',
      en: '«"Nine, nine, nine, nine, nine, nine... and so on". For one fleeting heartbeat he pretended π was rational, before Dik Winter’s circular code proved infinity has no end.»',
      author: 'Richard Feynman & Dik T. Winter'
    }
  },
  {
    id: 'infinity',
    sceneNumber: 10,
    year: 'Presente · Cosmos',
    location: '105 Billones de Dígitos & Tu Navegador',
    title: {
      es: '314 Billones de Dígitos y Tu Huella en π',
      en: '314 Trillion Digits & Your Imprint in π'
    },
    subtitle: {
      es: 'Si π es normal, tu fecha de nacimiento ya estaba escrita antes de las estrellas',
      en: 'If π is normal, your birthday was already inscribed before the stars existed'
    },
    precisionValue: '105,000,000,000,000+',
    theme: 'infinity',
    quote: {
      es: '«No había opción salvo medir lo inconmensurable. El círculo nunca se cierra; solo aumenta nuestra resolución.»',
      en: '«There was no choice but to measure the unmeasurable. The circle never closes; it only increases our resolution.»',
      author: 'pi-tribute.dev'
    }
  }
];
