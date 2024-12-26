import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import getBaseUrl from "../../utils/baseUrl";
import { MdIncompleteCircle } from "react-icons/md";
import RevenueChart from "./RevenueChart";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  // console.log(data)
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/admin`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  // console.log(data)

  if (loading) return <Loading />;

  return (
    <>
      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="flex items-center p-8 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-lg hover:bg-blue-100 transform hover:scale-105">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold text-blue-600">
              {data?.totalBooks}
            </span>
            <span className="block text-gray-500">Products</span>
          </div>
        </div>

        <div className="flex items-center p-8 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-lg hover:bg-blue-100 transform hover:scale-105">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold text-blue-600">
              ${data?.totalSales}
            </span>
            <span className="block text-gray-500">Total Sales</span>
          </div>
        </div>

        <div className="flex items-center p-8 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-lg hover:bg-blue-100 transform hover:scale-105">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>
          </div>
          <div>
            <span className="inline-block text-2xl font-bold text-blue-600">
              {data?.trendingBooks}
            </span>
            <span className="inline-block text-xl text-gray-500 font-semibold">
              (13%)
            </span>
            <span className="block text-gray-500">
              Trending Books in This Month
            </span>
          </div>
        </div>

        <div className="flex items-center p-8 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-lg hover:bg-blue-100 transform hover:scale-105">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <MdIncompleteCircle className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <span className="block text-2xl font-bold text-blue-600">
              {data?.totalOrders}
            </span>
            <span className="block text-gray-500">Total Orders</span>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
        <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100">
            The number of orders per month
          </div>
          <div className="p-4 flex-grow">
            <div className="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
              <RevenueChart />
            </div>
          </div>
        </div>

        <div className="row-span-3 bg-white shadow rounded-lg">
          <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
            <span>Users by average order</span>
            <button
              type="button"
              className="inline-flex justify-center rounded-md px-1 -mr-1 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-600"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
            >
              Descending
              <svg
                className="-mr-1 ml-1 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: "24rem" }}>
            <section className="overflow-y-auto" style={{ maxHeight: "24rem" }}>
              <ul className="p-6 space-y-6">
                <li className="flex items-center justify-between hover:bg-blue-100 transition-all duration-300 p-3 rounded-lg shadow-lg transform hover:scale-105">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-blue-200 rounded-full overflow-hidden">
                      <img
                        src="https://randomuser.me/api/portraits/women/82.jpg"
                        alt="Annette Watson profile"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-blue-600 font-semibold">
                        Annette Watson
                      </span>
                      <span className="text-gray-500 text-sm">5 hours ago</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xl font-bold text-blue-600">9.3</span>
                    <span className="text-sm text-gray-500">Rating</span>
                  </div>
                </li>

                <li className="flex items-center justify-between hover:bg-blue-100 transition-all duration-300 p-3 rounded-lg shadow-lg transform hover:scale-105">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-green-200 rounded-full overflow-hidden">
                      <img
                        src="https://randomuser.me/api/portraits/men/81.jpg"
                        alt="Calvin Steward profile"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-green-600 font-semibold">
                        Calvin Steward
                      </span>
                      <span className="text-gray-500 text-sm">2 days ago</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xl font-bold text-green-600">
                      8.9
                    </span>
                    <span className="text-sm text-gray-500">Rating</span>
                  </div>
                </li>

                <li className="flex items-center justify-between hover:bg-blue-100 transition-all duration-300 p-3 rounded-lg shadow-lg transform hover:scale-105">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-red-200 rounded-full overflow-hidden">
                      <img
                        src="https://randomuser.me/api/portraits/men/80.jpg"
                        alt="Ralph Richards profile"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-red-600 font-semibold">
                        Ralph Richards
                      </span>
                      <span className="text-gray-500 text-sm">1 week ago</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xl font-bold text-red-600">8.7</span>
                    <span className="text-sm text-gray-500">Rating</span>
                  </div>
                </li>

                <li className="flex items-center justify-between hover:bg-blue-100 transition-all duration-300 p-3 rounded-lg shadow-lg transform hover:scale-105">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-yellow-200 rounded-full overflow-hidden">
                      <img
                        src="https://randomuser.me/api/portraits/men/79.jpg"
                        alt="Bernard Murphy profile"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-yellow-600 font-semibold">
                        Bernard Murphy
                      </span>
                      <span className="text-gray-500 text-sm">2 weeks ago</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xl font-bold text-yellow-600">
                      8.2
                    </span>
                    <span className="text-sm text-gray-500">Rating</span>
                  </div>
                </li>

                <li className="flex items-center justify-between hover:bg-blue-100 transition-all duration-300 p-3 rounded-lg shadow-lg transform hover:scale-105">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-purple-200 rounded-full overflow-hidden">
                      <img
                        src="https://randomuser.me/api/portraits/women/78.jpg"
                        alt="Arlene Robertson profile"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-purple-600 font-semibold">
                        Arlene Robertson
                      </span>
                      <span className="text-gray-500 text-sm">3 weeks ago</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xl font-bold text-purple-600">
                      8.2
                    </span>
                    <span className="text-sm text-gray-500">Rating</span>
                  </div>
                </li>

                <li className="flex items-center justify-between hover:bg-blue-100 transition-all duration-300 p-3 rounded-lg shadow-lg transform hover:scale-105">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-orange-200 rounded-full overflow-hidden">
                      <img
                        src="https://randomuser.me/api/portraits/women/77.jpg"
                        alt="Jane Lane profile"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-orange-600 font-semibold">
                        Jane Lane
                      </span>
                      <span className="text-gray-500 text-sm">4 weeks ago</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xl font-bold text-orange-600">
                      8.1
                    </span>
                    <span className="text-sm text-gray-500">Rating</span>
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </div>
        <div className="flex flex-col row-span-3 bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100">
            Students by type of studying
          </div>
          <div className="p-4 flex-grow">
            <div className="flex flex-col items-start space-y-4">
              <div className="w-full bg-blue-100 border-2 border-blue-300 rounded-md p-6">
                <h3 className="text-lg font-semibold text-blue-600">
                  Active Customers
                </h3>
                <p className="text-3xl font-bold text-blue-800">320</p>
                <p className="text-sm text-gray-500">Total active customers.</p>
              </div>
              <div className="w-full bg-green-100 border-2 border-green-300 rounded-md p-6">
                <h3 className="text-lg font-semibold text-green-600">
                  New Customers
                </h3>
                <p className="text-3xl font-bold text-green-800">45</p>
                <p className="text-sm text-gray-500">New customers today.</p>
              </div>
              <div className="w-full bg-yellow-100 border-2 border-yellow-300 rounded-md p-6">
                <h3 className="text-lg font-semibold text-yellow-600">
                  Pending Approvals
                </h3>
                <p className="text-3xl font-bold text-yellow-800">12</p>
                <p className="text-sm text-gray-500">Total pending products.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
