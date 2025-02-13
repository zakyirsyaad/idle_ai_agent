import React from 'react'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Input } from './ui/input'

export default function BuySell() {
    return (
        <Tabs defaultValue="buy" className="w-full space-y-5">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="sell">Sell</TabsTrigger>
            </TabsList>
            <TabsContent value="buy">
                <div className="space-y-2">
                    <div className='flex items-center justify-between text-sm text-muted-foreground gap-5'>
                        <h1>Amount (IDLE)</h1>
                        <p>Balance: 0.000100</p>
                    </div>
                    <Input type="text" placeholder="Enter amount to buy" />
                    <p className='text-sm text-muted-foreground'>You will receive: 0.000100 NAMA TOKEN</p>
                    <Button className="w-full">Confirm Buy</Button>
                </div>
            </TabsContent>
            <TabsContent value="sell">
                <div className="space-y-2">
                    <div className='flex items-center justify-between text-sm text-muted-foreground gap-5'>
                        <h1>Amount (NAMA TOKEN)</h1>
                        <p>Balance: 0.000100</p>
                    </div>
                    <Input type="text" placeholder="Enter amount to sell" />
                    <p className='text-sm text-muted-foreground'>You will receive: 0.000100 NAMA TOKEN</p>
                    <Button className="w-full">Confirm Sell</Button>
                </div>
            </TabsContent>
        </Tabs>
    )
}

