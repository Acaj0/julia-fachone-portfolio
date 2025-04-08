"use client"

import Link from "next/link"
import { Instagram, Linkedin, Facebook, ArrowUp } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-black border-t border-zinc-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bitter font-medium mb-4">Julia Leão Fachone</h3>
            <p className="text-zinc-400 mb-6 max-w-md">
              Criando espaços que inspiram, transformam e elevam a experiência humana através de design arquitetônico
              inovador e sustentável.
            </p>
            <div className="flex space-x-4">
             
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="#sobre" className="text-zinc-400 hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="#projetos" className="text-zinc-400 hover:text-white transition-colors">
                  Projetos
                </Link>
              </li>
              <li>
                <Link href="#contato" className="text-zinc-400 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Serviços</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                  Arquitetura Residencial
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                  Design de Interiores
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                  Arquitetura Comercial
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                  Consultoria
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-900">
          <p className="text-zinc-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Julia Leão Fachone. Todos os direitos reservados.
          </p>
          <button onClick={scrollToTop} className="flex items-center text-zinc-400 hover:text-white transition-colors">
            Voltar ao topo <ArrowUp className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}

