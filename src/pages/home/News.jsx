import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Link } from 'react-router-dom';

import news1 from '../../assets/news/news-1.png';
import news2 from '../../assets/news/news-2.png';
import news3 from '../../assets/news/news-3.png';
import news4 from '../../assets/news/news-4.png';

const news = [
    {
        id: 1,
        title: 'Global Climate Summit Calls for Urgent Action',
        description:
            'World leaders gather at the Global Climate Summit to discuss urgent strategies to combat climate change, focusing on reducing carbon emissions and fostering renewable energy solutions.',
        image: news1,
    },
    {
        id: 2,
        title: 'Breakthrough in AI Technology Announced',
        description:
            'A major breakthrough in artificial intelligence has been announced by researchers, with new advancements promising to revolutionize industries from healthcare to finance.',
        image: news2,
    },
    {
        id: 3,
        title: 'New Space Mission Aims to Explore Distant Galaxies',
        description:
            'NASA has unveiled plans for a new space mission that will aim to explore distant galaxies, with hopes of uncovering insights into the origins of the universe.',
        image: news3,
    },
    {
        id: 4,
        title: 'Stock Markets Reach Record Highs Amid Economic Recovery',
        description:
            'Global stock markets have reached record highs as signs of economic recovery continue to emerge following the challenges posed by the global pandemic.',
        image: news4,
    },
    {
        id: 5,
        title: 'Innovative New Smartphone Released by Leading Tech Company',
        description:
            'A leading tech company has released its latest smartphone model, featuring cutting-edge technology, improved battery life, and a sleek new design.',
        image: news2,
    },
];

const News = () => {
    return (
        <div className="py-16 bg-gray-50">
            <h2 className="text-4xl font-bold text-blue-700 mb-8 text-center">
                Latest News
            </h2>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 40 },
                    1024: { slidesPerView: 3, spaceBetween: 50 },
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {news.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                            {/* News Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover hover:opacity-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent"></div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6">
                                <Link to="/">
                                    <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600 mb-2 truncate">
                                        {item.title}
                                    </h3>
                                </Link>
                                <p className="text-sm text-gray-600 mb-4">
                                    {item.description.slice(0, 120)}...
                                </p>
                                <Link
                                    to="/"
                                    className="text-blue-600 text-sm font-semibold hover:underline"
                                >
                                    Read more
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default News;
