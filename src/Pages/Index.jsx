import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Index = () => {
  useEffect(() => {
    const btn = document.querySelector('#menu-btn');
    const menu = document.getElementById('menu');

    const toggleMenu = () => {
      btn.classList.toggle('open');
      menu.classList.toggle('flex');
      menu.classList.toggle('hidden');
    };

    if (btn) {
      btn.addEventListener('click', toggleMenu);
    }

    return () => {
      if (btn) {
        btn.removeEventListener('click', toggleMenu);
      }
    };
  }, []);

  const toggleImage = (imageId) => {
    const image = document.getElementById(imageId);
    const allImages = document.querySelectorAll('.group img'); // Select all images within .group
    allImages.forEach((img) => {
      img.style.display = 'none'; // Hide all images
    });
    if (image) {
      image.style.display = 'block'; // Show the clicked image
    }
  };

  const [images, setImages] = useState([
    '/Home/1.png',
    '/Home/2.png',
    '/Home/3.png',
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50; // Minimum distance for a swipe to be recognized

  const onTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setImages((prevImages) => {
        const firstImage = prevImages[0];
        return [...prevImages.slice(1), firstImage];
      });
    } else if (isRightSwipe) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      setImages((prevImages) => {
        const lastImage = prevImages[prevImages.length - 1];
        return [lastImage, ...prevImages.slice(0, prevImages.length - 1)];
      });
    }

    // Reset touch positions
    setTouchStart(null);
    setTouchEnd(null);
  };
    const getIndicatorStyle = (index, segment) => {
      if (index === 0 && segment === 0) {
        return 'w-full bg-black';
      }
      if (index === 1) {
        if (segment === 0) {
          return 'w-1/2 bg-white';
        } else if (segment === 1) {
          return 'w-1/2 bg-black';
        }
      }
      if (index === 2 && segment === 2) {
        return 'w-full bg-white';
      }
      return 'w-0';
    };
  

  const navigate = useNavigate();

  return (
    <div>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <link rel="icon" type="image/svg+xml" href="images/Bhintuna/Bhintuna.svg" /> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alata&family=Josefin+Sans:wght@300&display=swap"
          rel="stylesheet"
        />
        <title>BHINTUNA</title>
      </head>
      <body>
        {/* Hero Section */}
        <main className="">
          {/* Hero Container */}
          <div className=" shadow-md sm:shadow-lg s px-5  xl:px-32 sm:px-10 md:px-20 py-5 sm:py-7">
            {/* MENU and Logo SECTION | Nav */}
            <nav className="flex items-center justify-between text-black">
              {/* Logo */}
              <div className="">
                <a href="#">
                  <img
                    src='/Logo.svg'
                    alt="Bhintuna logo"
                    className="w-36  md:block lg:block xl:block  sm:w-40 md:w-48 lg:w-64 xl:w-full h-auto"
                  />
                </a>
              </div>

              {/* Menu */}
              <div className="hidden  lg:flex md:space-x-14 items-center">
                <div className="group">
                  <a className="ml-1 hover:p-" href="/" onClick={() => toggleImage('arrowImage1')}>Home</a>
                  <img
                    id="arrowImage1"
                    src="/Home1.svg"
                    alt=" Logo"
                    className=""
                  />
                </div>
                <div className="group">
                  <a className="ml-1 hover:p-" href="#" onClick={() => toggleImage('arrowImage2')}>Services</a>
                  <img
                    id="arrowImage2"
                    src="/Home1.svg"
                    alt="Loop Studios Logo"
                    className="hidden"
                  />
                </div>
                <div className="group">
                  <a className="ml-1 hover:p-" href="#" onClick={() => toggleImage('arrowImage3')}>Work</a>
                  <img
                    id="arrowImage3"
                    src="/Home1.svg"
                    alt="Loop Studios Logo"
                    className="hidden"
                  />
                </div>
                <div className="group">
                  <a className="ml-1 hover:p-" href="#" onClick={() => toggleImage('arrowImage4')}>About</a>
                  <img
                    id="arrowImage4"
                    src="/Home1.svg"
                    alt="Loop Studios Logo"
                    className="hidden"
                  />
                </div>
                <div className="items-center">
                  <button
                    className="btn-fill hover:text-white font-medium rounded-3xl border border-black pl-4 pr-4 p-2.5 flex space-x-2 button-container"
                    onClick={() => navigate('/k')}
                  >
                    <span>Contact us</span>
                    <img src="/arrow-right.svg" alt="Arrow Right Icon" />
                  </button>
                </div>
              </div>

              {/* HAMBURGER BUTTON */}
              <div className="lg:hidden">
                <button
                  type="button"
                  id="menu-btn"
                  className="z-40 hamburger block focus:outline-none text-black"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="hamburger-top    bg-black"></span>
                  <span className="hamburger-middle bg-black"></span>
                  <span className="hamburger-bottom bg-black"></span>
                </button>
              </div>
            </nav>

            {/* MOBILE MENU */}
            <div
              id="menu"
              className="lg:hidden ab top-0 bottom-0 left-0 hidden flex-col self-end w-full h-full py-1 pt-10 text-center space-y-3 text-lg text-black bg-white uppercase"
            >
              <a href="#" className="hover:text-[#023F90]">Home</a>
              <a href="#" className="hover:text-[#023F90]">Services</a>
              <a href="#" className="hover:text-[#023F90]">Work</a>
              <a href="#" className="hover:text-[#023F90]">About</a>

              <div className="flex justify-center items-center">
                <button
                  className="btn-fill hover:bg-[#023F90] hover:text-white font-medium rounded-3xl border border-black pl-2 pr-1 p-1 flex space-x-2 items-center"
                  onClick={() => navigate('/k')}
                >
                  <span>Contact us</span>
                  <img src="/arrow-right.svg" alt="Arrow Right Icon" />
                </button>
              </div>
            </div>
          </div>
        </main>

        <div className="sm:px-10 md:px-20 lg:px-30 xl:px-32 my-8 md:flex justify-between px-5">
          {/* <!-- Left Section --> */}
          <img src="/Home/1st_home.svg" alt="img" className="hidden  lg:block lg:w-auto" />
          <div className="w-full  md:w-4/5 lg:hidden ">
            <img src="/Home/1st_home.svg" alt="img" className="hidden  md:block " />
          </div>


          {/* <!-- Middle Section --> */}
          <div className="w-full ">
            <div className="md:flex-col items-center md:mx-10 lg:max-w-full xl:max-w-full  flex justify-center">
              <img src="/Home/logo11.svg" alt="img" className="mb-3 w-20 sm:w-20 md:w-16 md:mt-6  lg:w-auto xl:w-auto"/>
            </div>
            <div>
              <h1 className="md:text-clip lg:text-wrap  text-4xl sm:text-4xl text-center pt-1 pb-4">Building Innovative Solutions</h1>
              <p className="font-medium text-center sm:font-semibold sm:text-lg md:block">Bhintuna IT Firm Pvt. Ltd.</p>
            </div>
            <div className="mt-1 md:mx-10 flex justify-center">
              <img src="Home/vector.svg" alt="img" className="mb-3 w-40 sm:w-44" />
            </div>
            <div className="flex gap-4 sm:mt-2 justify-center pt-2">
              <h1 className="text-lg font-medium sm:text-xl text-center">Find out more</h1>
              <button
                className="relative sm:p-1.5 sm:pl-4 sm:pr-4 border-[#B5B5B5]"
                onClick={() => navigate('/k')}
              >
                {/* arrow image */}
                <img
                  src="/Home/arrow.svg"
                  alt="arrow"
                  className=" w-9 rounded-2xl px-1.5 py-0.5   border  sm:w-10"
                />
              
               
              </button>

            </div>
          </div>

          {/* <!-- Right Section --> */}
          <div className="flex-col items-center w-2/4 md:w-3/5 hidden md:flex  ">
            <img src="/Home/2nd_home.svg" alt="img" className="max-w-full lg: h-auto" />
            <img src="/Home/3rd_home.svg" alt="img" className="max-w-full h-auto mt-10" />
          </div>
        </div>

{/* Image slider for mobile*/}
        <div
      className="relative w-full overflow-hidden md:hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex transition-transform duration-500">
        {images.map((image, index) => (
          <div className="min-w-full" key={index}>
            <img src={image} alt={`Slide ${index}`} className="w-full" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-0 right-0 mx-auto w-2/5 h-1 bg-gray-300">
        <div className="flex h-full transition-all duration-1000">
          <div className={getIndicatorStyle(currentIndex, 0)}></div>
          <div className={getIndicatorStyle(currentIndex, 1)}></div>
          <div className={getIndicatorStyle(currentIndex, 2)}></div>
        </div>
      </div>
    </div>

        <div className=" bg-black py-28 px-5 sm:px-10">
          <p className="text-white text-center text-sm font-normal mb-2 justify-center gap-2 flex"> <p className='text-[#023F90] sm:mr-3 text-center'> &#9679;</p> Building Technology Driven Solution From Nepal</p>
          <h1 className="text-white text-center  pt-9    text-[1.7rem] ">
            Excellence begins where innovation seamlessly intersects with simplicity at
          </h1>
          <div className="relative flex justify-center pt-6 items-center">
            <img src="/Home/Vector1.svg" alt="img" className="w-60" />
            <p className="text-white absolute text-center text-2xl">Bhintuna IT Firm</p>
          </div>
          <div className="flex gap-4 pt-6    justify-center">
            <h1 className="text-lg text-white  ">About us</h1>
            {/* <button className=" btn-fill rounded-2xl border   border-[#B5B5B5] hover:bg-[#023F90] " onClick={() => navigate('/k')}>
              <img src="/Home/white_arrow.svg" alt="arrow" />
            </button> */}
             <button
                className="relative sm:p-1.5 sm:pl-4 sm:pr-4 border-[#B5B5B5]"
                onClick={() => navigate('/k')}
              >
                {/* arrow image */}
                <img
                  src="/Home/white_arrow.svg"
                  alt="arrow"
                  className=" w-11 rounded-2xl px-3 py-1.5 w  border  sm:w-10"
                />
                                       </button>
          </div>
        </div>

        {/* section_3 */}
     
        <section className='' >
          


          <div className='flex gap-4 '>
            <div className=' flex flex-col gap-4'>
              <img src="/Sec3/1.svg" alt="man" />
              <img src="/Sec3/2.svg" alt="laptop" />
            </div>
            <div className='flex flex-col gap-4 ' >
              <img src="/Sec3/3.svg" alt="man"  className='pr-16'/>
              <img src="/Sec3/4.svg" alt="laptop" />
            </div>
          </div>
          <div className="   px-5  sm:px-10 mt-5">
            <h1 className="text-black text-4xl md:text-5xl lg:text-6xl">
              Transforming Your Vision To Reality
              {/* </h1> */}
              {/* <h1 className=" text-black text-3xl md:text-5xl lg:text-6xl">
        Vision To Reality */}
            </h1>
            <img src="/Sec3/Vector.svg" alt="Decorative Vector" className=" pl-4 mt-3 sm:ml-56 md:ml-0 " />

          </div>
          <p className=' px-5 sm:px-10 font-medium text-left pt-2 my-4'>
            At Bhintuna, we streamline the software development process for you. Our end-to-end solutions cover every aspect of software solution, from initial concept and strategic planning to development, testing, and deployment. With our extensive expertise and innovative approach, we deliver robust, scalable, and user-friendly software tailored to meet your unique business needs. Let us handle the technical challenges, so you can focus on your core operations and achieve your goals with confidence.
          </p>

          
        </section>


        {/* fourth */}
        <section className='pt-3'>
        <div className=" flex px-5 sm:px-10  xl:px-32 items-center gap-2  ">
            <button
              className="lg:btn-fill text-center items-center font-medium rounded-3xl border border-black pl-2 pr-2 p-0.5 sm:p-1.5   flex space-x-2 button-container"
              onClick={() => navigate('/k')}
            >
               <div className='items-center'>Our Services</div>
              <img src="/Sec3/arrow-right.svg" alt="Arrow Right Icon"/>
            </button>
          </div>

          <h1 className='flex gap-3 font-medium py-5 px-5'><p className='text-[#023F90]  sm:mr-3 text-xl -mt-1'> &#9679;</p> Services</h1>
          <div className=" px-5">
            <h1 className="  text-black text-4xl md:text-5xl lg:text-6xl">
              How Bhintuna-Tech can help you
            </h1>
            <img src="/Sec3/Vector.svg" alt="Decorative Vector" className=" pt-5 max-w-full" />
          </div>

<div>

  <div className='min-w-full flex'>
  <img src="/Sec4/services.svg"  alt="Services" className=" pt-5 w-full " />

  </div>
</div>

          {/* box */}
          <div className='flex flex-col px-5 lg:flex  gap-5  sm:gap-10 md:gap-10 '>
            <div className='lg:gap-4 gap-10 flex flex-col  py-12  sm:gap-10 md:gap-10  lg:flex-row'>
              
            <div className='bg-[#023F90] rounded-xl p-4 sm:p-5  flex flex-col items-center '>
              <img src="/Sec4/White_logo.svg" alt="Decorative Vector" className="max-w-full  py-1 sm:w-20 " />
              <p className='text-white font-semibold px-5 text-2xl sm:pt-5  text-center py-3 sm:text-xl'>Bhintuna Custom Package</p>
              <p className='text-white  text-center  text-smn py-1   sm:text-lg'>Expert Build Custom Software Solution</p>
              <button className='bg-white text-black text-sm font-medium rounded-3xl px-2.5 py-2  mt-4 p-1.5 flex items-center my-2 sm:bg-black gap-2 '>
                Learn More 
                <img src="/Sec3/arrow-right.svg" alt="arrow" className='-rotate-45' />
              </button>
            </div>


            <div className='rounded-xl  flex  flex-col items-center md:hidden'>
              <img src="/Sec4/UIUX.svg" alt="UIUX Vector" className="  w-auto max-w-full sm:w-20" />
              <p className=' font-semibold mt-2 text-2xl  text-center'>UI/UX Design</p>
              <p className='text-center'>Collaborative IT management, enhancing in-house team capabilities.</p>
            </div>

            <div className='bg-[#023F90] rounded-xl p-3 sm:p-5 flex  flex-col items-center lg:hidden'>
              <img src="/Sec4/Bhintunasimple.svg" alt="Decorative Vector" className="  max-w-full sm:w-20 " />
              <p className='text-white font-semibold mt-2 sm:pt-5  text-lg text-center sm:text-xl'>Bhintuna Custom Package</p>
              <p className='text-white mt-2 text-center'>Budget Friendly Simple Software Solutions.</p>
            </div>


            <div className='rounded-xl  flex  flex-col items-center'>
              <img src="/Sec4/webdevelopment.svg" alt="Decorative Vector" className="  w-auto max-w-full sm:w-20" />
              <p className=' font-semibold mt-2 text-lg text-center sm:pt-5 sm:text-xl '>Web Development</p>
              <p className='  text-center sm:mt-1'>Crafting modern, responsive websites for your business needs.</p>
            </div>

            <div className='rounded-xl  flex  flex-col items-center'>
              <img src="/Sec4/IT_Support.svg" alt="IT" className="  w-auto max-w-full sm:w-20" />
              <p className='text-center font-semibold mt-2 sm:pt-5 sm:text-xl'>IT Support</p>
              <p className='text-center sm:mt-1'> Reliable, comprehensive IT assistance for seamless business operations.</p>
            </div>

            <div className='rounded-xl  flex  flex-col items-center'>
              <img src="/Sec4/UIUX.svg" alt="UIUX Vector" className="  w-auto max-w-full sm:w-20" />
              <p className=' font-semibold mt-2 text-lg text-center'>UI/UX Design</p>
              <p className='  text-center'>Collaborative IT management, enhancing in-house team capabilities.</p>
            </div>
            </div>

            <div className='flex flex-col gap-5   py-5 sm:gap-10 md:gap-10 lg:flex-row'>
            <div className='rounded-xl  flex  flex-col items-center'>
              <img src="/Sec4/SEO.svg" alt="Decorative Vector" className="w-auto max-w-full sm:w-20" />
              <p className='font-semibold mt-2 text-lg'>SEO</p>
              <p className='text-center'>Increase visibility in your products digitally.</p>
            </div>




            <div className='rounded-xl  flex  flex-col items-center'>
              <img src="/Sec4/Webhosting.svg" alt="Decorative Vector" className="  w-auto max-w-full sm:w-20" />
              <p className='text text-center font-semibold mt-2 text-lg'>Web Hosting</p>
              <p className='text text-center'> Scalable cloud solutions for flexible, efficient business operations.</p>
            </div>

            {/* <div className='rounded-xl bg-[#023F90] flex p-3 flex-col items-center  lg:items-start '>
              <img src="/Sec4/Customproduct.svg" alt="Decorative Vector" className="  w-auto max-w-full sm:w-20" />
              <p className='text-center font-semibold mt-2 lg:text-start text-xl'>Custom Product Development</p>
              <p className='text-center lg:text-start '> Comprehensive IT management for , efficient operations.</p>
            </div> */}

            <div className='bg-[#023F90] rounded-xl p-3 sm:p-5   flex-col items-center lg:items-start  hidden lg:flex'>
              <img src="/Sec4/Bhintunasimple.svg" alt="Decorative Vector" className="max-w-full sm:w-20 " />
              <p className='text-white font-semibold mt-2 sm:pt-5   text-center  lg:text-start text-xl'>Bhintuna Custom Package</p>
              <p className='text-white mt-2 text-center lg:text-start'>Budget Friendly Simple Software Solutions.</p>
            </div>

             <div className='bg-[#023F90] rounded-xl p-3 sm:p-5   flex-col items-center lg:items-start  hidden lg:flex'>
              <img src="/Sec4/Bhintunasimple.svg" alt="Decorative Vector" className="max-w-full sm:w-20 " />
              <p className='text-white font-semibold mt-2 sm:pt-5   text-center  lg:text-start text-xl'>Bhintuna Custom Package</p>
              <p className='text-white mt-2 text-center lg:text-start'>Budget Friendly Simple Software Solutions.</p>
            </div>
            </div>
          </div>
        </section>



        {/* FOOTER */}
        <footer className="bg-black">
          <div className="container max-w-6xl py-10 mx-auto">
            <div className="flex flex-col items-center mb-8 space-y-6 md:flex-row md:space-y-0 md:justify-between md:items-start">
              {/* MENU and LOGO Container */}
              <div className="flex flex-col items-center space-y-8 md:items-start md:space-y-4">
                {/* Logo */}
                <div className="h-8">
                  <img src="/logo.svg" alt="Logo" className="w-44 md:ml-3" />
                </div>
                {/* MENU container */}
                <div className="flex flex-col items-center space-y-4 font-bold text-white md:flex-row md:space-y-0 md:space-x-6 md:ml-3">
                  <div className="h-10 group">
                    <a href="#">About</a>
                    <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
                  </div>
                  <div className="h-10 group">
                    <a href="#">Careers</a>
                    <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
                  </div>
                  <div className="h-10 group">
                    <a href="#">Events</a>
                    <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
                  </div>
                  <div className="h-10 group">
                    <a href="#">Products</a>
                    <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
                  </div>
                  <div className="h-10 group">
                    <a href="#">Support</a>
                    <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
                  </div>
                </div>
              </div>
              {/* Social and Copyright Container */}
              <div className="flex flex-col items-start justify-between space-y-4 text-gray-500">
                {/* Icons Container */}
                <div className="flex items-center mx-auto md:mx-0 justify-center space-x-4 md:justify-end">
                  <div className="h-8 group">
                    <a href="#">
                      <img src="images/icon-facebook.svg" className="h-6" alt="Facebook" />
                    </a>
                  </div>
                  <div className="h-8 group">
                    <a href="#">
                      <img src="images/icon-twitter.svg" className="h-6" alt="Twitter" />
                    </a>
                  </div>
                  <div className="h-8 group">
                    <a href="#">
                      <img src="images/icon-pinterest.svg" className="h-6" alt="Pinterest" />
                    </a>
                  </div>
                  <div className="h-8 group">
                    <a href="#">
                      <img src="images/icon-instagram.svg" className="h-6" alt="Instagram" />
                    </a>
                  </div>
                </div>
                {/* Copyright */}
                <div className="font-bold">
                  &copy; 2023 Loopstudios. All Rights Reserved
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </div>
  );
};

export default Index;
