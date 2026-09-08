export function formatFcfa(value: number | null): string {
  if (value === null) return "Prix à définir";
  return `${new Intl.NumberFormat("fr-FR").format(value)} FCFA`;
}
