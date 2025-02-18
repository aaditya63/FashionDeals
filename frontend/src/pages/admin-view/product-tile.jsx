import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import React from 'react'

export default function AdminProductTile({product, setFormData,setOpenCreateProductBox,setCurrentEditedId,handleDelete}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
        <div>
            <div className='relative'>
                <img src={product?.image} alt={product?.title} className='w-full h-[200px] object-cover rounded-t-lg'/>
            </div>
            <CardContent>
                <h2 className='text-xl font-bold'>{product?.title}</h2>
                <div className='flex justify-between items-center mb-2'>
                    <span className={`${product?.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>${product?.price}</span>
                    {
                        product?.salePrice > 0 ? 
                        <span className='text-lg font-bold'>${product?.salePrice}</span> : null
                    }
                </div>
            </CardContent>
            <CardFooter className='flex justify-between items-center'>
                <Button onClick={()=>{
                    setOpenCreateProductBox(true)
                    setCurrentEditedId(product?._id)
                    setFormData(product)
                }}>Edit</Button>
                <Button onClick={()=>{
                    handleDelete(product?._id)
                }}>Delete</Button>


            </CardFooter>
        </div>

    </Card>
  )
}
