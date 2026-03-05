import AppLayout from '@/layouts/app-layout'
import { blogs } from '@/routes';
import reports from '@/routes/reports';
import { SimplifiedProduct } from '@/types/product';
import { usePage } from '@inertiajs/react';



function Index() {
  const { products } = usePage().props as any as { products:SimplifiedProduct[]}
  


  return (
    <AppLayout>
        <div>Support</div>
        {products.map(e=>(
          <div key={String(e.id)}>
              <h1><b>{e.name}</b></h1>
              <a href={blogs.url({
                query:{
                  tags:[e.name,"updates"]
                }
              })}>Updates</a>
              <br />
              <a href={blogs.url({
                query:{
                  tags:[e.name,"bugs"]
                }
              })}>Known Errors</a>
          </div>
        ))}
        <a href={reports.create().url}>Create report</a>
    </AppLayout>
  )
}

export default Index