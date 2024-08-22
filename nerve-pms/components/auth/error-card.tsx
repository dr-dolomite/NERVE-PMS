import React from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { 
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
 } from '@/components/ui/card'

const ErrorCard = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
            <Card className='max-w-lg'>
        <CardHeader>
            <CardTitle>
                Error!
            </CardTitle>
        </CardHeader>
        <CardContent className='grid grid-cols-1 gap-y-4'>
            <CardDescription>
                An error occurred while we are trying to authenticate you.
            </CardDescription>
            <Link href='/'>
                <Button className='my-button-blue' size="lg">Go back to Login</Button>
            </Link>
        </CardContent>
    </Card>
    </div>

  )
}

export default ErrorCard