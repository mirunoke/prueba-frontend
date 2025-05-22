import "jsvectormap/dist/css/jsvectormap.css";
import "@/css/style.css";
import ClientLayout from "@/components/layouts/client-layout";
import { ChakraProvider } from '@chakra-ui/react'
import { poppins } from "@/components/ui/fonts";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body suppressHydrationWarning={true} className={`${poppins.className} antialiase`}>
      <ChakraProvider>
        <ClientLayout>
          {children}
        </ClientLayout>
      </ChakraProvider>  
      </body>
    </html>
  );
}
