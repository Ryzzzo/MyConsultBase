type ClassValue = string | boolean | undefined | null;

export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(' ').trim();
}
