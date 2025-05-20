import Image from 'next/image';
import React from 'react';

const PhotoSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-[70%]">
      <div className="relative w-[150px] h-[74px]">
        <Image
          src="https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          // src="https://instagram.fdel52-1.fna.fbcdn.net/v/t51.29350-15/412307197_954015226286467_765481920037607741_n.webp?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fdel52-1.fna.fbcdn.net&_nc_cat=107&_nc_oc=Q6cZ2AGFDJ-qUaOJiXK_yXExopsNkgFnhiJ0mOA4GYaihgb61pOrrFM_KgUl6zdrT7FpZMnjIZQWyALSnSFrfTo3I0rK&_nc_ohc=C4ojDzyd84UQ7kNvgHH3Kxx&_nc_gid=0e286f9744984b079d668058a684bfc0&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MzI2MTM5ODA2NDkzNzQ4MzY1NA%3D%3D.3-ccb7-5&oh=00_AYBRNVcKLXY4LrRscWwLuslVrAMz6XqsLlDC0CGI6yyriA&oe=67CCC3CC&_nc_sid=fc8dfb"
          alt="Profile Photo"
          width={150}
          height={150}
          className="object-cover aspect-square rounded-2xl absolute -top-[80px]"
        />
      </div>
      <h3 className="mb-1 text-[22px]">Surinder Singh</h3>
      <p className="para-2 font-semibold text-muted">Frontend Developer</p>
    </div>
  );
};

export default PhotoSection;
