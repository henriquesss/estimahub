import { Header } from "@/components/Header";

export default function MotivationPage() {
    return (
        <>
            <Header />
            <article>
                <div className="container mx-auto py-5">
                    <p className="text-2xl mb-2 font-bold">Motivation</p>

                    <p className="mb-4">You know that moment when you're there, in front of the client or the PO, and they drop a "how long will it take to do this"? Then you think, "I'll have to throw something out there, figure it out later." Jokes aside, this is one of the most common challenges in a developer's life, and it was thinking about this that the idea of creating a software estimation study platform emerged.</p>

                    <p className="mb-4">Have you read "The Mythical Man-Month" by Fred Brooks? This book is like the bible for developers/managers, and the guy tackles the challenges of managing software projects. The insight is that back in the 70s, he was already warning about how difficult it is to estimate the time needed to develop software. It's almost philosophical, you know? And that hasn't changed much since then...</p>

                    <p className="mb-4">So, I got it into my head that we needed a platform that not only threw numbers in our faces but also provided a broader context before making estimates. The idea here is not the relentless pursuit of precision because, let's be honest, that's like looking for a needle in a haystack. The goal is to create a consensus, a weighted average, a bunch of people giving input to at least develop a foundation. After all, if Fred Brooks already said that "adding more people to a late project makes it later," we need a Plan B, and the community is that plan.</p>

                    <p className="mb-4">The platform doesn't aim to be the oracle of programming but rather a place where people can give input, share their experiences, and together, shape this area called software estimation. Because, you know, we're all sailors in the same boat, trying not to drown in lines of code.</p>

                    <p>We're just getting started. 🚀</p>
                </div>
            </article>

        </>

    )
}