import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaVideo } from 'react-icons/fa';

const LearnMore: React.FC = () => {
    return (
        <div className="dark flex flex-col min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 font-btdfont text-white">
            <header className="w-full p-4 bg-zinc-800/50 backdrop-blur-sm border-b border-zinc-700 flex items-center justify-between">
                <div className="flex items-center">
                    <Link href="/">
                        <Image src='/logo.png' alt="Daymor Logo" width={120} height={120} className='rounded-full shadow-md' />
                    </Link>
                    <h1 className="text-2xl font-bold ml-4">BetterToDo</h1>
                </div>
            </header>
            <main className="container mx-auto flex-1 flex flex-col items-center justify-center text-center">
                <Card className="w-full max-w-md bg-zinc-700 p-4 rounded-lg shadow-md">
                    <CardHeader>
                        <CardTitle>About BetterToDo</CardTitle>
                        <CardDescription>
                            Organize Your to do list with AI on an interactive board
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h2 className="text-lg font-semibold">Acknowledgements</h2>
                            <Link href="https://www.linkedin.com/in/rithvik-sabnekar-1971a3266/">
                                <Button variant="secondary" className="mt-2">
                                    <FaLinkedin className='mr-2' />
                                    Creator - Rithvik Sabnekar
                                </Button>
                            </Link>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Watch Demo</h2>
                            <a href="https://drive.google.com/file/d/1KJ21vUu9V5XHqxFP5JP6n33OIJKsmhYs/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                                <Button variant="secondary" className="mt-2">
                                    <FaVideo className='mr-2' />
                                    Watch Demo
                                </Button>
                            </a>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Technologies Used</h2>
                            <div className="flex flex-wrap justify-center mt-2 space-x-2">
                                <Button variant="secondary">Next.js, Shadcn/ui</Button>
                                <Button variant="secondary">OpenAI GPT-3.5</Button>
                                <Link href="https://github.com/Georgegriff/react-dnd-kit-tailwind-shadcn-ui/tree/main">
                                    <Button variant="secondary" className="mt-2">react-dnd-kit-tailwind-shadcn-ui by Georgegriff</Button>
                                </Link>
                            </div>
                        </div>
                        <Link href="/">
                            <Button variant="secondary" className="bg-yellow-700 mt-4">
                                Go Back Home
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default LearnMore;