import Link from 'next/link'

export const Footer = () => {
    return (
        <div className="text-center py-6 bottom-0 left-0 w-full relative bg-gray-200">
            <div className='w-1/3 mx-auto'>
                <div className="flex flex-row justify-around flex-wrap mb-2">
                    <Link className="underline" href="/motivation">Motivação</Link>
                    <a className="underline" href="https://github.com/henriquesss/estimahub" target='_blank'>Github</a>
                    <Link className="underline" href="/contact">Contato</Link>
                    <Link className="underline" href="/status">Status</Link>
                    <Link className="underline" href="/terms-of-use">Termos de uso</Link>
                </div>
                <p className='text-sm'>
                    Todos direitos reservados. Estimahub.
                </p>
            </div>
        </div>
    )
}