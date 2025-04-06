"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type Project = {
  id: number
  title: string
  category: string[]
  image: string
  year: string
  slug: string
}

export default function Projects() {
  const router = useRouter()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const projects: Project[] = [
    {
      id: 1,
      title: "Conforto Térmico em Habitação de Interesse Social",
      category: ["Residencial"],
      image: "/conforto-termico/4.png",
      year: "2023",
      slug: "conforto-termico",
    },
    {
      id: 2,
      title: "Edifício Colossus",
      category: ["Residencial", "Comercial"],
      image: "/colossus/0.png",
      year: "2024",
      slug: "Edificio-Colossus",
    },
    {
      id: 3,
      title: "Casa 300: Uma Proposta de Hostel",
      category: ["Cultural"],
      image: "/1/1.png",
      year: "2023",
      slug: "casa-300",
    },
    {
      id: 4,
      title: "Pavilhão - Vale das Cachoeiras",
      category: ["Cultural"],
      image: "/2/0.png",
      year: "2023",
      slug: "pavilhao",
    },
    {
      id: 5,
      title: "Projeto de Requalificação Urbana",
      category: ["Urbanismo"],
      image: "/3/0.png",
      year: "2023",
      slug: "urbanismo",
    },  
  ]

  const [activeFilter, setActiveFilter] = useState("Todos")
  const categories = ["Todos", "Residencial", "Comercial", "Cultural","Urbanismo"]

  const filteredProjects =
    activeFilter === "Todos" ? projects     : projects.filter((project) => project.category.includes(activeFilter))


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const handleProjectClick = (slug: string) => {
    router.push(`/projeto/${slug}`)
  }

  return (
    <section id="projetos" className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-zinc-400 text-lg mb-2">PORTFÓLIO</h2>
          <h3 className="text-3xl md:text-4xl font-bitter font-bold mb-6">Projetos Selecionados</h3>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Uma seleção dos meus trabalhos mais recentes e significativos, demonstrando minha abordagem para diferentes
            tipos de espaços e necessidades.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              className={
                activeFilter === category ? "bg-zinc-800 hover:bg-zinc-700" : "border-zinc-700 hover:bg-zinc-800"
              }
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              transition={{ duration: 0.5 }}
              className="group relative overflow-hidden rounded-md cursor-pointer"
              onClick={() => handleProjectClick(project.slug)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-zinc-400 text-sm">
                  {project.category} • {project.year}
                </span>
                <h4 className="text-xl font-medium mt-1">{project.title}</h4>
                <Button variant="link" className="text-white p-0 mt-2 w-fit">
                  Ver Projeto <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
        </motion.div>
      </div>
    </section>
  )
}

