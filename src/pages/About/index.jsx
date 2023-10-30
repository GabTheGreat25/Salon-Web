import React from "react"
import about from "../../data/about";
import { CardImage2, CardImage3, CardImage4, CardImage5 } from "@/components";

export default function () {

    const newAboutCards = about.map((d)=>{
        return <CardImage5 {...d}/>
    })

    return(
     <>
        <h1 className="font-extrabold text-5xl md:text-4xl m-1 text-center">
            About
            <span className="font-extrabold text-5xl md:text-4xl m-1 text-pink-300"> Lhanlee Salon?</span>
        </h1>
    
    <div className="m-5">
        <p className="text-center p-5 text-lg font-sans">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit eum labore commodi laborum reiciendis, maxime dolorum accusantium quasi sunt mollitia magni blanditiis ad? Consequuntur, praesentium earum dolores, recusandae accusamus vero accusantium expedita a nostrum dolor, ea tempora ratione maiores nobis?
        </p>

        <p className="text-center p-5 text-lg font-sans">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit eum labore commodi laborum reiciendis, maxime dolorum accusantium quasi sunt mollitia magni blanditiis ad? Consequuntur, praesentium earum dolores, recusandae accusamus vero accusantium expedita a nostrum dolor, ea tempora ratione maiores nobis?
        </p>

        <p className="text-center p-5 text-lg font-sans">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit eum labore commodi laborum reiciendis, maxime dolorum accusantium quasi sunt mollitia magni blanditiis ad? Consequuntur, praesentium earum dolores, recusandae accusamus vero accusantium expedita a nostrum dolor, ea tempora ratione maiores nobis?
        </p>
    </div>

    <CardImage2 />
    <div className="flex">
    <div class="w-auto; h-3/4 text-center bg-gradient-to-l from-pink-300 via-pink-400 to-pink-500">
    <h1 className="font-extrabold text-5xl md:text-4xl m-1 text-center text-black">
         How
        <span className="font-extrabold text-5xl md:text-4xl m-1 text-pink-300 text-white"> Lhanlee Salon</span>
        <span className="font-extrabold text-5xl md:text-4xl m-1 text-pink-300 text-white"> Started</span>
    </h1>
        
        <div className="m-5">
           <p  className="text-center p-5 text-lg font-sans text-white">
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit eum labore commodi laborum reiciendis, maxime dolorum accusantium quasi sunt mollitia magni blanditiis ad? Consequuntur, praesentium earum dolores, recusandae accusamus vero accusantium expedita a nostrum dolor, ea tempora ratione maiores nobis?
           </p> 
        </div>
        <div className="m-5">
           <p  className="text-center p-5 text-lg font-sans text-white">
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit eum labore commodi laborum reiciendis, maxime dolorum accusantium quasi sunt mollitia magni blanditiis ad? Consequuntur, praesentium earum dolores, recusandae accusamus vero accusantium expedita a nostrum dolor, ea tempora ratione maiores nobis?
           </p> 
        </div>
    </div>
    <CardImage3/>
    </div>
    <div className="flex">
        <CardImage4/>
        <div class="w-1/2; h-auto text-center m-10">
        <div className="flex items-center text-center">
            <h2 className="font-extrabold text-5xl md:text-4xl m-1 text-black">
                How
            </h2>
            <h2 className="font-extrabold text-5xl md:text-4xl m-1 text-black-300 text-pink-300">
                Lhanlee Salon
            </h2>
            <h2 className="font-extrabold text-5xl md:text-4xl m-1 text-black">
                Works?
            </h2>
        </div>
        <div className="m-5">
           <p  className="text-center p-5 text-lg font-sans text-black">
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit eum labore commodi laborum reiciendis, maxime dolorum accusantium quasi sunt mollitia magni blanditiis ad? Consequuntur, praesentium earum dolores, recusandae accusamus vero accusantium expedita a nostrum dolor, ea tempora ratione maiores nobis?
           </p> 
        </div>
        <div className="m-5">
           <p  className="text-center p-5 text-lg font-sans text-black">
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit eum labore commodi laborum reiciendis, maxime dolorum accusantium quasi sunt mollitia magni blanditiis ad? Consequuntur, praesentium earum dolores, recusandae accusamus vero accusantium expedita a nostrum dolor, ea tempora ratione maiores nobis?
           </p> 
        </div>
    </div>
    </div>
    <div>
    <h1 class="font-extrabold text-5xl md:text-4xl m-1 text-black text-center">
        Why choose 
        <span class="font-extrabold text-5xl md:text-4xl m-1 text-pink-300">Lhanlee Salon?</span>
    </h1>
    <div className="flex justify-center items-center">
        {newAboutCards}
    </div>
    </div>
    <div className="flex m-12">
    <div className="flex flex-col items-center text-center w-1/2">
        <h1 className="font-extrabold text-5xl md:text-5xl m-1 text-black text-black m-10">Our <span className="text-pink-300">Mission</span></h1>
        <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit eum labore commodi laborum reiciendis, maxime dolorum accusantium quasi sunt mollitia magni blanditiis ad? Consequuntur, praesentium earum dolores, recusandae accusamus vero accusantium expedita a nostrum dolor, ea tempora ratione maiores nobis?
        </span>
        <h1 className="font-extrabold text-5xl md:text-5xl m-1 text-black m-10">Our <span className="text-pink-300">Vision</span></h1>
        <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit eum labore commodi laborum reiciendis, maxime dolorum accusantium quasi sunt mollitia magni blanditiis ad? Consequuntur, praesentium earum dolores, recusandae accusamus vero accusantium expedita a nostrum dolor, ea tempora ratione maiores nobis?
        </span>
    </div>
    <div className="flex flex-col w-1/2 m-3.5">
        <h1 className="font-extrabold text-center text-5xl md:text-5xl m-1 text-black text-black m-6">Our <span className="text-pink-300">Core Value</span></h1>
        <h3 className="font-bold text-2xl my-2 text-left">L<span className="text-pink-300">ove</span></h3>
        <span>Lorem ipsum dolor sit amet consectetur adispicing elit Ea, et?</span>
        <h3 className="font-bold text-2xl my-2 text-left">H<span className="text-pink-300">ome</span></h3>
        <span>Lorem ipsum dolor sit amet consectetur adispicing elit Ea, et?</span>
        <h3 className="font-bold text-2xl my-2 text-left">A<span className="text-pink-300">ttractive</span></h3>
        <span>Lorem ipsum dolor sit amet consectetur adispicing elit Ea, et?</span>
        <h3 className="font-bold text-2xl my-2 text-left">N<span className="text-pink-300">atural</span></h3>
        <span>Lorem ipsum dolor sit amet consectetur adispicing elit Ea, et?</span>
        <h3 className="font-bold text-2xl my-2 text-left">L<span className="text-pink-300">uxurious</span></h3>
        <span>Lorem ipsum dolor sit amet consectetur adispicing elit Ea, et?</span>
        <h3 className="font-bold text-2xl my-2 text-left">E<span className="text-pink-300">nthusiastic</span></h3>
        <span>Lorem ipsum dolor sit amet consectetur adispicing elit Ea, et?</span>
        <h3 className="font-bold text-2xl my-2 text-left">E<span className="text-pink-300">legant</span></h3>
        <span>Lorem ipsum dolor sit amet consectetur adispicing elit Ea, et?</span>
    </div>
    </div>
     </>
    );
};