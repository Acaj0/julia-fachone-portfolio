"use server"

import { Resend } from "resend"

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

export type ContactFormData = {
  name: string
  email: string
  phone: string
  message: string
}

export async function sendEmail(formData: ContactFormData) {
  try {
    const { name, email, phone, message } = formData

    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", // Update with your verified domain
      to: "julia.fachone@gmail.com", // Your email address
      subject: `Nova mensagem de contato de ${name}`,
      text: `
        Nome: ${name}
        Email: ${email}
        Telefone: ${phone || "Não informado"}
        
        Mensagem:
        ${message}
      `,
      // You can also use HTML for a more formatted email
      html: `
        <h2>Nova mensagem de contato</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone || "Não informado"}</p>
        <h3>Mensagem:</h3>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Ocorreu um erro ao enviar o email",
    }
  }
}
