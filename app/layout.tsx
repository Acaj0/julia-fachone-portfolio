import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Bitter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

const bitter = Bitter({
  subsets: ["latin"],
  variable: "--font-bitter",
})

export const metadata: Metadata = {
  title: "Julia Leão Fachone | Arquitetura",
  description: "Portfólio de arquitetura de Julia Leão Fachone - Criando espaços inovadores e funcionais",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${bitter.variable} font-sans bg-black`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
