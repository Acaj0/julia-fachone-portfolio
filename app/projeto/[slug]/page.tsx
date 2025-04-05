"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Calendar, MapPin, Grid3X3, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Tipo para os dados do projeto
type ProjectDetails = {
  id: number
  title: string
  slug: string
  description: string
  fullDescription: string
  category: string
  location: string
  year: string
  area: string
  client: string
  mainImage: string
  images: string[]
}

// Dados simulados de projetos (em uma aplicação real, estes viriam de uma API ou CMS)
const projectsData: ProjectDetails[] = [
  {
    id: 1,
    title: "Residência Ipanema",
    slug: "residencia-ipanema",
    description: "Projeto residencial contemporâneo com vista para o mar",
    fullDescription:
      "Esta residência de 450m² em Ipanema foi projetada para uma família que valoriza espaços amplos e integrados com a natureza. O projeto explora a relação entre interior e exterior através de grandes aberturas e terraços que emolduram a vista para o mar. Materiais naturais como madeira e pedra foram combinados com elementos contemporâneos, criando um ambiente sofisticado e acolhedor. A iluminação natural foi priorizada em todos os ambientes, reduzindo o consumo energético e criando uma atmosfera agradável durante todo o dia.",
    category: "Residencial",
    location: "Rio de Janeiro, RJ",
    year: "2023",
    area: "450m²",
    client: "Família Almeida",
    mainImage: "/placeholder.svg?height=800&width=1200",
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1000",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1000",
    ],
  },
  {
    id: 2,
    title: "Escritório Corporativo Paulista",
    slug: "escritorio-corporativo-paulista",
    description: "Espaço corporativo moderno na Avenida Paulista",
    fullDescription:
      "Este projeto de 1200m² para uma empresa de tecnologia na Avenida Paulista buscou criar um ambiente de trabalho que estimulasse a criatividade e colaboração. O layout aberto é complementado por espaços de reunião flexíveis e áreas de descompressão. Utilizamos uma paleta de cores neutras com pontos de cor estratégicos, mobiliário ergonômico e tecnologia integrada. Aspectos de sustentabilidade foram incorporados através de sistemas de iluminação inteligente, aproveitamento da luz natural e materiais de baixo impacto ambiental.",
    category: "Comercial",
    location: "São Paulo, SP",
    year: "2022",
    area: "1200m²",
    client: "TechFuture Inc.",
    mainImage: "/placeholder.svg?height=800&width=1200",
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1000",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1000",
    ],
  },
]

