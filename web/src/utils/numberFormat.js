export const numberFormat = value =>
  new Intl.NumberFormat('pt-BR', {
    minSignificantDigits: 2,
    minimumFractionDigits: 2,
  }).format(value);
