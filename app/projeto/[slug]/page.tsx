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

const projectsData: ProjectDetails[] = [
  {
    id: 1,
    title: "Conforto Térmico em Habitação de Interesse Social",
    slug: "conforto-termico",
    description: "São moradias produzidas por Programas Habitacionais, financiadas pelo Governo Federal em parceria com o Estado, Municípios e entidades sem fins lucrativos.",
    fullDescription:
      " O termo “conforto térmico” define-se pela condição mental do ser humano de expressar satisfação e bem-estar no ambiente em que ele está inserido. Isso significa estar em um lugar onde não sinta a necessidade de utilizar meios para aumentar ou diminuir a temperatura. Cuiabá está localizada no centro oeste do país, numa das regiões mais quentes do Brasil. A temperatura média mensal é de aproximadamente 27°C nos meses de Outubro a Março. Os menores valores de temperaturas médias mensais ocorrem no mês de Junho e Julho, em torno de 22ºC, mas as temperaturas podem atingir até 10°C quando frentes frias vindas do sul passam sobre a região.",
    category: "Residencial",
    location: "Cuiabá-MT",
    year: "2023",
    area: "200m²",
    client: "UNIVAG",
    mainImage: "/conforto-termico/1.png",
    images: [
      "/conforto-termico/2.png",
      "/conforto-termico/3.png",
      "/conforto-termico/4.png",
      "/conforto-termico/6.png",
      "/conforto-termico/7.jpg",
    ],
  },
  {
    id: 2,
    title: "Edifício Colossus",
    slug: "Edificio-Colossus",
    description: "O edifício se formou da ideia preliminar separar de os apartamentos em duas torres sobre os pavimentos comerciais e estacionamentos. Como também mesclar a crueza dos materiais utilizados com o verde.",
    fullDescription:
      " O Edifico se localiza em uma das mais importante avenidas da região leste do município de Cuiabá, Av. Historiador Rubens de Mendonça, em uma zona de centros regionais (ZCR). O estilo arquitetônico utilizado, Eco-brutalismo veio da idealização de reconciliar o ambiente urbano com o natural, como também,  jogar com um senso de justaposição entre conceitos diferentes, o “sombrio” design humano e a vibrante resiliência da natureza. Suas volumetrias e disposições foram pensados para pessoas que estão começando uma nova jornada em sua vida, que procuram espaço e conforto para si, conjugue e sua família. Além de possuir áreas sociais destinadas aos moradores, o edifício também conta com dois pavimentos destinados a salas comerciais abertas ao público.  Facilitando o acesso a certas atividades daqueles que moram no local, como também, atendendo a determinadas necessidades do público ao seu redor.",
    category: "Residencial",
    location: "Cuiabá-MT",
    year: "2024",
    area: "18.735,96m²",
    client: "UNIVAG",
    mainImage: "/colossus/0.png",
    images: [
        "/colossus/2.png",
        "/colossus/3.png",
        "/colossus/4.png",
        "/colossus/5.png",
        "/colossus/6.png",
        "/colossus/7.jpg",
        "/colossus/8.png",
        "/colossus/9.png",
        "/colossus/10.png",
        "/colossus/11.png",
        "/colossus/12.png",
        "/colossus/13.jpg",
        "/colossus/14.jpg",
        "/colossus/15.png",
        "/colossus/16.jpg",
        "/colossus/17.jpg"
      ],
  },
  {
    id: 3,
    title: "Casa 300: Uma Proposta de Hostel",
    slug: "casa-300",
    description: "Atualmente interditada por suas condições estruturais, a proposta busca requalificar o espaço transformando-o em um hostel cultural, que preserve sua arquitetura colonial original e promova encontros e experiências no coração do centro histórico.",
    fullDescription:
      " Sua edificação remonta ao ano de 1731, sendo erguida apenas 12 anos após a fundação de Cuiabá. O casarão é mencionado na literatura local como a residência do Coronel Caracíolo. Durante os anos de 1960 a 1970, a família Mattos residiu nessa casa. Foi lá que o poeta Aclyse de Mattos e seu irmão, o escritor e quadrinista Gabriel Francisco de Mattos, passaram parte de sua infância. Nos primeiros anos da década de 1990, o imóvel abrigou o restaurante e casa de espetáculos Casarão, que era administrado pelo ator Liu Arruda, conhecido por criar a famosa personagem Comadre Nhara. No ano de 1998, por meio da união de diversas entidades culturais, tais como a AMA - Associação Mato-grossense de Artesãos, a AMAV - Associação Mato-grossense de Áudio/Visual e a FEMAT Federação Mato-grossense de Teatro, o casarão passou a ser conhecido como Centro Cultural Oficina 300. Desse modo, o edifício se tornou um renomado espaço cultural alternativo no centro histórico de Cuiabá. Além disso, o Centro Cultural Oficina 300 foi frequentemente utilizado como local de encontros do Fórum Mato-grossense Permanente de Cultura, reforçando sua relevância como um ponto de referência cultural na região. Atualmente a Casa 300 encontra-se interditada devido suas más condições estruturais atuais, apresentando risco de desabamento aos visitantes.",
    category: "Cultural",
    location: "Cuiabá-MT",
    year: "2023",
    area: "583m²",
    client: "UNIVAG",
    mainImage: "/1/1.png",
    images: [
      "/1/2.png",
      "/1/3.png",
      "/1/4.png",
      "/1/6.png",
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
    const fetchProject = () => {
      setLoading(true)
      const foundProject = projectsData.find((p) => p.slug === slug)

      if (foundProject) {
        setProject(foundProject)
        setSelectedImage(foundProject.mainImage)
      } else {
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

