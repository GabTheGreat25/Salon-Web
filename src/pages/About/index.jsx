import React from "react";
import SalonHair from "@assets/salon-hair.jpg";
import SalonNails from "@assets/salon-nails.png";
import SalonNailsBg from "@assets/salon-bg-nails.png";
import Beautician from "@assets/Beautician.png";
import CustomerOne from "@assets/Logo-3.png";
import CustomerTwo from "@assets/customerTwo.png";

export default function () {
  return (
    <>
      <section>
        <div className="flex flex-col items-center justify-start px-32 pb-4">
          <h1 className="pb-6 text-5xl font-bold text-center">
            About <span className="text-primary-default">Lhanlee Salon?</span>
          </h1>
          <p className="pb-6 text-xl leading-relaxed text-justify font-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit eum
            labore commodi laborum reiciendis, maxime dolorum accusantium quasi
            sunt mollitia magni blanditiis ad? Consequuntur, praesentium earum
            dolores, recusandae accusamus vero accusantium expedita a nostrum
            dolor, ea tempora ratione maiores nobis?
          </p>
          <p className="pb-6 text-xl leading-relaxed text-justify font-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit eum
            labore commodi laborum reiciendis, maxime dolorum accusantium quasi
            sunt mollitia magni blanditiis ad? Consequuntur, praesentium earum
            dolores, recusandae accusamus vero accusantium expedita a nostrum
            dolor, ea tempora ratione maiores nobis?
          </p>
          <p className="pb-6 text-xl leading-relaxed text-justify font-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis,
            magnam deleniti, id sunt, at recusandae excepturi placeat nesciunt
            eveniet porro itaque perspiciatis a. Aliquid asperiores quis
            delectus, voluptas ullam nesciunt molestiae atque, deleniti, impedit
            a ad corporis explicabo vero! Velit beatae minima et modi vitae
            dolorum optio ducimus ex, nihil officiis, laborum illum provident
            ipsam ut reprehenderit doloremque deleniti aut.
          </p>
          <br />
          <img
            src={SalonHair}
            alt="SalonHair"
            className="object-cover w-3/4 rounded-xl h-1/2"
          />
        </div>
        <div className="relative">
          <img src={SalonNailsBg} alt="SalonNailsBg" className="object-cover" />
          <div className="absolute top-0 2xl:pl-64 xl:pl-40 lg:pl-16 md:pl-12 2xl:pr-[40rem] xl:pr-[30rem] lg:pr-[20rem] md:pr-[10rem]">
            <h1 className="py-6 font-bold text-center lg:text-5xl md:text-3xl ">
              How Lhanlee Salon started?
            </h1>
            <h3 className="leading-relaxed text-justify 2xl:text-2xl lg:text-xl font-base">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse
              minus perferendis ipsa recusandae fuga harum possimus alias quis
              deserunt sequi sint minima velit, quibusdam laboriosam.
            </h3>
            <br />
            <h3 className="leading-relaxed text-justify 2xl:text-2xl lg:text-xl font-base">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse
              minus perferendis ipsa recusandae fuga harum possimus alias quis
              deserunt sequi sint minima velit, quibusdam laboriosam.
            </h3>
            <br />
            <h3 className="leading-relaxed text-justify 2xl:text-2xl lg:text-xl font-base">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse
              minus perferendis ipsa recusandae fuga harum possimus alias quis
              deserunt sequi sint minima velit, quibusdam laboriosam.
            </h3>
            <br />
            <h3 className="leading-relaxed text-justify 2xl:text-2xl lg:text-xl font-base">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse
              minus perferendis ipsa recusandae fuga harum possimus alias quis
              deserunt sequi sint minima velit, quibusdam laboriosam.
            </h3>
          </div>
        </div>
        <div className="px-32 py-4">
          <div className="grid items-center justify-center grid-cols-[60%_50%]">
            <div>
              <img
                src={SalonNails}
                className="object-cover rounded-xl"
                alt="SalonNails"
              />
            </div>
            <div>
              <h1 className="pb-6 font-bold text-center xl:text-5xl lg:text-3xl md:text-2xl ">
                How
                <span className="text-primary-default"> Lhanlee Salon </span>
                Works
              </h1>
              <h3 className="pb-6 leading-relaxed text-justify xl:text-xl 2xl:px-20 xl:px-10 md:px-6 font-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
                quo dignissimos et debitis quos voluptatem explicabo, nobis esse
                recusandae iste ea ad ex, assumenda quod cumque maxime minima
                cupiditate dolores harum, corrupti excepturi. Enim quia dolores
                mollitia excepturi, harum magnam quisquam velit voluptas
                quibusdam! Iusto laudantium ut sapiente obcaecati, natus, libero
                consequatur harum molestias adipisci excepturi quaerat tempore,
                ex reprehenderit earum! Laboriosam quasi optio illo expedita?
                Nulla sit reprehenderit modi debitis totam rem id obcaecati
                expedita harum porro possimus, repellendus error fugit quod
                corporis iste, sequi enim, hic aliquam dicta!
              </h3>
            </div>
          </div>
        </div>
        <div className="px-32 pb-4">
          <h1 className="pb-6 text-5xl font-bold text-center">
            Why choose
            <span className="text-primary-default"> Lhanlee Salon?</span>
          </h1>
          <div className="grid items-center justify-center grid-flow-col-dense gap-x-6">
            <div className="grid grid-flow-row-dense w-fit">
              <div className="bg-secondary-default rounded-t-xl">
                <img
                  src={Beautician}
                  alt="Beautician"
                  className="object-cover 2xl:h-[25rem] xl:h-[18rem] lg:h-[15rem] md:h-[12rem] w-[30rem]"
                />
              </div>
              <div className="bg-white rounded-b-xl">
                <h1 className="px-6 font-bold text-center text-black xl:pt-6 md:pt-3 2xl:text-3xl xl:text-2xl lg:text-lg md:text-base">
                  Well Trained
                </h1>
                <h1 className="font-bold text-center xl:p-6 md:p-3 2xl:text-3xl xl:text-2xl lg:text-lg md:text-base text-primary-default">
                  Lanlee Employees
                </h1>
              </div>
            </div>
            <div className="grid grid-flow-row-dense w-fit">
              <div className="bg-secondary-default rounded-t-xl">
                <img
                  src={CustomerTwo}
                  alt="CustomerTwo"
                  className="object-cover 2xl:h-[25rem] xl:h-[18rem] lg:h-[15rem] md:h-[12rem] w-[30rem]"
                />
              </div>
              <div className="bg-white rounded-b-xl">
                <h1 className="px-6 font-bold text-center text-black xl:pt-6 md:pt-3 2xl:text-3xl xl:text-2xl lg:text-lg md:text-base">
                  Our Customer
                </h1>
                <h1 className="font-bold text-center xl:p-6 md:p-3 2xl:text-3xl xl:text-2xl lg:text-lg md:text-base text-primary-default">
                  Is Our First Priority
                </h1>
              </div>
            </div>
            <div className="grid grid-flow-row-dense w-fit">
              <div className="bg-secondary-default rounded-t-xl">
                <img
                  src={CustomerOne}
                  alt="CustomerOne"
                  className="object-cover rounded-tr-xl 2xl:h-[25rem] xl:h-[18rem] lg:h-[15rem] md:h-[12rem] w-[30rem]"
                />
              </div>
              <div className="bg-white rounded-b-xl">
                <h1 className="px-6 font-bold text-center text-black xl:pt-6 md:pt-3 2xl:text-3xl xl:text-2xl lg:text-lg md:text-base">
                  Affordable Prices
                </h1>
                <h1 className="font-bold text-center xl:p-6 md:p-3 2xl:text-3xl xl:text-2xl lg:text-lg md:text-base text-primary-default">
                  With Our Services
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[50%_50%] px-32 pt-12 pb-4">
          <div className="grid grid-flow-row-dense gap-y-24 h-fit">
            <div>
              <h1 className="pb-6 font-bold xl:text-5xl lg:text-3xl md:text-2xl">
                Our
                <span className="text-primary-default"> Mission</span>
              </h1>
              <p className="text-xl font-light leading-relaxed text-justify 2xl:pr-72 xl:pr-64 lg:pr-48 md:pr-32">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Tempora natus non ipsum ducimus unde nostrum magnam harum atque
                qui earum?
              </p>
            </div>
            <div>
              <h1 className="pb-6 font-bold xl:text-5xl lg:text-3xl md:text-2xl">
                Our
                <span className="text-primary-default"> Vission</span>
              </h1>
              <p className="text-xl font-light leading-relaxed text-justify 2xl:pr-72 xl:pr-64 lg:pr-48 md:pr-32">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Tempora natus non ipsum ducimus unde nostrum magnam harum atque
                qui earum?
              </p>
            </div>
          </div>
          <div className="grid grid-flow-row-dense h-fit">
            <span>
              <h1 className="pb-6 font-bold xl:text-5xl lg:text-3xl md:text-2xl">
                Our
                <span className="text-primary-default"> Core Value</span>
              </h1>
            </span>
            <span className="pb-6">
              <p className="text-2xl font-semibold">
                L<span className="text-primary-default">ove</span>
              </p>
              <p className="text-xl font-light leading-relaxed text-justify">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea,
                et?
              </p>
            </span>
            <span className="pb-6">
              <p className="text-2xl font-semibold">
                H<span className="text-primary-default">ome</span>
              </p>
              <p className="text-xl font-light leading-relaxed text-justify">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea,
                et?
              </p>
            </span>
            <span className="pb-6">
              <p className="text-2xl font-semibold">
                A<span className="text-primary-default">ttractive</span>
              </p>
              <p className="text-xl font-light leading-relaxed text-justify">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea,
                et?
              </p>
            </span>
            <span className="pb-6">
              <p className="text-2xl font-semibold">
                N<span className="text-primary-default">atural</span>
              </p>
              <p className="text-xl font-light leading-relaxed text-justify">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea,
                et?
              </p>
            </span>
            <span className="pb-6">
              <p className="text-2xl font-semibold">
                L<span className="text-primary-default">uxurious</span>
              </p>
              <p className="text-xl font-light leading-relaxed text-justify">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea,
                et?
              </p>
            </span>
            <span className="pb-6">
              <p className="text-2xl font-semibold">
                E<span className="text-primary-default">nthuasiastic</span>
              </p>
              <p className="text-xl font-light leading-relaxed text-justify">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea,
                et?
              </p>
            </span>
            <span className="pb-6">
              <p className="text-2xl font-semibold">
                E<span className="text-primary-default">legant</span>
              </p>
              <p className="text-xl font-light leading-relaxed text-justify">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea,
                et?
              </p>
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
