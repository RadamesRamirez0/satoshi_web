// app/api/change-language/route.ts
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function POST(request: Request): Promise<void> {
  const headersList = headers();
  const fullUrl = headersList.get('referer') ?? '';

  const formData = await request.formData();

  const newLang = formData.get('newLang')?.toString() ?? 'en';

  const path = new URL(fullUrl).pathname;

  // Actualiza el parámetro de idioma en el path
  const newPath = path.replace(/^\/[a-z]{2}/, `/${newLang}`);

  redirect(newPath); // Devuelve la nueva ruta
}
