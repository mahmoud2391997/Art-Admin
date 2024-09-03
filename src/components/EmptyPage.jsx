// eslint-disable-next-line no-unused-vars
import React from 'react'
import emptyProduct from '../assets/images/emptyProduct.gif'

export default function EmptyPage() {
  return (
    <div className='justify-center flex '>
        <img src={emptyProduct} className="justify-center flex "/>
    </div>
  )
}
