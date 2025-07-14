"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/parallax';
import { Parallax, Navigation, Pagination, Autoplay } from 'swiper/modules';

Swiper.use([Parallax, Navigation, Pagination, Autoplay]);

const sliderData = [
    {
        id: 1,
        image: "https://plus.unsplash.com/premium_photo-1714669899908-4b151851ee2a?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjA1fHxjYWtlfGVufDB8fDB8fHww",
        hint: "glowing cake",
        title: "Indulge in Divine Flavors",
        description: "Experience the taste of tradition and luxury with our handcrafted sweets, cakes, and refreshing drinks.",
    },
    {
        id: 2,
        image: "https://media.istockphoto.com/id/1054228718/photo/indian-sweets-in-a-plate-includes-gulab-jamun-rasgulla-kaju-katli-morichoor-bundi-laddu.webp?a=1&b=1&s=612x612&w=0&k=20&c=i_eG_hiRCHa1evPiSHYauXWHVSQ5LZ893QrdAlKB_vE=",
        hint: "indian sweets",
        title: "Exquisite Handcrafted Sweets",
        description: "From classic recipes to modern creations, every bite is a celebration of flavor and craftsmanship.",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1629203849746-7357277a421b?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGNvbGRkcmlua3xlbnwwfHwwfHx8MA%3D%3D",
        hint: "fancy drinks",
        title: "Refreshing & Unique Beverages",
        description: "Quench your thirst with our creative and delicious range of cold drinks, perfect for any occasion.",
    },
    {
        id: 4,
        image: "https://placehold.co/1200x800.png",
        hint: "custom order cake",
        title: "Custom Creations for You",
        description: "Have a special event? Let us craft a custom cake or sweet assortment that will delight your guests.",
    },
];

