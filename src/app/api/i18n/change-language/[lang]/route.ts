import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export function GET(_: Request, { params }: { params: { lang: string } }): void {
  const headersList = headers();
  const fullUrl = headersList.get('referer') ?? '';

  const url = new URL(fullUrl);

  const path = url.pathname;

  // Actualiza el parámetro de idioma en el path
  const newPath = path.replace(/^\/[a-z]{2}/, `/${params.lang}`);

  redirect(newPath); // Devuelve la nueva ruta
}
