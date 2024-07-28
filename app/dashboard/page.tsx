import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="dark flex flex-col min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-900 font-btdfont text-white">
      <header className="w-full p-4 bg-zinc-800/50 backdrop-blur-sm border-b border-zinc-700 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <Image src='/logo.png' alt="BToDo Logo" width={120} height={120} className='rounded-full shadow-md' />
          </Link>
          <h1 className="text-2xl font-bold ml-4">BetterToDo</h1>
        </div>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4 justify-to the very right">

          </div>
          <div className="hidden md:block space-x-4">
          </div>
        </div>
      </header>
      <main className="container mx-auto flex-1 flex flex-col items-center justify-center text-center">
        <Card className="w-full max-w-md bg-zinc-850 p-4 rounded-lg shadow-md border-2 border-zinc-200 hover:border-yellow-500">
          <CardHeader>
            <CardTitle>BetterToDo</CardTitle>
            <CardDescription>Organize Your to do list with AI on an interactive board</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/onboarding">
              <Button variant="secondary" className="bg-yellow-700">Get Started</Button>
            </Link>
            <Link href="/learnmore">
              <Button variant="default" className="ml-2">Learn More</Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
