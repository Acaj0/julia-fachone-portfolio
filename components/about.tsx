"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="sobre" className="py-20 md:py-32 bg-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-zinc-700" />
            <img
              src="/julia.jpg"
              alt="Julia Leão Fachone"
              className="w-full h-auto rounded-md relative z-10"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-zinc-700" />
          </div>

          <div>
            <motion.div variants={variants} transition={{ duration: 0.5, delay: 0.2 }}>
              <h2 className="text-zinc-400 text-lg mb-2">SOBRE MIM</h2>
              <h3 className="text-3xl md:text-4xl font-bitter font-bold mb-6">Julia Leão Fachone</h3>
            </motion.div>

            <motion.div variants={variants} transition={{ duration: 0.5, delay: 0.4 }}>
              <p className="text-zinc-400 mb-6">
                Arquiteta formada pela Universidade de São Paulo, com especialização em Design de Interiores pela
                Parsons School of Design em Nova York. Com mais de 10 anos de experiência, meu trabalho é reconhecido
                pela fusão de estética contemporânea e funcionalidade.
              </p>
              <p className="text-zinc-400 mb-6">
                Acredito que a arquitetura vai além da construção de espaços físicos – é sobre criar ambientes que
                inspiram, acolhem e transformam vidas. Cada projeto é uma oportunidade de traduzir sonhos em realidade,
                respeitando o contexto urbano e ambiental.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

