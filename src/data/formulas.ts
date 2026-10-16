export const FORMULAS = {
  // Dik Winter's famous 1997 IOCCC obfuscated C code formatted as a circle
  dikWinterSpigot: {
    title: 'Dik Winter’s Circular C Spigot (1997)',
    language: 'c',
    lines: [
      '              int a=10000,b,c=2800,d,e,f[2801],g;',
      '          main(){for(;b-c;)f[b++]=a/5;for(;d=0,g=c*2;',
      '        b=3914,c-=14,printf("%.4d",e+d/a),e=d%a)for(b=c;',
      '       d+=f[b]*a,f[b]=d%--g,d/=g--,--b;d*=b);}',
    ],
    circularArt: `             int a=10000,b,c=2800,d,e,f[2801],g;
         main(){for(;b-c;)f[b++]=a/5;for(;d=0,g=c*2;
       b=3914,c-=14,printf("%.4d",e+d/a),e=d%a)for(b=c;
      d+=f[b]*a,f[b]=d%--g,d/=g--,--b;d*=b);}`,
    explanation: {
      es: 'Este diminuto programa en C genera los primeros 800 dígitos de π sin utilizar ningún número con decimales (float ni double). Trabaja enteramente en base mixta con aritmética entera de números grandes.',
      en: 'This tiny C program computes the first 800 digits of π without using a single floating-point number. It functions entirely in a mixed-radix number system with large integer arithmetic.'
    }
  },

  ramanujan: {
    latex: '\\frac{1}{\\pi} = \\frac{2\\sqrt{2}}{9801} \\sum_{k=0}^{\\infty} \\frac{(4k)!(1103 + 26390k)}{(k!)^4 396^{4k}}',
    factor: '2√2 / 9801',
    factorValue: '0.000288888...',
    k0: {
      expression: 'k = 0 → (4·0)!(1103 + 0) / ((0!)⁴ · 396⁰) = 1103',
      resultPi: '3.141592730013305...',
      correctDigits: '3.141592',
      error: '0.000000076...'
    },
    k1: {
      expression: 'k = 1 → 24 · (1103 + 26390) / (1 · 396⁴) = 27493 / 24591257856',
      resultPi: '3.141592653589793878...',
      correctDigits: '3.141592653589793',
      accumulatedDigits: 16
    }
  },

  machin: {
    latex: '\\frac{\\pi}{4} = 4 \\arctan\\left(\\frac{1}{5}\\right) - \\arctan\\left(\\frac{1}{239}\\right)',
    title: 'Fórmula de John Machin (1706)',
    history: {
      es: 'Descubierta en 1706 por John Machin, fue la clave que permitió a ENIAC en 1949 alcanzar 2,037 decimales en 70 horas continuas usando tarjetas perforadas.',
      en: 'Discovered in 1706 by John Machin, this formula was the foundation that enabled ENIAC in 1949 to compute 2,037 decimal digits in 70 hours with punched cards.'
    }
  },

  archimedes: {
    inscribed: (n: number) => n * Math.sin(Math.PI / n),
    circumscribed: (n: number) => n * Math.tan(Math.PI / n),
    steps: [
      { sides: 6, lower: '3.00000', upper: '3.46410', note: 'Hexágono regular básico' },
      { sides: 12, lower: '3.10583', upper: '3.21539', note: 'Primera duplicación' },
      { sides: 24, lower: '3.13263', upper: '3.15966', note: 'Segunda duplicación' },
      { sides: 48, lower: '3.13935', upper: '3.14609', note: 'Tercera duplicación' },
      { sides: 96, lower: '3.14103 (223/71)', upper: '3.14271 (22/7)', note: 'Límite histórico de Siracusa' }
    ]
  },

  buffon: {
    formula: 'P = (2 · L) / (π · D)',
    piInversion: 'π ≈ (2 · L · N_total) / (D · N_cruces)',
    needleLength: 50, // px
    lineSpacing: 100 // px (D = 2L, simplifies to π ≈ N_total / N_cruces)
  }
};
