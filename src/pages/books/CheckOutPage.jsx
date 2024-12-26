import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { useAuth } from '../../context/AuthContext';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CheckOutPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
    const { currentUser } = useAuth();
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [createOrder, { isLoading, error }] = useCreateOrderMutation();
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate(); // Initialize navigate

    const onSubmit = async (data) => {
        const newOrder = {
            name: data.name,
            email: currentUser?.email,
            address: {
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode,
            },
            phone: data.phone,
            productIds: cartItems.map(item => item?._id),
            totalPrice: totalPrice,
        };
        try {
            await createOrder(newOrder).unwrap();
            Swal.fire({
                title: "Confirmed Order",
                text: "Your order placed successfully!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, It's Okay!"
            });
            navigate("/orders"); // Now this should work without error
        } catch (error) {
            console.error("Error placing an order", error);
            alert("Failed to place an order");
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Checkout</h2>
                <p className="text-gray-500 mb-6">
                    <span className="font-medium">Total Price:</span> ${totalPrice} | 
                    <span className="font-medium"> Items:</span> {cartItems.length}
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                {...register("name", { required: "Name is required" })}
                                type="text"
                                className="w-full mt-1 p-2 border rounded-lg"
                                placeholder="Enter your full name"
                            />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded-lg bg-gray-100"
                                defaultValue={currentUser?.email}
                                disabled
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                {...register("phone", { required: "Phone number is required" })}
                                type="text"
                                className="w-full mt-1 p-2 border rounded-lg"
                                placeholder="+123 456 7890"
                            />
                            {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">City</label>
                            <input
                                {...register("city", { required: "City is required" })}
                                type="text"
                                className="w-full mt-1 p-2 border rounded-lg"
                                placeholder="Enter your city"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Country</label>
                            <input
                                {...register("country", { required: "Country is required" })}
                                type="text"
                                className="w-full mt-1 p-2 border rounded-lg"
                                placeholder="Enter your country"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">State</label>
                            <input
                                {...register("state", { required: "State is required" })}
                                type="text"
                                className="w-full mt-1 p-2 border rounded-lg"
                                placeholder="Enter your state"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                            <input
                                {...register("zipcode", { required: "Zip Code is required" })}
                                type="text"
                                className="w-full mt-1 p-2 border rounded-lg"
                                placeholder="Enter your zip code"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="terms"
                            className="w-4 h-4"
                            onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        <label htmlFor="terms" className="text-sm text-gray-600">
                            I agree to the <span className="text-blue-500 underline">Terms & Conditions</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className={`w-full p-3 rounded-lg text-white font-semibold ${isChecked ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
                        disabled={!isChecked}
                    >
                        Place Order
                    </button>
                </form>
            </div>
        </section>
    );
};

export default CheckOutPage;
