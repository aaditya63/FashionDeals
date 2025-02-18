import ProductImageUpload from '@/components/admin-view/image-upload';
import CommonForm from '@/components/common/form';
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config';
import React, { Fragment, useState } from 'react'

export default function AdminProducts() {

  const [openCreateProductBox,setOpenCreateProductBox] = useState(false);

  const initialFormData = {
    image : null,
    title : "",
    description : "",
    brand : "",
    price : "",
    salePrice : "",
    totalStock : "",
  }
  const [formData,setFormData] = useState(initialFormData)

  const [imageFile,setImageFile] = useState(null);
  const [uploadedImageUrl,setUploadedImageUrl] = useState("");
  const [imageLoadingState,setImageLoadingState] = useState(false)

  
  function onSubmit(){

  }

  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={()=>{setOpenCreateProductBox(true)}}>
          Add New Product
        </Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        <Sheet open={openCreateProductBox} onOpenChange={ ()=>{setOpenCreateProductBox(false)} }>
          <SheetContent side='right' className='overflow-auto'>
            <SheetTitle>Add New Produt</SheetTitle>
              <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl}  setImageLoadingState={setImageLoadingState}/>
              <div className='py-6'>
                <CommonForm formData={formData} setFormData={setFormData} buttonText='Add' formControls={addProductFormElements} onSubmit={onSubmit}/>

              </div>


          </SheetContent>
        </Sheet>
      </div>

    </Fragment>
  )
}
