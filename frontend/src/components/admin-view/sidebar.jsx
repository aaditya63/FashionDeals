import React, { Fragment } from 'react'
import { BadgeCheck, ChartBar, LayoutDashboard, ShoppingBasket } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

export const AdminSidebarMenuItems = [
  {
    id: 'dashboard',
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />
  },
  {
    id: 'products',
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />
  },
  {
    id: 'orders',
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />
  }
]

function MenuItems({setOpen}) {
  const navigate = useNavigate();
  return <nav className='mt-8 flex-col flex gap-2'>
    {
      AdminSidebarMenuItems.map((menuItem) => (
      <div 
      key={menuItem.id} 
      onClick={() => { 
        navigate(menuItem.path);
        setOpen ? setOpen(false) : null;
        console.log("here");
        
       }} 
       className='flex cursor-pointer items-center gap-2 rounded-md px-1 py-1 text-muted-foreground hover:bg-muted hover:text-foreground text-xl'>
        {menuItem.icon}
        <span>{menuItem.label}</span>
      </div>
      )
    )}
  </nav>
}

export default function AdminSidebar({ open, setOpen }) {
  const navigate = useNavigate()
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
        <div className='flex flex-col h-full'>
          <SheetHeader className="border-b">
            <SheetTitle className='flex gap-2 items-center'>
              <ChartBar size={30} />
              <span><h1 className='text-xl font-extrabold mt-5 mb-5'>Admin Panel</h1></span>
            </SheetTitle>
          </SheetHeader>
          <MenuItems setOpen={setOpen}/>
        </div>
        </SheetContent>
      </Sheet>
      <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
        <div onClick={() => { navigate("/admin/dashboard") }} className='flex items-center gap-2 cursor-pointer'>
          <ChartBar size={30} />
          <h1 className='text-xl font-extrabold'>Admin Panel</h1>
        </div>
        <MenuItems/>
      </aside>
    </Fragment>
  )
}