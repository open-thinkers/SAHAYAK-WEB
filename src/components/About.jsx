import { Loader } from "lucide-react";
import { useState, useEffect, lazy, Suspense } from "react";
const Footer = lazy(() => import('./Footer'));
const About = () => {
  return (
    <>
    <div className="relative h-full w-full bg-black overflow-hidden mt-1">
      {/* Background layers */}
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>

      <div className="relative overflow-hidden">
        <div className="w-full max-w-screen-2xl mx-auto p-4 pb-0 px-6 md:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            
            {/* Heading Section - Above image on mobile */}
            <div className="w-full text-center lg:hidden">
              <h2 className="text-white font-primary font-normal text-4xl md:text-5xl">
                About <span className="font-bold text-primary">Sahayak</span>
              </h2>
            </div>

            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <img
                src="https://i.ibb.co/SyCcvkM/happy-young-woman-948023-6015-removebg.png"
                alt="Sahayak Prototype"
                className="w-full h-full object-cover image-animate"
              />
            </div>

            {/* Content Section */}
            <div className="text-white/80 w-full lg:w-1/2 flex flex-col justify-center gap-4 order-1 lg:order-2 text-center lg:text-left">
              {/* Heading Section - Hidden on mobile, shown on larger screens */}
              <h2 className="hidden lg:block text-white font-primary font-normal text-4xl md:text-5xl">
                About <span className="font-bold text-primary">Sahayak</span>
              </h2>
              <p className="font-primary font-normal">
                A platform dedicated to enhancing women's safety through
                technology.
              {/* </p>
              <p className="font-primary font-normal"> */}
                Sahayak is a comprehensive solution designed to improve safety
                for women in real-time. Whether you're commuting, walking, or in
                a new environment, Sahayak provides tools to alert and notify
                trusted contacts, as well as access to help immediately.
              {/* </p>
              <p className="font-primary font-normal"> */}
                Our mission is to leverage technology to ensure safety for women
                through features like location tracking, emergency
                notifications, and real-time alerts. Sahayak is built with the
                aim of reducing response time during emergencies, empowering
                women to take control of their safety.
              {/* </p>
              <p className="font-primary font-normal"> */}
                The platform connects with local authorities and integrates with
                secure databases to provide users with real-time information
                about safe routes, nearby help centers, and emergency contacts.
              {/* </p>
              <p className="font-primary font-normal"> */}
                By offering a user-friendly interface, Sahayak ensures that
                everyone, regardless of their technical expertise, can access
                essential safety tools. It's not just an app—it's a commitment
                to women's safety everywhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
        <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>
      </>
  );
};

export default About;
