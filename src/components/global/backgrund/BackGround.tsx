"use client";

import React from "react";
import { motion } from "framer-motion";

export const IndigoGradientBlackv2 = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Light mode gradient */}
      <motion.div
        className="absolute inset-0 z-0 block dark:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          background:
            "radial-gradient(125% 125% at 50% 90%, #f5f5f5 40%, #818cf8 100%)",
        }}
      />
      {/* Dark mode gradient */}
      <motion.div
        className="absolute inset-0 z-0 hidden dark:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          background:
            "radial-gradient(125% 125% at 50% 90%, #0a0a0a 40%, #6366f1 100%)",
        }}
      />
    </div>
  );
};

//"use client";
// //usage eg:
// import React from "react";
// import {   IndigoGradientBlackv2 } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <IndigoGradientBlackv2/>

//       {/* Foreground Content */}
//       <div className="absolute inset-0 z-10 flex items-center justify-center">
//         {/* Your components go here */}
//         <div className="text-center">
//           <p className="text-4xl font-bold text-white">Your Components Go Here</p>
//           <p className="text-lg text-gray-300 mt-2">
//             Replace this with any UI elements, cards, forms, etc.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
