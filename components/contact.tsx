"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, Send, Loader2 } from "lucide-react"
import { sendEmail } from "@/app/actions/send-email"
import { useToast } from "@/components/ui/use-toast"

export default function Contact() {
  const { toast } = useToast()
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

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await sendEmail(formData)

      if (result.success) {
        toast({
          title: "Mensagem enviada",
          description: "Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.",
          variant: "default",
        })
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        toast({
          title: "Erro ao enviar mensagem",
          description: result.error || "Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
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

        <div className="bg-zinc-900/80 rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="bg-zinc-900 p-8">
              <h4 className="text-xl font-medium mb-8">Informações de Contato</h4>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="mt-1 mr-4">
                    <Mail className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400">Email</p>
                    <a
                      href="mailto:julia.fachone@gmail.com"
                      className="font-medium hover:text-zinc-300 transition-colors"
                    >
                      julia.fachone@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-4">
                    <Phone className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400">Telefone</p>
                    <a href="tel:+556599918505" className="font-medium hover:text-zinc-300 transition-colors">
                      +55 (65) 9991-8505
                    </a>
                  </div>
                </div>
              </div>

              <p className="text-zinc-400 text-sm">
                Ficarei feliz em responder suas perguntas e discutir como posso ajudar no seu projeto.
              </p>
            </div>

            <div className="p-8 bg-zinc-900">
              <h4 className="text-xl font-medium mb-6">Envie uma Mensagem</h4>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-zinc-800/50 border-zinc-700 focus:border-zinc-500"
                    disabled={isSubmitting}
                  />

                  <Input
                    type="email"
                    name="email"
                    placeholder="Seu email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-zinc-800/50 border-zinc-700 focus:border-zinc-500"
                    disabled={isSubmitting}
                  />
                </div>

                <Input
                  type="tel"
                  name="phone"
                  placeholder="Seu telefone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-zinc-800/50 border-zinc-700 focus:border-zinc-500"
                  disabled={isSubmitting}
                />

                <Textarea
                  name="message"
                  placeholder="Sua mensagem"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="bg-zinc-800/50 border-zinc-700 focus:border-zinc-500 min-h-[120px]"
                  disabled={isSubmitting}
                />

                <div className="text-right">
                  <Button
                    type="submit"
                    className="bg-zinc-800 hover:bg-zinc-700 transition-colors p-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Mensagem <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