export function HeroSection() {
    useEffect(() => {
        const mainSlider = new Swiper(".mySwiper2", {
            modules: [Parallax, Navigation, Pagination, Autoplay],
            parallax: true,
            speed: 1200,
            effect: 'slide',
            direction: "vertical",
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.upk-button-next',
                prevEl: '.upk-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + ' swiper-pagination-bullet--svg-animation"><svg width="28" height="28" viewBox="0 0 28 28"><circle class="svg__circle" cx="14" cy="14" r="10" fill="none" stroke-width="2"></circle><circle class="svg__circle-inner" cx="14" cy="14" r="2" stroke-width="3"></circle></svg></span>';
                },
            },
        });

        return () => {
            mainSlider.destroy();
        };
    }, []);

    return (
        <section className="relative w-full h-[85vh] min-h-[700px] bg-background text-foreground overflow-hidden">
            <div className="swiper-container mySwiper2 h-full">
                <div className="swiper-wrapper">
                    {sliderData.map((slide) => (
                        <div key={slide.id} className="upk-salf-item swiper-slide">
                            <div className="upk-salf-image-wrap">
                                <Image 
                                  className="upk-xanc-img" 
                                  src={slide.image}
                                  alt={slide.title}
                                  data-ai-hint={slide.hint}
                                  fill
                                  style={{ objectFit: 'cover' }}
                                  priority={slide.id === 1}
                                />
                                 <div className="absolute inset-0 bg-black/30"></div>
                            </div>
                            <div className="upk-salf-content-wrap">
                                <h3 className="upk-salf-title" data-swiper-parallax-y="-150" data-swiper-parallax-duration="1200">
                                    {slide.title}
                                </h3>
                                <div className="upk-salf-desc" data-swiper-parallax-y="-200" data-swiper-parallax-duration="1400" >
                                    {slide.description}
                                </div>
                                <div className="upk-salf-button" data-swiper-parallax-y="-300" data-swiper-parallax-duration="1500">
                                    <a className="link link--arrowed" href="#menu">read more
                                        <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32">
                                            <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeMiterlimit="10">
                                                <circle className="arrow-icon--circle" cx="16" cy="16" r="15.12"></circle>
                                                <path className="arrow-icon--arrow" d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"></path>
                                            </g>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="upk-salf-nav-pag-wrap">
                <div className="upk-salf-navigation">
                    <div className="upk-button-prev upk-n-p">
                        <a className="link link--arrowed">
                            <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32">
                                <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeMiterlimit="10">
                                    <circle className="arrow-icon--circle" cx="16" cy="16" r="15.12"></circle>
                                    <path className="arrow-icon--arrow" d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"></path>
                                </g>
                            </svg>
                        </a>
                    </div>
                    <div className="upk-button-next upk-n-p">
                        <a className="link link--arrowed">
                            <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32">
                                <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeMiterlimit="10">
                                    <circle className="arrow-icon--circle" cx="16" cy="16" r="15.12"></circle>
                                    <path className="arrow-icon--arrow" d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"></path>
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="upk-salf-pagi-wrap">
                    <div className="swiper-pagination"></div>
                </div>
            </div>

            <style jsx global>{`
                .upk-salf-slider-wrapper {
                    display: flex;
                    flex-direction: row;
                    background: #fff;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
                    height: 400px;
                    padding: 30px;
                    position: relative;
                }

                .upk-salf-item {
                    position: relative;
                    display: flex;
                    flex-direction: row-reverse;
                }

                .upk-salf-item.swiper-slide-active .upk-salf-title,
                .upk-salf-item.swiper-slide-active .upk-salf-desc,
                .upk-salf-item.swiper-slide-active .upk-salf-button {
                    opacity: 1;
                }

                .upk-salf-item .upk-salf-image-wrap {
                    height: 100%;
                    width: 100%;
                    position: absolute;
                    inset: 0;
                }

                .upk-salf-item .upk-xanc-img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .upk-salf-item .upk-salf-content-wrap {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    top: unset;
                    max-width: 460px;
                    overflow: hidden;
                    background: hsla(var(--background) / 0.5);
                    backdrop-filter: blur(15px);
                    -webkit-backdrop-filter: blur(15px);
                    transition: backdrop-filter 0.9s;
                    padding: 20px;
                    padding-left: 20px;
                    color: hsl(var(--foreground));
                }

                .upk-salf-item .upk-salf-title {
                    font-size: 23px;
                    font-weight: 700;
                    line-height: 1.2;
                    text-transform: capitalize;
                    margin-bottom: 20px;
                    opacity: 0;
                    color: hsl(var(--foreground));
                }

                .upk-salf-item .upk-salf-desc {
                    font-size: 14px;
                    line-height: 1.6;
                    text-transform: capitalize;
                    margin-bottom: 20px;
                    opacity: 0;
                }

                .upk-salf-item .upk-salf-button {
                    opacity: 0;
                }
                
                .upk-salf-item .upk-salf-button .link {
                    cursor: pointer;
                    font-weight: 500;
                    text-decoration: none;
                    text-transform: capitalize;
                    font-size: 14px;
                    transition: all .3s ease;
                }
                
                .upk-salf-item .upk-salf-button .link:hover {
                    color: hsl(var(--primary));
                }

                .upk-salf-item .upk-salf-button .link--arrowed {
                    display: inline-block;
                }
                
                .upk-salf-item .upk-salf-button .arrow-icon {
                    position: relative;
                    top: 0;
                    transition: transform 0.3s ease;
                    vertical-align: middle;
                }
                
                .upk-salf-item .upk-salf-button .arrow-icon--circle {
                    transition: stroke-dashoffset .3s ease;
                    stroke-dasharray: 95;
                    stroke-dashoffset: 95;
                }
                
                .upk-salf-item .upk-salf-button .link:hover .arrow-icon {
                    transform: translate3d(5px, 0, 0);
                }

                .upk-salf-item .upk-salf-button .link:hover .arrow-icon--circle {
                    stroke-dashoffset: 0;
                }
                
                .upk-salf-item .upk-salf-button .link:hover g {
                    color: hsl(var(--primary));
                }

                .upk-salf-nav-pag-wrap {
                    position: absolute;
                    top: 0;
                    height: 100%;
                    right: 0;
                }
                
                .upk-salf-navigation {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 22px;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    z-index: 10;
                }
                
                .upk-salf-navigation .link--arrowed {
                    display: inline-block;
                    cursor: pointer;
                }
                
                .upk-salf-navigation .arrow-icon {
                    position: relative;
                    top: 0;
                    transition: transform 0.3s ease;
                    vertical-align: middle;
                }
                
                .upk-salf-navigation .arrow-icon--circle {
                    transition: stroke-dashoffset .3s ease;
                    stroke-dasharray: 95;
                    stroke-dashoffset: 95;
                }

                .upk-salf-navigation .link:hover .arrow-icon--circle {
                    stroke-dashoffset: 0;
                }

                .upk-salf-navigation .link:hover g {
                    color: hsl(var(--primary));
                }
                
                .upk-salf-navigation .upk-button-next {
                    transform: rotate(90deg);
                }
                
                .upk-salf-navigation .upk-button-prev {
                    transform: rotate(-90deg);
                }

                .upk-salf-pagi-wrap {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: -5px;
                    z-index: 10;
                    display: flex;
                    flex-direction: column;
                }
                
                .swiper-pagination-bullet {
                    background-color: transparent;
                    opacity: 0.8;
                }
                
                .swiper-pagination-bullet--svg-animation {
                    width: 28px;
                    height: 28px;
                    margin: 6px 0;
                    display: inline-block;
                }
                
                .swiper-pagination-bullet--svg-animation svg {
                    transform: rotate(-90deg);
                }
                
                .swiper-pagination-bullet--svg-animation .svg__circle-inner {
                    stroke: hsl(var(--foreground));
                    fill: transparent;
                    transition: all 0.3s ease;
                }

                .swiper-pagination-bullet-active .svg__circle {
                    stroke: hsl(var(--primary));
                    stroke-dasharray: 75;
                    stroke-dashoffset: 0;
                    animation: progress 4s ease-in-out 1 forwards;
                }

                .swiper-pagination-bullet-active .svg__circle-inner {
                    fill: hsl(var(--foreground));
                    stroke: hsl(var(--primary));
                }

                @keyframes progress {
                    0% {
                        stroke-dashoffset: 75;
                        opacity: 1;
                    }
                    95% {
                        stroke-dashoffset: 0;
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                        stroke-dashoffset: 0;
                    }
                }
                
                @media (min-width: 768px) {
                    .upk-salf-item .upk-salf-title {
                        font-size: 40px;
                    }

                    .upk-salf-item .upk-salf-content-wrap {
                        max-width: 400px;
                        padding: 40px;
                        padding-left: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        bottom: unset;
                    }
                    
                    .upk-salf-item .upk-salf-image-wrap {
                        width: 80%;
                    }

                    .upk-salf-navigation {
                        right: 40px;
                    }

                    .upk-salf-pagi-wrap {
                       right: 17px;
                    }
                }

                @media (min-width: 1024px) {
                    .upk-salf-item .upk-salf-title {
                        font-size: 50px;
                    }
                    
                    .upk-salf-item .upk-salf-content-wrap {
                        max-width: 460px;
                        padding: 50px;
                        padding-left: 50px;
                    }
                    
                    .upk-salf-item .upk-salf-desc {
                        font-size: 16px;
                    }
                    
                    .upk-salf-item .upk-salf-button .link {
                        font-size: 16px;
                    }
                    
                    .upk-salf-item .upk-salf-image-wrap {
                        width: 70%;
                    }

                    .upk-salf-navigation {
                        right: 50px;
                    }

                     .upk-salf-pagi-wrap {
                       right: 27px;
                    }
                }
            `}</style>
        </section>
    );
}
