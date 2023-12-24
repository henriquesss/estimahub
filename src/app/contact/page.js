import { Header } from "@/components/Header";

export default function ContactPage() {
    return (
        <>
            <Header />
            <article>
                <div className="container mx-auto py-5">
                    <p className="text-2xl mb-2 font-bold">Contato</p>
                    <p className="mb-4">Caso queira falar sobre alguma dúvida, sugestão, reclamação, problema de segurança ou qualquer outro assunto, pode enviar um email diretamente para:</p>
                    <p>henriques.pessoal@gmail.com</p>
                </div>
            </article>

        </>

    )
}