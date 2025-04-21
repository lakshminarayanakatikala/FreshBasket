// import React from 'react'
// import { assets, features } from '../assets/assets'

// const BottomBanner = () => {
//   return (
//     <div className='relative mt-24 '>
//         <img src={assets.bottom_banner_image} alt="banner" className='w-full hidden md:block' /> {/* it will visible in above  mobile screen other wise hidden */}
//         <img src={assets.bottom_banner_image_sm} alt="banner" className='w-full md:hidden' />
//         {/* it is not responsive features  */}
//         <div className='absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24'>
//             <h1 className='text-2xl md:text-3xl font-semibold text-primary mt-6'>Why We Are The Best?</h1>
//             {features.map((feature , index)=>(
//                 <div key={index} className='flex  items-center  gap-4 mt-2 '> {/* chnage  the div styles check margin */}
//                     <img src={feature.icon} alt={feature.title} className='md:w-11 w-9'/>
//                     <div>
//                         <h3 className='text-lg md:text-xl font-semibold'>{feature.title}</h3>
//                         <p className='text-gray-500/70 text-xs md:text-sm'>{feature.description}</p>
//                     </div>
//                 </div>
//             ))}
//         </div>
      
//     </div>




//   )
// }

// export default BottomBanner









import React from 'react';
import { assets, features } from '../assets/assets';

const BottomBanner = () => {
  return (
    <div className="relative mt-24">
      {/* Background Banner Images */}
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

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center md:items-end md:justify-center p-4 md:pr-24 text-center md:text-right">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mt-4 md:mt-0">
          Why We Are The Best?
        </h1>

        <div className="mt-4 w-full max-w-md md:max-w-lg">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start md:items-center gap-3 md:gap-4 mb-4"
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-8 h-8 md:w-10 md:h-10"
              />
              <div className="text-left md:text-right">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm md:text-sm leading-snug">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;

