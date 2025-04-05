"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você adicionaria a lógica para enviar o formulário
    console.log(formData)
    alert("Mensagem enviada com sucesso!")
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

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

  return (
    <section id="contato" className="py-20 md:py-32 bg-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-zinc-400 text-lg mb-2">CONTATO</h2>
          <h3 className="text-3xl md:text-4xl font-bitter font-bold mb-6">Vamos Conversar Sobre Seu Projeto</h3>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Estou disponível para discutir novas oportunidades de projeto e colaborações. Entre em contato para agendar
            uma consulta inicial.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <motion.div variants={itemVariants} transition={{ duration: 0.5 }} className="mb-8">
              <h4 className="text-xl font-medium mb-6">Informações de Contato</h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400">Email</p>
                    <p className="font-medium">contato@juliafachone.com.br</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400">Telefone</p>
                    <p className="font-medium">+55 (11) 99999-9999</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center mr-4">
                    <MapPin className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400">Endereço</p>
                    <p className="font-medium">Rua Oscar Freire, 1000 - Jardins</p>
                    <p className="text-zinc-400">São Paulo, SP - Brasil</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} transition={{ duration: 0.5, delay: 0.3 }}>
              <h4 className="text-xl font-medium mb-6">Horário de Atendimento</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Segunda - Sexta</span>
                  <span>09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Sábado</span>
                  <span>Por agendamento</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Domingo</span>
                  <span>Fechado</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-lg border border-zinc-800"
          >
            <motion.h4 variants={itemVariants} transition={{ duration: 0.5 }} className="text-xl font-medium mb-6">
              Envie uma Mensagem
            </motion.h4>
            <form onSubmit={handleSubmit}>
              <motion.div variants={itemVariants} transition={{ duration: 0.5, delay: 0.1 }} className="mb-4">
                <Input
                  type="text"
                  name="name"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-zinc-800/50 border-zinc-700"
                />
              </motion.div>
              <motion.div variants={itemVariants} transition={{ duration: 0.5, delay: 0.2 }} className="mb-4">
                <Input
                  type="email"
                  name="email"
                  placeholder="Seu email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-zinc-800/50 border-zinc-700"
                />
              </motion.div>
              <motion.div variants={itemVariants} transition={{ duration: 0.5, delay: 0.3 }} className="mb-4">
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Seu telefone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-zinc-800/50 border-zinc-700"
                />
              </motion.div>
              <motion.div variants={itemVariants} transition={{ duration: 0.5, delay: 0.4 }} className="mb-6">
                <Textarea
                  name="message"
                  placeholder="Sua mensagem"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="bg-zinc-800/50 border-zinc-700 min-h-[120px]"
                />
              </motion.div>
              <motion.div variants={itemVariants} transition={{ duration: 0.5, delay: 0.5 }}>
                <Button type="submit" className="w-full bg-zinc-800 hover:bg-zinc-700">
                  Enviar Mensagem <Send className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

