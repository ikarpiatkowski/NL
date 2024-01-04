import './globals.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font';

import Sidebar from '@/components/Sidebar';
import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import getSongsByUserId from '@/actions/getSongsByUserId';
import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices';
import { ThemeProvider } from '@/components/theme-provider';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Nourish Log',
  description: 'Your personal food tracker!',
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();
  const products = await getActiveProductsWithPrices();
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.className} dark:bg-black bg-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToasterProvider />
          <SupabaseProvider>
            <UserProvider>
              <ModalProvider products={products} />
              <Sidebar songs={userSongs} userId={sessionData.session?.user.id!}>
                {children}
              </Sidebar>
            </UserProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
