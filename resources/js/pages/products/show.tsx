import AppLayout from '@/layouts/app-layout'
import { usePage } from '@inertiajs/react'
import { ExtendedProduct } from '@/types/product';
import products  from '@/routes/products' ;


function Show() {
  const { productInfo } = usePage().props as any as {productInfo:ExtendedProduct};
  return (
    <AppLayout>
        <div>Product {productInfo.name}</div>
        <p>{productInfo.category.name}</p>
        <p>{productInfo.description}</p>
        <p>{productInfo.last_stable_version}</p>
        <p>{productInfo.current_version}</p>
        {
            productInfo.versions.map((e)=>(
                <div key={String(e.id)}>
                    <p><a href={e.change_log_url}><b>{e.version} </b></a> {e.created_at} {e.is_stable? "stable":"beta"}</p>
                </div>
            ))
        }
      
    </AppLayout>
  )
}

export default Show