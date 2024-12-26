import React from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import { useAuth } from '../../context/AuthContext';

const OrderPage = () => {
    const { currentUser } = useAuth();
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email);

    if (isLoading) return <div className="text-center text-xl">Loading...</div>;
    if (isError) return <div className="text-center text-xl text-red-500">Error getting orders data</div>;

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">Your Orders</h2>
            {
                orders.length === 0 ? (
                    <div className="text-center text-lg text-gray-500">No orders found!</div>
                ) : (
                    <div>
                        {orders.map((order, index) => (
                            <div
                                key={order._id}
                                className="bg-white shadow-lg rounded-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300 ease-in-out"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <p className="p-2 bg-blue-600 text-white rounded-full text-sm"># {index + 1}</p>
                                    <h3 className="font-semibold text-xl text-blue-700">Order ID: {order._id}</h3>
                                </div>

                                <div className="space-y-2 text-gray-700">
                                    <p><span className="font-semibold">Name:</span> {order.name}</p>
                                    <p><span className="font-semibold">Email:</span> {order.email}</p>
                                    <p><span className="font-semibold">Phone:</span> {order.phone}</p>
                                    <p><span className="font-semibold">Total Price:</span> ${order.totalPrice}</p>
                                </div>

                                <div className="mt-4">
                                    <h4 className="font-semibold text-lg text-blue-600">Address:</h4>
                                    <p className="text-gray-600">{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                                </div>

                                <div className="mt-4">
                                    <h4 className="font-semibold text-lg text-blue-600">Products Id:</h4>
                                    <ul className="space-y-1">
                                        {order.productIds.map((productId) => (
                                            <li key={productId} className="text-sm text-gray-500">{productId}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default OrderPage;
