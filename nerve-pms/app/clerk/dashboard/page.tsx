import React from 'react'
import { Button } from '@/components/ui/button'

import { CirclePlus } from 'lucide-react'

const ClerkDashboardPage = () => {

    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const day = currentDate.toLocaleString('default', { weekday: 'long' });
    const year = currentDate.getFullYear();
    const dayOfMonth = currentDate.getDate();

    return (
        <div className='grid gap-6'>
            <div className="flex justify-between">
                <div className="flex flex-col items-start">
                    <h2 className="text-gray font-medium 2xl:text-lg text-md antialiased">
                        Hi Karla,
                    </h2>
                    <h1 className="text-primary font-semibold 2xl:text-2xl text-xl antialiased">
                        Welcome Back!
                    </h1>
                </div>

                <div className="flex flex-col items-end">
                    <h2 className="text-gray font-medium 2xl:text-lg text-md  antialiased">
                        Today is
                    </h2>
                    <h1 className="text-primary font-medium 2xl:text-lg text-md antialiased">
                        {day} {month} {dayOfMonth}, {year}
                    </h1>
                </div>
            </div>

            <div className='flex flex-col justify-center items-center'>
                <Button className='my-button-blue' size='lg' variant='default'  >
                    <CirclePlus className='h-6 w-6' />
                    <span className='ml-2'>Add New Patient</span>
                </Button>

            </div>
        </div>
    )
}

export default ClerkDashboardPage