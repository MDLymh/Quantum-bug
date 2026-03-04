import AppLayout from '@/layouts/app-layout'
import { usePage } from '@inertiajs/react'
import { SimplifiedProduct } from '@/types/product';
import products  from '@/routes/products' ;

function Index() {
  const { products:productList } = usePage().props as any as { products:SimplifiedProduct[]};
  return (
    <AppLayout>
      
      <div>Products</div>
      <br />
      {
        products &&
          productList.map((e)=>(
             
            <div key={String(e.id) }>
              <b>{e.name}</b>
              <p>{e.category.name}</p>
              <p>{e.description}</p>
              <p>{e.last_estable_version}</p>
              <a href={products.show.url(e.name).replaceAll(" ","-")}>See more...</a>
              <br />
              <br />
            </div>
          ))
      }
    </AppLayout>
  )
}

export default Index