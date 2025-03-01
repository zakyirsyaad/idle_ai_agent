import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from './ui/button';
import { LoaderCircle, SendHorizontal } from 'lucide-react';
import { useAccount } from 'wagmi';

interface Token {
    name: string;
    ticker: string;
    iconURL: string;
    description: string;
    Twitter: string;
    Website: string;
    Behavior: string;
    createdAt: bigint;
    owner: string;
    totalSupply: bigint;
    tokenAddress: string;
}

type Message = {
    role: "assistant" | "user";
    content: string;
}

export default function AgentModal({ AgentData }: { AgentData: Token }) {
    const { isConnected } = useAccount()
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: `Hello, how can ${AgentData.name} I help you?` }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            const newMessage: Message = { role: "user", content: input };
            setMessages((prevMessages) => [...prevMessages, newMessage]);

            try {
                setLoading(true)
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: input }),
                });
                const data = await response.json();
                if (response.ok) {
                    setMessages(prevMessages => [...prevMessages, { role: "assistant", content: data.content }]);
                } else {
                    throw new Error(data.error);
                }
                setLoading(false)
            } catch (error) {
                console.error("Error fetching AI response:", error);
                setMessages(prevMessages => [...prevMessages, { role: "assistant", content: "Sorry, I couldn't process your request." }]);
                setInput("");
                setLoading(false)
            } finally {
                setInput("");
                setLoading(false)
            }
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                {AgentData && isConnected && (
                    <Button className='w-full'>
                        Interact With {AgentData.name}
                    </Button>
                )}
                {/* {isDisconnected && <p>hai</p>} */}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chat with {AgentData.name}</DialogTitle>
                    <DialogDescription>
                        Ask me anything about {AgentData.name}.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col h-96 overflow-y-auto p-4  rounded-lg">
                    {messages.map((msg, index) => (
                        <div key={index} className={`my-2 p-2 rounded-lg ${msg.role === "user" ? " bg-primary text-secondary self-end" : "bg-secondary self-start"}`}>
                            {msg.content}
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className="flex mt-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-grow p-2 border rounded-l-lg"
                        disabled={loading}
                    />
                    <Button type="submit" className="ml-2" disabled={loading || input === ""}>
                        {loading ? <LoaderCircle className='animate-spin' /> : <SendHorizontal />}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
