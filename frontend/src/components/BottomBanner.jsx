import React from 'react';
import { assets, features } from '../assets/assets';

const BottomBanner = () => {
  return (
    <div className="relative mt-24">
      <img
        src={assets.bottom_banner_image}
        alt="banner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.bottom_banner_image_sm}
        alt="banner"
        className="w-full md:hidden"
      />

      <div className="absolute inset-0 flex flex-col pt-2 pl-6 sm:pl-10 md:pl-100 lg:pl-120">
        <h1 className="text-2xl md:text-3xl font-semibold text-primary mt-6">
          Why We Are The Best?
        </h1>

        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-3 sm:gap-4 mt-2"
          >
            <img
              src={feature.icon}
              alt={feature.title}
              className="w-8 sm:w-9 md:w-11"
            />
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold">
                {feature.title}
              </h3>
              <p className="text-gray-500/70 text-[10px] sm:text-xs md:text-sm">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomBanner;
