"use client"


import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
import { Activity, Briefcase, Calendar, CalendarDays, ClockIcon, ListTodo, Shell, Zap, ZapIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Onboarding() {

    const [focus, setFocus] = useState('productivity');

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const todolist = formData.get('todolist');
        const intensity = formData.get('intensity');
        const events = formData.get('events');
        const timeSensitive = formData.get('time-sensitive') === 'on';
        const focus = formData.get('focus');

        // Constructing the prompt based on user inputs
        const prompt = `
        Based on the following information, create a categorized to-do list:
        
        To-Do List: ${todolist}
        Intensity: ${intensity}
        Number of Events: ${events}
        Time Sensitive: ${timeSensitive ? 'Yes' : 'No'}
        Focus: ${focus}
        
        Please categorize the tasks into appropriate groups based on their nature, not just by priority.
        Provide the output in the following JSON format:
        {
          "categories": [
            {"id": "category1", "title": "Category 1 Title"},
            {"id": "category2", "title": "Category 2 Title"},
            ...
          ],
          "tasks": {
            "category1": ["task1", "task2", ...],
            "category2": ["task3", "task4", ...],
            ...
          }
        }
        `;

        console.log(prompt)
        try {
            console.log('Fetching data from API');
            const response = await fetch("/api/openai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: prompt }),
            }); 

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            console.log('Data fetched successfully');
            const data = await response.json();
            console.log('Data:', data);
            const suggestion = data.choices[0].message.content;
            console.log('Suggestion:', suggestion);
            console.log('Storing API response in sessionStorage');
            sessionStorage.setItem('apiResponse', suggestion);
            console.log('Redirecting to board page');
            router.push('/board');
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className="dark flex flex-col min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-900 font-btdfont text-white space-y-4">
            <header className="w-full p-4 bg-zinc-800/50 backdrop-blur-sm border-b border-zinc-700 flex items-center justify-between space-y-4">
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
                <form onSubmit={handleSubmit}>
                    <Card className="bg-zinc-850 p-4 rounded-lg shadow-md border-2 border-zinc-200 hover:border-yellow-500 text-foreground dark:bg-card dark:text-card-foreground">
                        <CardHeader className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CalendarDays className="h-6 w-6" />
                                <h3 className="text-lg font-semibold">Your day</h3>
                            </div>
                            <CardTitle>Answer some questions:</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-16">
                            <div className="flex items-center gap-2">
                                <ListTodo className="h-6 w-6 text-muted-foreground" />
                                <Textarea name="todolist" placeholder="To-Do List" className="flex-1 bg-muted text-muted-foreground" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Activity className="h-6 w-6 text-muted-foreground" />
                                <RadioGroup name="intensity" defaultValue="balanced" className="flex items-center gap-4">
                                    <Label
                                        htmlFor="intense"
                                        className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 [&:has([data-state=checked])]:bg-yellow-600 [&:has([data-state=checked])]:text-yellow-600-foreground"
                                    >
                                        <RadioGroupItem id="intense" value="intense" className="peer sr-only" />
                                        <Zap className="h-6 w-6" />
                                        Make Intense
                                    </Label>
                                    <Label
                                        htmlFor="light"
                                        className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 [&:has([data-state=checked])]:bg-yellow-600 [&:has([data-state=checked])]:text-yellow-600-foreground"
                                    >
                                        <RadioGroupItem id="light" value="light" className="peer sr-only" />
                                        <ZapIcon className="h-6 w-6" />
                                        Make Light
                                    </Label>
                                    <Label
                                        htmlFor="balanced"
                                        className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 [&:has([data-state=checked])]:bg-yellow-600 [&:has([data-state=checked])]:text-yellow-600-foreground"
                                    >
                                        <RadioGroupItem id="balanced" value="balanced" className="peer sr-only" />
                                        <ZapIcon className="h-6 w-6" />
                                        Balanced
                                    </Label>
                                </RadioGroup>
                            </div>
                            <div>
                                <Label htmlFor="events">Number of Events</Label>
                                <div className="mt-2 flex flex-col gap-2">
                                    <Slider name="events" id="events" min={1} max={10} defaultValue={[5]} />
                                    <div className="flex justify-between text-sm text-muted-foreground">
                                        <span>1</span>
                                        <span>5</span>
                                        <span>10</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <ClockIcon className="h-6 w-6 text-muted-foreground" />
                                <Switch name="time-sensitive" id="time-sensitive" color="#fcba03" />
                                <Label htmlFor="time-sensitive">Time Sensitive</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Briefcase className="h-6 w-6 text-muted-foreground" />
                                <ToggleGroup
                                    type="single"
                                    defaultValue={focus}
                                    className="flex items-center gap-2"
                                    onValueChange={(value) => setFocus(value)} // Update the state when the value changes
                                >
                                    <ToggleGroupItem
                                        value="productivity"
                                        className="rounded-md px-3 py-2 [&:has([data-state=on])]:bg-yellow-600 [&:has([data-state=on])]:text-yellow-600-foreground"
                                    >
                                        Productivity
                                    </ToggleGroupItem>
                                    <ToggleGroupItem
                                        value="relaxation"
                                        className="rounded-md px-3 py-2 [&:has([data-state=on])]:bg-yellow-600 [&:has([data-state=on])]:text-yellow-600-foreground"
                                    >
                                        Relaxation
                                    </ToggleGroupItem>
                                    <ToggleGroupItem
                                        value="maintenance"
                                        className="rounded-md px-3 py-2 [&:has([data-state=on])]:bg-yellow-600 [&:has([data-state=on])]:text-yellow-600-foreground"
                                    >
                                        Maintenance
                                    </ToggleGroupItem>
                                </ToggleGroup>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end border-t border-zinc-700 p-4">
                            <Button type="submit" variant="default" className="bg-yellow-600 hover:bg-yellow-300 text-zinc-800">
                                Submit
                            </Button>
                        </CardFooter>
                    </Card>
                    <input type="hidden" name="focus" value={focus} />
                </form>
            </main>
        </div>
    )
}