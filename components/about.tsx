"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

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
            <motion.div
              variants={variants}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-zinc-400 text-lg mb-2">SOBRE MIM</h2>
              <h3 className="text-3xl md:text-4xl font-bitter font-bold mb-6">
                Julia Leão Fachone
              </h3>
            </motion.div>

            <motion.div
              variants={variants}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-zinc-400 mb-6">
                Arquiteta formada pela UNIVAG, com especialização em
                Empreendedorismo pelo Empretec. Atualmente integra a equipe da
                JLF Construtora, onde desenvolve projetos residenciais e
                comerciais com foco em inovação, eficiência e viabilidade.
              </p>
              <p className="text-zinc-400 mb-6">
                Seu grande diferencial está no acompanhamento próximo das obras
                — Júlia faz questão de estar presente no campo, garantindo que
                cada etapa do projeto seja executada com excelência e fidelidade
                ao conceito original.
              </p>
              <p className="text-zinc-400 mb-6">
                Acredita que a arquitetura vai além do papel: é na vivência do
                canteiro e na escuta ativa dos clientes que surgem soluções que
                realmente transformam. Para ela, criar espaços é transformar
                rotinas, promover bem-estar e valorizar cada detalhe que torna
                um ambiente único.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
