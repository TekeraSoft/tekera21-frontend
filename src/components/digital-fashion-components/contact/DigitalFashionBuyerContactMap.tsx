import React from "react";

export default function DigitalFashionBuyerContactMap() {
  return (
    <div className="bg-primary py-16 rounded-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Bizi Ziyaret Edin
        </h2>
        {/* Google Maps */}
        <div className="w-full  SliderContainer rounded-lg overflow-hidden shadow-lg ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d797.7763359713855!2d30.69932672850806!3d36.88782807088876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c391433f5d9d85%3A0xf088a952b396c64c!2sARZUAMBER%20MODA!5e0!3m2!1str!2str!4v1742284399531!5m2!1str!2str"
            className="w-full h-72 md:h-96 border-0 rounded-lg"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
