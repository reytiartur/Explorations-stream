import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getProducts, handleCheckOut, subscriptionData } from '../utils/firebase';
import Button from './Button';

const Subscriptions = () => {
    const [products, setProducts] = useState([])
    const [subscription, setSubscription] = useState('')
    const user = useSelector(state => state.user)

    useEffect(() => {
        const fetchProducts = async () => {
            await getProducts(setProducts);
        } 
        fetchProducts()
    }, [])

    useEffect(() => {
        const getSubscriptionData = async () => {
            await subscriptionData(user.uid, setSubscription)
        }
        getSubscriptionData()
    }, [user])

    const handleSubscribe = async (priceId) => {
        await handleCheckOut(user.uid, priceId)
    }


  return (
    <div className='flex flex-col pt-2'>
        <p className='text-lg pb-1 ml-6'> Your Plan: {subscription ? `${subscription.role}` : "Free Plan"}</p>
        { subscription && <p className='text-xl ml-6'>{`Renewal on: ${new Date(subscription.current_period_end * 1000).toLocaleDateString()}`}</p> }
        <div className="flex flex-col pt-3">
            {Object.entries(products).map(([productId, productData]) => {
                const currentPlan = productData?.name?.toLowerCase().includes(subscription?.role?.toLowerCase().split(" ")[0])
                return (
                    <div key={productId} className="flex justify-between px-2 py-2 border-t border-gray-500">
                        <p className="text-lg font-semibold self-center">{productData.name}</p>
                        <Button onClick={() => handleSubscribe(productData.prices.priceId)} text={currentPlan ? 'Current Plan' : "Subscribe"} buttonType='primary' disabled={currentPlan} />
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Subscriptions