export default function ProjectPage() {
  const router = useRouter()
  const { slug } = useParams() as { slug: string }
  const [project, setProject] = useState<ProjectDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  useEffect(() => {
    // Simulando uma chamada de API para buscar os detalhes do projeto
    const fetchProject = () => {
      setLoading(true)
      // Em uma aplicação real, isso seria uma chamada de API
      const foundProject = projectsData.find((p) => p.slug === slug)

      if (foundProject) {
        setProject(foundProject)
        setSelectedImage(foundProject.mainImage)
      } else {
        // Projeto não encontrado, redirecionar para a página de projetos
        router.push("/#projetos")
      }

      setLoading(false)
    }

    fetchProject()
  }, [slug, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-zinc-400">Carregando...</div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-zinc-400">Projeto não encontrado</div>
      </div>
    )
  }

  const openLightbox = (image: string) => {
    setSelectedImage(image)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    if (!selectedImage || !project) return
    const currentIndex = project.images.indexOf(selectedImage)
    const nextIndex = (currentIndex + 1) % project.images.length
    setSelectedImage(project.images[nextIndex])
  }

  const prevImage = () => {
    if (!selectedImage || !project) return
    const currentIndex = project.images.indexOf(selectedImage)
    const prevIndex = (currentIndex - 1 + project.images.length) % project.images.length
    setSelectedImage(project.images[prevIndex])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900">
      <Navbar />

      {/* Lightbox */}
      {lightboxOpen && selectedImage && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center" onClick={closeLightbox}>
          <button
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50"
            onClick={closeLightbox}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-x"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>

          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50"
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
          >
            <ArrowLeft size={24} />
          </button>

          <img
            src={selectedImage || "/placeholder.svg"}
            alt={project.title}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />

          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50"
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
          >
            <ArrowRight size={24} />
          </button>
        </div>
      )}

      <main className="pt-24 pb-16">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex items-center text-sm text-zinc-400">
            <Button
              variant="link"
              className="p-0 text-zinc-400 hover:text-white"
              onClick={() => router.push("/#projetos")}
            >
              Projetos
            </Button>
            <span className="mx-2">/</span>
            <span className="text-white">{project.title}</span>
          </div>
        </div>

        {/* Project Header */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bitter font-bold mb-4"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-zinc-300 mb-8 max-w-3xl"
          >
            {project.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-6 text-sm"
          >
            <div className="flex items-center text-zinc-400">
              <Calendar size={16} className="mr-2" />
              <span>
                Ano: <span className="text-white">{project.year}</span>
              </span>
            </div>
            <div className="flex items-center text-zinc-400">
              <MapPin size={16} className="mr-2" />
              <span>
                Local: <span className="text-white">{project.location}</span>
              </span>
            </div>
            <div className="flex items-center text-zinc-400">
              <Grid3X3 size={16} className="mr-2" />
              <span>
                Área: <span className="text-white">{project.area}</span>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        >
          <div
            className="w-full aspect-video relative overflow-hidden rounded-lg cursor-pointer"
            onClick={() => openLightbox(project.mainImage)}
          >
            <img
              src={project.mainImage || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-black/60 rounded-full p-3">
                <ExternalLink size={24} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Description and Details */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <h2 className="text-2xl font-bitter font-bold mb-6">Sobre o Projeto</h2>
              <div className="prose prose-invert prose-zinc max-w-none">
                <p className="text-zinc-300 leading-relaxed">{project.fullDescription}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-lg border border-zinc-800 h-fit"
            >
              <h3 className="text-xl font-medium mb-6">Detalhes do Projeto</h3>

              <div className="space-y-4">
                <div className="border-b border-zinc-800 pb-3">
                  <p className="text-sm text-zinc-400 mb-1">Cliente</p>
                  <p className="font-medium">{project.client}</p>
                </div>
                <div className="border-b border-zinc-800 pb-3">
                  <p className="text-sm text-zinc-400 mb-1">Categoria</p>
                  <p className="font-medium">{project.category}</p>
                </div>
                <div className="border-b border-zinc-800 pb-3">
                  <p className="text-sm text-zinc-400 mb-1">Localização</p>
                  <p className="font-medium">{project.location}</p>
                </div>
                <div className="border-b border-zinc-800 pb-3">
                  <p className="text-sm text-zinc-400 mb-1">Ano</p>
                  <p className="font-medium">{project.year}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Área</p>
                  <p className="font-medium">{project.area}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-2xl font-bitter font-bold mb-8"
          >
            Galeria de Imagens
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {project.images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="aspect-[4/3] overflow-hidden rounded-lg cursor-pointer"
                onClick={() => openLightbox(image)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${project.title} - Imagem ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Navigation between projects */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-zinc-800 pt-8 mt-16">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <Button
                variant="outline"
                className="mb-4 sm:mb-0 border-zinc-700 hover:bg-zinc-800"
                onClick={() => router.push("/#projetos")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para Projetos
              </Button>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="border-zinc-700 hover:bg-zinc-800"
                  onClick={() => {
                    // Em uma aplicação real, você navegaria para o projeto anterior
                    const currentIndex = projectsData.findIndex((p) => p.slug === slug)
                    const prevIndex = (currentIndex - 1 + projectsData.length) % projectsData.length
                    router.push(`/projeto/${projectsData[prevIndex].slug}`)
                  }}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Projeto Anterior
                </Button>

                <Button
                  variant="outline"
                  className="border-zinc-700 hover:bg-zinc-800"
                  onClick={() => {
                    // Em uma aplicação real, você navegaria para o próximo projeto
                    const currentIndex = projectsData.findIndex((p) => p.slug === slug)
                    const nextIndex = (currentIndex + 1) % projectsData.length
                    router.push(`/projeto/${projectsData[nextIndex].slug}`)
                  }}
                >
                  Próximo Projeto
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

