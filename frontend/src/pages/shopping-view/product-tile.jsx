import { Badge } from '@/components/ui/badge'
import { CardContent, CardFooter, Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import React from 'react'
import { brandOptionsMap, categoryOptionsMap } from '@/config'

export default function ShoppingProductTile({ product, handleGetProdcutDetails, handleAddtoCart }) {
    return (
        <Card className='w-full max-w-sm mx-auto'>
            <div onClick={() => handleGetProdcutDetails(product?._id)}>
                <div className='relative'>
                    <img src={product?.image} alt={product?.title} className='w-full h-[250px] object-cover rounded-t-lg' />
                    {
                        product?.salePrice > 0 ?
                            <Badge className='absolute top-2 left-2 bg-red-600 hover:bg-red-700'>Sale</Badge> : null
                    }
                </div>
                <CardContent className='p-1'>
                    <h2 className='text-xl font-bold mb-1'>{product?.title}</h2>
                    <div className='flex justify-between items-center mb-1'>
                        <span className='text-sm text-muted-foreground'>{categoryOptionsMap[product?.category]}</span>
                        <span className='text-sm text-muted-foreground'>{brandOptionsMap[product?.brand]}</span>
                    </div>
                    <div className='flex justify-between items-center mb-2'>
                        <span className={`${product?.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>${product?.price}</span>
                        {
                            product?.salePrice > 0 ?
                                <span className='text-lg font-semibold text-primary'>${product?.salePrice}</span>
                                : null
                        }
                    </div>
                </CardContent>
            </div>
            <CardFooter>
                <Button onClick={() => handleAddtoCart(product?._id)} className='w-full'>Add to Cart</Button>
            </CardFooter>
        </Card>
    )
}
