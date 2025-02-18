import ProductImageUpload from '@/components/admin-view/image-upload';
import CommonForm from '@/components/common/form';
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from '@/store/admin/products-slice';
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AdminProductTile from './product-tile';


const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

export default function AdminProducts() {

  const [openCreateProductBox, setOpenCreateProductBox] = useState(false);

  const [formData, setFormData] = useState(initialFormData)

  const [currentEditedId,setCurrentEditedId] = useState(null);

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const { toast } = useToast()

  // const {productList} = useSelector(state=>state.AdminProducts)

  const { productList } = useSelector((state) => state.adminProducts)
  const dispatch = useDispatch()

  function handleDelete(getCurrentProductId){
    console.log(getCurrentProductId,"deleting product")
    dispatch(deleteProduct(getCurrentProductId)).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchAllProducts());
      }
    })

  }

  function isFormValid(){
    return Object.keys(formData).map(key=> formData[key] !== '').every(item=>item)
  }

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])

  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null ? dispatch(editProduct({
      id : currentEditedId,
      formData
    })).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchAllProducts())
        setFormData(initialFormData)
        setOpenCreateProductBox(false);
        setCurrentEditedId(null)
      }
    })
      :
    dispatch(addNewProduct({
      ...formData,
      image: uploadedImageUrl
    })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts())
        setOpenCreateProductBox(false)
        setImageFile(null);
        setFormData(initialFormData)
        toast({
          title: "Product added successfully"
        })
      }
    })
  }

  console.log(productList, "productList");         ///////////////////////////

  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={() => { setOpenCreateProductBox(true) }}>
          Add New Product
        </Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {
          productList && productList.length > 0 ?
          productList.map((productItem)=> <AdminProductTile handleDelete={handleDelete} setCurrentEditedId={setCurrentEditedId} setOpenCreateProductBox={setOpenCreateProductBox} setFormData={setFormData} product={productItem}/>) : null
        }
      </div>
      <Sheet open={openCreateProductBox} onOpenChange={() => { 
        setOpenCreateProductBox(false)
        setCurrentEditedId(null)
        setFormData(initialFormData) 
        }}>
        <SheetContent side='right' className='overflow-auto'>
          <SheetTitle>
            {
              currentEditedId !== null ?
              'Edit Product' : 'Add new Product'
            }
          </SheetTitle>
          <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} setImageLoadingState={setImageLoadingState} imageLoadingState={imageLoadingState} isEditMode={currentEditedId !== null} />
          <div className='py-6'>
            <CommonForm formData={formData} setFormData={setFormData} buttonText={currentEditedId !==null ? 'Edit' : 'Add'} formControls={addProductFormElements} onSubmit={onSubmit} isBtnDisabled={!isFormValid()} />

          </div>


        </SheetContent>
      </Sheet>

    </Fragment>
  )
}
