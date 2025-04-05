"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black  to-black/30 z-10" />
        <img
          src="/colossus/0.png"
          alt="Arquitetura moderna"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-zinc-400 text-lg md:text-xl mb-4 font-medium">ARQUITETURA & DESIGN</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bitter font-bold leading-tight mb-6">
              Criando Espaços <br />
              <span className="text-zinc-300">Inovadores e Funcionais</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-zinc-400 text-lg md:text-xl mb-8 max-w-2xl">
              Transformando visões em realidade através de design arquitetônico contemporâneo e sustentável.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#projetos">
            <Button className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-6 rounded-md">
              Ver Projetos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button></a>
            <a href="#contato"><Button variant="outline" className="border-zinc-700 hover:bg-zinc-800 px-8 py-6">
              Agendar Consulta
            </Button></a>
          </motion.div>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-zinc-500 flex justify-center pt-2">
          <motion.div
            className="w-1 h-2 bg-zinc-400 rounded-full"
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          />
        </div>
      </motion.div>
    </section>
  )
}

