// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Separator } from "@/components/ui/separator";
// import React, { useEffect } from "react";
// import DigitalFashionHeading from "../utils/DigitalFashionHeading";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useAppDispatch } from "@/store/store";

// function DigitalFashionBuyerFilterDesktop() {
//   const dispatch = useAppDispatch();
//   useEffect(() => {
//     dispatch(setBuyerProducts(BuyerProductsData));
//   }, []);

//   const allColors = [
//     "black",
//     "red",
//     "white",
//     "colorful",
//     "purple",
//     "cream",
//     "brown",
//     "blue",
//     "green",
//   ];

//   const filteredProducts = products.filter((product) => {
//     if (selectedColors.length === 0) return true;
//     return selectedColors.includes(product.color?.toLowerCase());
//   });

//   return (
//     <div className="hidden lg:block min-w-72 max-w-96 bg-slate-100 rounded-md p-4">
//       {/* Filtre Başlığı ve Separator */}
//       <h3 className="text-lg font-semibold mb-2 text-center">FİLTRE</h3>
//       <Separator className="bg-primary " />

//       {/* Accordion - Renk Filtreleri */}
//       <Accordion
//         type="single"
//         collapsible
//         defaultValue="color-filter"
//         className="w-full mb-6"
//       >
//         <AccordionItem value="color-filter">
//           <AccordionTrigger>
//             <DigitalFashionHeading
//               as="h2"
//               size="text-xl"
//               align="text-left"
//               variant="default"
//               className="font-semibold"
//             >
//               Renk
//             </DigitalFashionHeading>
//           </AccordionTrigger>
//           <AccordionContent>
//             <div className="flex flex-col gap-2 mt-2">
//               {allColors.map((color) => (
//                 <div key={color} className="flex items-center space-x-2">
//                   <Checkbox
//                     id={`color-${color}`}
//                     checked={selectedColors.includes(color)}
//                     onCheckedChange={() => toggleColor(color)}
//                   />
//                   <label
//                     htmlFor={`color-${color}`}
//                     className="text-sm font-normal text-gray-700 cursor-pointer capitalize"
//                   >
//                     {color}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>

//       {/* Accordion - Sıralama */}
//       <Accordion type="single" collapsible defaultValue="" className="w-full">
//         <AccordionItem value="sort-filter">
//           <AccordionTrigger>
//             <DigitalFashionHeading
//               as="h2"
//               size="text-xl"
//               align="text-left"
//               variant="default"
//               className="font-semibold"
//             >
//               Sırala
//             </DigitalFashionHeading>
//           </AccordionTrigger>
//           <AccordionContent>
//             <div className="flex flex-col gap-3 mt-2">
//               <h2 className="font-semibold">Fiyat</h2>
//               <Separator className="bg-primary w-1/2" />
//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   id="price-low-lg"
//                   checked={sortBy === "price-low"}
//                   onCheckedChange={() =>
//                     setSortBy(sortBy === "price-low" ? null : "price-low")
//                   }
//                 />
//                 <label
//                   htmlFor="price-low-lg"
//                   className="text-xs font-normal text-gray-700 cursor-pointer"
//                 >
//                   Düşükten Yükseğe
//                 </label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   id="price-high-lg"
//                   checked={sortBy === "price-high"}
//                   onCheckedChange={() =>
//                     setSortBy(sortBy === "price-high" ? null : "price-high")
//                   }
//                 />
//                 <label
//                   htmlFor="price-high-lg"
//                   className="text-xs font-normal text-gray-700 cursor-pointer"
//                 >
//                   Yüksekten Düşüğe
//                 </label>
//               </div>
//             </div>
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>
//     </div>
//   );
// }

// export default DigitalFashionBuyerFilterDesktop;
