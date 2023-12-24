import { Header } from "@/components/Header";

export default function StatusPage() {
    return (
        <>
            <Header />
            <article>
                <div className="container mx-auto py-5">
                    <h1 className="text-2xl">Status da plataforma</h1>
                    <p>Em breve:</p>
                    <p>Quantidade total de usuários</p>
                    <p>Quantidade total de estimativas</p>
                    <p>Quantidade total de estimativas assertivas</p>
                    <p>Dados do db da firebase e seu status</p>
                    <p>Dados do servidor web da Vercel e seu status</p>
                    <p>Lista de contribuidores</p>
                </div>
            </article>

        </>

    )
}