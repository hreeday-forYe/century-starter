import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkedInIcon, InstagramIcon, FacebookIcon } from './PageIcons';
import { FaArrowRightLong } from "react-icons/fa6";

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
    '/Home/eleven1.svg',
    '/Home/eleven2.svg',
    '/Home/eleven3.svg',
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50; // Minimum distance for a swipe to be recognized
  const [showAllServices, setShowAllServices] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showButton1, setShowButton1] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // Tailwind's md breakpoint is 768px
        setShowAllServices(true);
        setShowAllProjects(true);
      } else {
        setShowAllServices(false);
        setShowAllProjects(false);
      }
    };

    window.addEventListener('resize', handleResize);

    // Call the function initially to set the state based on initial window size
    handleResize();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    <>
      <div className=" shadow-md sm:shadow-md s px-5  xl:px-32 sm:px-10 md:px-20  py-5 sm:py-7">
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
          <div className="hidden  lg:flex md:space-x-14 items-center lg:font-semibold">
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
                alt="image"
                className="hidden"
              />
            </div>
            <div className="group">
              <a className="ml-1 hover:p-" href="#" onClick={() => toggleImage('arrowImage3')}>Projects</a>
              <img
                id="arrowImage3"
                src="/Home1.svg"
                alt="image"
                className="hidden"
              />
            </div>
            {/* <div className="group">
              <a className="ml-1 hover:p-" href="#" onClick={() => toggleImage('arrowImage4')}>About</a>
              <img
                id="arrowImage4"
                src="/Home1.svg"
                alt="image"
                className="hidden"
              />
            </div> */}
            <div className="items-center">
              <button
                className="btn-fill hover:text-white font-medium rounded-3xl border border-black pl-4 pr-4 p-2.5 flex space-x-2 button-container items-center  gap-2 "
                onClick={() => navigate('/k')}
              >
                Contact us
                <FaArrowRightLong />
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
          <a href="#" className="hover:text-[#023F90]">Projects</a>
          {/* <a href="#" className="hover:text-[#023F90]">About</a> */}

          <div className="flex justify-center ">
            <button
              className="btn-fill font-medium rounded-3xl border border-black pl-2 pr-1 p-1 flex space-x-2 items-center gap-2"
              onClick={() => navigate('/k')}
            >
              Contact us
              <FaArrowRightLong />
            </button>
          </div>
        </div>
      </div>


      {/* SEC1 */}
      <section>
        <div className="sm:px-10 md:px-20 lg:px-30 xl:px-32 my-8 md:flex justify-between px-5">
          {/* Left Section */}
          <img src="/Home/1st_home.svg" alt="img" className=" hidden lg:block " />
          <div className="w-full lg:hidden">
            <img src="/Home/1st_home.svg" alt="img" className="hidden md:block" />
          </div>

          {/* Middle Section */}
          <div className="w-full  text-center">
            <div className="flex justify-center md:flex-col items-center md:mx-10 lg:max-w-full xl:max-w-full">
              <img src="/Home/logo11.svg" alt="img" className="mb-3 w-20 sm:w-20 md:w-16 md:mt-6 lg:w-auto xl:w-auto" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-4xl md:text-clip lg:text-wrap pt-1 pb-4 p-2 lg:text-5xl  lg:leading-normal ">Building Innovative Solutions</h1>
              <p className="font-medium sm:font-semibold sm:text-lg ">Bhintuna IT Firm Pvt. Ltd.</p>
            </div>
            <div className="mt-1 md:mx-10 flex justify-center">
              <img src="Home/vector.svg" alt="img" className="mb-3 md:mb-0 w-40 sm:w-44 lg:w-60" />
            </div>
            <div className="flex  sm:mt-2 justify-center pt-2 md:pt-0 lg:pt-5">
              <button
                className=" flex  text-lg font-semibold  gap-2 md:gap-3 lg:text-2xl "
                onClick={() => navigate('/k')}
              >  Find out more
                <div className=' btn-fill border  rounded-xl  px-2  md:px-3 md:py-0.5  lg:px-4 lg:rounded-3xl lg:hover:text-white '>
                  <FaArrowRightLong className='lg:size-7' />
                </div>
              </button>
            </div>
          </div>


          {/* Right Section */}
          <div className="w-2/4 md:w-[78%] hidden md:flex flex-col items-center space-y-11">
            <img src="/Home/2nd_home.svg" alt="img" className="max-w-full h-auto" />
            <img src="/Home/3rd_home.svg" alt="img" className="max-w-full h-auto " />
          </div>
        </div>

      </section>
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
        <p className="text-white text-center text-sm  sm:text-lg  font-normal mb-2 justify-center gap-2 flex"> <p className='text-[#023F90] sm:mr-3 text-center'> &#9679;</p> Building Technology Driven Solution From Nepal</p>
        <h1 className="text-white text-center  pt-9  text-[1.7rem] md:text-3xl ">
          Excellence begins where innovation seamlessly intersects with simplicity at
        </h1>
        <div className="relative flex justify-center py-6 items-center">
          <img src="/Home/Vector1.svg" alt="img" className="w-60" />
          <p className="text-white absolute text-center text-2xl md:text-3xl">Bhintuna IT Firm</p>
        </div>
        <div className="flex justify-center">
          <button
            className=" text-white text-lg md:text-xl items-center font-semibold border-[#B5B5B5] gap-2 md:gap-3 flex "
            onClick={() => navigate('/about-us')}
          > About us
            <div className='btn-fill text-white border rounded-xl px-2 md:px-3 md:py-0.5 '>
              <FaArrowRightLong />
            </div>
          </button>
        </div>
      </div>

      {/* section_3 */}
      <section className="flex flex-col md:flex-row">
        <div className="flex gap-4 flex-auto md:w-[45%]">
          <div className="flex flex-col gap-4">
            <img src="/Sec3/1.svg" alt="man" />
            <img src="/Sec3/2.svg" alt="laptop" />
          </div>
          <div className="flex flex-col gap-4 ">
            <img src="/Sec3/3.svg" alt="man" className="pr-16" />
            <img src="/Sec3/4.svg" alt="laptop" />
          </div>
        </div>
        <div className="px-5 sm:px-10 py-5 flex items-center lg:items-start justify-center flex-col md:w-[50%] xl:pr-32 xl:pl-26 md:px-20 lg:pt-20 ">
          <h1 className="text-black text-4xl lg:text-6xl xl:py-12 md:hidden lg:block">
            Transforming Your{" "}
            <span className="relative inline-block ">
              Vision To Reality
              <img
                src="/Sec3/Vector.svg"
                alt="Decorative Vector"
                className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 "
              />
            </span>
          </h1>

          <h1 className="text-black text-4xl lg:text-6xl xl:py-12 hidden md:block lg:hidden ">
            Transforming Your Vision To Reality
          </h1>
          <p className="font-normal text-left pt-3  sm:font-medium my-4 xl:text-xl  xl:leading-relaxed  xl:font-semibold lg:pb-14 ">
            At Bhintuna, we streamline the software development process for
            you. Our end-to-end solutions cover every aspect of software
            solution, from initial concept and strategic planning to
            development, testing, and deployment. With our extensive expertise
            and innovative approach, we deliver robust, scalable, and
            user-friendly software tailored to meet your unique business
            needs. Let us handle the technical challenges, so you can focus on
            your core operations and achieve your goals with confidence.
          </p>

          <div className=" flex items-center lg:gap-10  ">
            <h1 className='text-2xl font-medium ' >Learn more about</h1>
            <button
              className=" btn-fill  hover:text-white text-center items-center font-medium rounded-3xl border border-black px-2 p-0.5 sm:p-1.5 sm:px-3 flex  gap-3 "
              onClick={() => navigate('/our-services')}
            >Our Services
              <div className=' '>
                <FaArrowRightLong />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* fourth */}
      <section className=''>
        <div className='md:flex md:items-center md:py-14 xl:px-32 sm:px-10 md:px-20'>
          <div>
            <h1 className='flex gap-3 font-medium sm:text-lg md:hidden py-5 px-5'><p className='text-[#023F90] text-xl sm:text-2xl -mt-1 '> &#9679;</p> Services</h1>
            <div className=" px-5 md:px-0 sm:pb-6  md:w-[85%] ">
              <h1 className="text-black text-4xl  md:text   md:text-5xl lg:text-6xl">
                How Bhintuna-Tech <span className="relative inline-block"> can help you
                  <img
                    src="/Sec3/Vector.svg"
                    alt="Decorative Vector"
                    className="absolute left-1/2 transform -translate-x-1/2 top-full "
                  />
                </span>
              </h1>
            </div>
          </div>
          <div className=' flex md:w-[75%] xl:w-[40%]'>
            <img src="/Sec4/services.svg" alt="Services" className="pt-8 w-full " />
          </div>
        </div>

        {/* box */}
        <div className='flex flex-col  px-5 lg:flex  gap-5  sm:gap-10 md:gap-10 md:py-14 xl:px-32 sm:px-10 md:px-20'>
          <div className=' gap-11 flex flex-col  py-12  sm:gap-10  md:gap-15 md:flex-wrap   lg:gap-14 md:flex-row xl:gap-12 '>
            <div className="bg-[#023F90]  rounded-xl p-4 sm:p-5 flex flex-col justify-between h-full items-center xl:items-start md:w-[46.5%] lg:w-[29%] xl:w-[21.5%] relative">
              <div className="flex flex-col items-center xl:items-start  mb-4">
                <img src="/Sec4/White_logo.svg" alt="Decorative Vector" className="max-w-full py-1 lg:py-0 sm:w-20 lg:w-auto" />
                <p className="text-white font-semibold px-5 xl:px-0 text-2xl sm:pt-5 lg:font-bold text-center xl:text-start py-3 lg:py-2 sm:text-xl">
                  Bhintuna Simple Package
                </p>
                <p className="text-white text-center xl:text-sm  py-1 xl:text-start">
                  Budget Friendly Simple Software Solutions.
                </p>
              </div>
              <div className=" xl:absolute bottom-3 right-5 mt-5 ">
                <button className="bg-white text-black text-sm font-medium rounded-3xl px-2.5 py-2 flex items-center gap-2 xl:px-2 xl:py-1 xl:text-xs ">
                  Learn More
                  <div className="-rotate-45 ">
                    <FaArrowRightLong />
                  </div>
                </button>
              </div>
            </div>

            <div className='rounded-xl  flex  flex-col items-center lg:items-start md:w-[46.5%] lg:w-[29%] xl:w-[21.5%] '>
              <img src="/Sec4/UIUX.svg" alt="UIUX Vector" className="  w-auto max-w-full sm:w-20 lg:w-auto  " />
              <p className=' font-semibold mt-2 text-2xl pt-5 text-center lg:font-bold  '>UI/UX Design</p>
              <p className='text-center lg:text-start mt-2'>Using tech knowledge to create applications and websites that convert well and are customized for your business.</p>
            </div>


            <div className='bg-[#023F90] rounded-xl p-4 sm:p-5  flex flex-col items-center  md:hidden '>
              <img src="/Sec4/Bhintunasimple.svg" alt="Decorative Vector" className="max-w-full  py-1 sm:w-20 " />
              <p className='text-white font-semibold px-5 text-2xl sm:pt-5  text-center py-3 sm:text-xl'>Bhintuna Simple Package</p>
              <p className='text-white  text-center  text-smn py-1   sm:text-lg'>Budget Friendly Simple Software Solutions.</p>
              <button className='bg-white text-black text-sm font-medium rounded-3xl px-2.5 py-2  mt-4 p-1.5 flex items-center my-2  gap-2 '>
                Learn More
                <div className=' -rotate-45 '>
                  <FaArrowRightLong />
                </div>
              </button>
            </div>

            <div className='rounded-xl  flex  flex-col items-center  lg:items-start md:w-[46.5%] lg:w-[29%] xl:w-[21.4%]'>
              <img src="/Sec4/web_development.svg" alt="webdevelopment Vector" className="  w-auto max-w-full sm:w-20 lg:w-auto" />
              <p className=' font-semibold mt-2 text-2xl pt-5 text-center lg:font-bold '>Web Development</p>
              <p className='text-center lg:text-start mt-2'>Crafting modern, responsive websites for your business needs.</p>
            </div>


            <div className='rounded-xl  flex  flex-col items-center  lg:items-start md:w-[46.5%] lg:w-[29%] xl:w-[21.5%] '>
              <img src="/Sec4/Webhosting.svg" alt="webdevelopment Vector" className="  w-auto max-w-full sm:w-20 lg:w-auto" />
              <p className=' font-semibold mt-2 text-2xl pt-5 text-center lg:font-bold '>Web hosting</p>
              <p className='text-center mt-2 lg:text-start'>Increase visibility in your products digitally.</p>
            </div>

            {showButton && (
              <button
                className='bg-white  md:hidden border justify-center border-black text-black text-base font-medium rounded-3xl px-2.5 py-2 mt-4 p-1.5 flex items-center my-2  gap-2 '
                onClick={() => {
                  setShowAllServices(!showAllServices); // Toggle showAllServices
                  if (!showAllServices) { // Only hide the button if all services are being shown
                    setShowButton(false);
                  }
                }}
              >
                View All Services
                <div className=' -rotate-45 '>
                  <FaArrowRightLong />
                </div>
              </button>
            )}

            {/* ********************************** */}
            {showAllServices && (
              <>
                <div className='rounded-xl  flex  flex-col items-center lg:items-start md:w-[46.5%] lg:w-[29%] xl:w-[21.5%] '>
                  <img src="/Sec4/SEO.svg" alt="webdevelopment Vector" className="w-auto max-w-full sm:w-20 lg:w-auto" />
                  <p className=' font-semibold mt-2 text-2xl pt-5 text-center lg:font-bold  '>SEO</p>
                  <p className='text-center mt-2 lg:text-start'>Increase visibility in your products digitally.</p>
                </div>

                <div className='rounded-xl  flex  flex-col items-center lg:items-start md:w-[46.5%] lg:w-[29%] xl:w-[21.5%]'>
                  <img src="/Sec4/Webhosting.svg" alt="webdevelopment Vector" className="  w-auto max-w-full sm:w-20 lg:w-auto" />
                  <p className=' font-semibold mt-2 text-2xl pt-5 text-center lg:font-bold '>IT Support</p>
                  <p className='text-center mt-2 lg:text-start'>Reliable, comprehensive IT assistance for seamless business operations.</p>
                </div>

                <div className='rounded-xl  flex  flex-col items-center lg:items-start md:w-[46.5%] lg:w-[29%] xl:w-[21.4%] '>
                  <img src="/Sec4/Customproduct.svg" alt="Custom Product Vector" className="  w-auto max-w-full sm:w-20 lg:w-auto" />
                  <p className=' font-semibold mt-2 text-2xl pt-5 text-center lg:text-start lg:font-bold '>Custom Product Development</p>
                  <p className='text-center mt-2 lg:text-start'>Comprehensive IT management for , efficient operations.</p>
                </div>


                <div className="bg-[#023F90]  rounded-xl p-4 sm:p-5 flex flex-col justify-between h-full items-center xl:items-start md:w-[46.5%] lg:w-[29%] xl:w-[21.5%] relative">
                  <div className="flex flex-col items-center xl:items-start  mb-4">
                    <img src="/Sec4/Bhintunasimple.svg" alt="Decorative Vector" className="max-w-full py-1 lg:py-0 sm:w-20 lg:w-auto" />
                    <p className="text-white font-semibold px-5 xl:px-0 text-2xl sm:pt-5 lg:font-bold text-center xl:text-start py-3 lg:py-2 sm:text-xl">
                      Bhintuna Simple Package
                    </p>
                    <p className="text-white text-center xl:text-sm  py-1 xl:text-start">
                      Budget Friendly Simple Software Solutions.
                    </p>
                  </div>
                  <div className=" xl:absolute bottom-3 right-5 mt-5 ">
                    <button className="bg-white text-black text-sm font-medium rounded-3xl px-2.5 py-2 flex items-center gap-2 xl:px-2 xl:py-1 xl:text-xs ">
                      Learn More
                      <div className="-rotate-45 ">
                        <FaArrowRightLong />
                      </div>
                    </button>
                  </div>
                </div>

                <button
                  className='bg-white border  md:hidden justify-center border-black text-black text-base font-medium rounded-3xl px-2.5 py-2 mt-4 p-1.5 flex items-center my-2 gap-2 '
                  onClick={() => {
                    setShowAllServices(false); // Hide all services
                    setShowButton(true); // Show the "View All Services" button again
                  }}
                >
                  View Less Services
                  <div className=' -rotate-45 '>
                    <FaArrowRightLong />
                  </div>
                </button>

              </>
            )}
          </div>
        </div>
      </section>

      {/* 5th */}
      <section className=''>
        <div className='bg-black py-14 text-white px-5 sm:px-10 '>
          <h1 className="text-4xl md:text-center lg:text-6xl">
            How Bhintuna-Tech <br className='hidden md:block' />
            <p className="inline-block">can help you</p>
            <img src="/Sec5/Vector.svg" alt="Vector" className="block mx-auto pt-2 hidden md:block" />
          </h1>
          <div className='md:flex md:py-16  md:gap-32 xl:gap-48   md:justify-center'>
            <div className='py-16 md:py-0 flex justify-center'>
              <img src="/Sec5/Logo.svg" alt="Logo" className='lg:w-60' />
            </div>
            <div className='flex flex-col gap-8  '>
              <ul className='flex gap-10  items-center'>
                <li className='text-xs lg:text-base'>01</li><p className='font-medium text-[17px] lg:text-xl xl:text-2xl '>Budget Friendly Solutions</p>
              </ul>
              <ul className='flex gap-10 items-center'>
                <li className='text-xs lg:text-base'>02</li><p className='font-medium text-[17px] lg:text-xl xl:text-2xl' >Expert Consultations</p>
              </ul>
              <ul className='flex gap-10  items-center'>
                <li className='text-xs lg:text-base'>03</li><p className='font-medium text-[17px] lg:text-xl xl:text-2xl'>Focused Approach</p>
              </ul>
              <ul className='flex gap-10 items-center'>
                <li className='text-xs lg:text-base text-center'>04</li><p className='font-medium text-[17px] lg:text-xl xl:text-2xl' >Result  Driven Solution</p>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6th  Project*/}
      <section className='xl:px-32 sm:px-10 md:px-20'>
        <div className='py-11 px-5 md:px-0'>
          <h1 className='flex gap-3 font-medium sm:text-lg md:hidden  '><p className='text-[#023F90] text-xl sm:text-2xl -mt-1 '> &#9679;</p> Projects</h1>
          <h1 className=' gap-3 font-medium sm:text-lg hidden md:flex '><p className='text-[#023F90] text-xl sm:text-2xl -mt-1 hidden md:flex  '> &#9679;</p> Our Work</h1>
          <div className=" ">
            <h1 className="text-black text-4xl md:text-5xl  lg:text-6xl leading-normal pt-3   ">The Results
              <img src="/Sec6/3.svg" alt="Decorative Vector" className=" absolute ml-[73px] -mt-2 md:mt-auto  md:w-[18%]  md:ml-24 " />
              &nbsp; We&apos;ve Achieved</h1>
          </div>
        </div>

        <div className='px-5 md:px-0 flex flex-col gap-5 lg:gap-7 xl:gap-10 lg:flex-row lg:flex-wrap    '>
          <div className="relative text-white bg-[url('/Sec6/5.svg')] bg-cover bg-center pt-20 lg:w-[48%]">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="relative z-10">
              <p className='pl-6 text-2xl pr-10 md:text-3xl xl:text-[45px]  leading-snug'>Gym Web Application where user gets best Workout Plan</p>
              <div className='flex  pl-4 pt-2 pb-6 '>
                <button
                  className="sm:p-1.5 sm:pl-4 sm:pr-4 border-[#B5B5B5] text-white text-middle items-center  md:text-lg xl:text-xl flex gap-6"
                  onClick={() => navigate('/k')}
                >View More
                  <div className='px-2 sm:px-3.5 sm:py-0.5 border rounded-xl  xl:rounded-2xl   '>
                    <FaArrowRightLong className=' lg:size-5 xl:size-7' />
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="relative text-white bg-[url('/Sec6/6.svg')] bg-cover bg-center pt-20 lg:w-[48%] ">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="relative z-10">
              <p className='pl-6 text-2xl pr-10 md:text-3xl xl:text-[45px] leading-snug'>Gym Web Application where user gets best Workout Plan</p>
              <div className='flex  pl-4 pt-2 pb-6 '>
                <button
                  className="sm:p-1.5 sm:pl-4 sm:pr-4 border-[#B5B5B5] text-white text-middle items-center  md:text-lg xl:text-xl flex gap-6"
                  onClick={() => navigate('/k')}
                >View More
                  <div className='px-2 sm:px-3.5 sm:py-0.5 border rounded-xl  xl:rounded-2xl   '>
                    <FaArrowRightLong className='lg:size-5 xl:size-7' />
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="relative text-white bg-[url('/Sec6/7.svg')] bg-cover bg-center pt-20 lg:w-[48%]">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="relative z-10">
              <p className='pl-6 text-2xl pr-10 md:text-3xl xl:text-[45px] leading-snug'>Gym Web Application where user gets best Workout Plan</p>
              <div className='flex  pl-4 pt-2 pb-6 '>
                <button
                  className="sm:p-1.5 sm:pl-4 sm:pr-4 border-[#B5B5B5] text-white text-middle items-center  md:text-lg xl:text-xl flex gap-6"
                  onClick={() => navigate('/k')}
                >View More
                  <div className='px-2 sm:px-3.5 sm:py-0.5 border rounded-xl  xl:rounded-2xl   '>
                    <FaArrowRightLong className='lg:size-5 xl:size-7' />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {showButton1 && (
            <button
              className='bg-white border justify-center md:hidden border-black text-black text-base font-medium rounded-3xl px-2.5 py-2 mt-4 p-1.5 flex items-center my-2  gap-2 '
              onClick={() => {
                setShowAllProjects(!showAllProjects); // Toggle showAllServices
                if (!showAllProjects) { // Only hide the button if all services are being shown
                  setShowButton1(false);
                }
              }}
            >
              View All Projects
              <div className=' -rotate-45 '>
                <FaArrowRightLong />
              </div>
            </button>
          )}

          {showAllProjects && (
            <>
              <div className="relative text-white bg-[url('/Sec6/7.svg')] bg-cover bg-center pt-20 lg:w-[48%]">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="relative z-10">
                  <p className='pl-6 text-2xl pr-10 md:text-3xl xl:text-[45px] leading-snug'>Gym Web Application where user gets best Workout Plan</p>
                  <div className='flex  pl-4 pt-2 pb-6 '>
                    <button
                      className="sm:p-1.5 sm:pl-4 sm:pr-4 border-[#B5B5B5] text-white text-middle items-center  md:text-lg xl:text-xl flex gap-6"
                      onClick={() => navigate('/k')}
                    >View More
                      <div className='px-2 sm:px-3.5 sm:py-0.5 border rounded-xl  xl:rounded-2xl   '>
                        <FaArrowRightLong className='lg:size-5 xl:size-7' />
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative text-white bg-[url('/Sec6/7.svg')] bg-cover bg-center pt-20 lg:w-[48%]">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="relative z-10">
                  <p className='pl-6 text-2xl pr-10 md:text-3xl xl:text-[45px] leading-snug'>Gym Web Application where user gets best Workout Plan</p>
                  <div className='flex  pl-4 pt-2 pb-6 '>
                    <button
                      className="sm:p-1.5 sm:pl-4 sm:pr-4 border-[#B5B5B5] text-white text-middle items-center  md:text-lg xl:text-xl flex gap-6"
                      onClick={() => navigate('/k')}
                    >View More
                      <div className='px-2 sm:px-3.5 sm:py-0.5 border rounded-xl  xl:rounded-2xl   '>
                        <FaArrowRightLong className='lg:size-5 xl:size-7' />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <button
                className='bg-white border justify-center border-black text-black text-base font-medium rounded-3xl px-2.5 py-2 mt-4 p-1.5 flex items-center my-2  gap-2  md:hidden '
                onClick={() => {
                  setShowAllProjects(false); // Hide all Projects
                  setShowButton1(true); // Show the "View All Projects" button again
                }}
              >
                View Less Projects
                <div className=' -rotate-45 '>
                  <FaArrowRightLong />
                </div>
              </button>
            </>
          )}
        </div>
      </section>

      {/* Sec 6 Contact Us */}
      <section className='pt-11'>
        <div className='px-5 xl:px-32 sm:px-10 md:px-20'>
          <h1 className='flex gap-3 font-medium sm:text-lg '><p className='text-[#023F90] text-xl sm:text-2xl -mt-1 '> &#9679;</p> Contact Us</h1>
        </div>

        <div className='lg:flex lg:flex-row-reverse md:py-5  '>

          <div className='xl:pr-32 sm:px-10 md:px-20 '>
            <img src="/Sec4/services.svg" alt="Services" className=" pt-3 w-full lg:hidden" />
            <img src="/Sec6/Contact1.svg" alt="Services" className=" pt-3 w-full  hidden lg:block" />
          </div>

          <div className='  px-5 xl:pl-32 sm:px-10 md:px-20 mt-6 lg:mt-0'>
            <div className='py-11   md:py-0 text-4xl md:text-5xl lg:text-6xl leading-normal md:mb-6 '>
              <h1 className='text-4xl relative  md:text-5xl'>
                Don&apos;t Be a&nbsp;
                <span className='relative inline-block'>
                  Stranger
                  <img
                    src="/Sec6/3.svg"
                    alt="Decorative Vector"
                    className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1.5 md:mt-0.5 lg:w-60"
                  />
                </span>
              </h1>
            </div>

            {/* FORM */}
            <div className=" lg:pt-4">
              <form className=''>
                <div className="mb-6 md:flex md:gap-10  md:text-lg">
                  <label htmlFor="email" className="block text-black font-medium mb-1 w-1/2">
                    Full Name <span className="text-[#023F90]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full border-b-2 md:border-none border-gray-300 focus:outline-none focus:border-[#023F90] "
                    placeholder="John Doe"
                  />
                </div>

                <hr className='hidden border md:block md:-mt-4 ' />

                <div className="mb-6 md:flex md:gap-10 md:text-lg md:pt-5">
                  <label htmlFor="email" className="block text-black font-medium mb-1 w-1/2">
                    Email <span className="text-[#023F90]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full border-b-2 md:border-none border-gray-300 focus:outline-none focus:border-[#023F90] "
                    placeholder="Where we can talk to you"
                  />
                </div>
                <hr className='hidden border md:block  md:-mt-4' />

                <div className="mb-6 md:flex md:gap-10 md:text-lg md:pt-5">
                  <label htmlFor="phone" className="block text-black font-medium mb-1 w-1/2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full border-b-2 md:border-none border-gray-300 focus:outline-none focus:border-[#023F90] "
                    placeholder="Where we can reach you"
                  />
                </div>
                <hr className='hidden border md:block  md:-mt-4' />

                <div className="mb-6 md:flex md:gap-10 md:text-lg md:pt-5">
                  <label htmlFor="message" className="block text-black font-medium mb-1 w-1/2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    className="w-full border-b-2 md:border-none border-gray-300 focus:outline-none focus:border-[#023F90] "
                    placeholder="Type your message here"
                    rows="4"
                  ></textarea>
                </div>
                <hr className='hidden border md:block  md:-mt-4' />

                <div className='flex mt-5  md:gap-10 md:items-center  xl:gap-8  '>
                  <p className='hidden md:block'>By sending this form you accept our <a href="" className='underline'>Privacy Policy</a></p>
                  <button
                    className="lg:btn-fill text-center items-center font-medium rounded-3xl border border-black px-2 p-0.5 sm:p-1.5  sm:px-3 flex gap-3   "
                    onClick={() => navigate('/contact-us')}
                  >
                    <p className='md:hidden'>Contact Us</p>
                    <p className='hidden md:block text-lg'>Send Message</p>
                    <FaArrowRightLong />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className='pt-6 lg:hidden'>
          < p className="bg-[url('/Footer/2.svg')]  bg-cover bg-center text-center text-white p-10 sm:p-20 xl:p-28 w-full ">Call Us on <a href="tel:+977-9849585091">+977-9849585091</a>  or email <br />
            <a href="mailto:Bhintuna23@gmail.com"> Bhintuna23@gmail.com </a> to discuss how we can help you.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className=' px-5 bg-black text-white xl:px-32 sm:px-10 md:px-20 lg:pt-40 relative  md:mt-60'>
          <div className='pt-6 hidden lg:block  px-60 absolute   inset-x-0 z-10 -top-40 text-3xl'>
            < p className="bg-[url('/Footer/2_1.svg')]  bg-cover bg-center text-center text-white p-10 sm:p-20 xl:p-28 w-full ">Call Us on <a href="tel:+977-9849585091">+977-9849585091</a>  or email <br />
              <a href="mailto:Bhintuna23@gmail.com"> Bhintuna23@gmail.com </a> to discuss how we can help you.</p>
          </div>
          <div className='lg:flex justify-between lg:py-10  '>
            <div>

              <h1 className="text-4xl pt-7 ">Become our <br className=' hidden lg:block' /> <span className="bg-[url('/Footer/Vector.svg')] bg-cover bg-center leading-normal px-1.5 ">partner</span> today</h1>
              <div className="flex gap-4 py-10 items-center">
                <h1 className="text-lg text-white lg:text-xl">Let&apos;s talk</h1>
                <button
                  className="relative sm:p-1.5 sm:pl-4 sm:pr-4 border-[#B5B5B5]  "
                  onClick={() => navigate('/talk')}
                >
                  <div className='border px-2.5 sm:px-3  lg:px-5 lg:py-1.5 lg:rounded-2xl  rounded-lg'>
                    <FaArrowRightLong className='lg:size-5' />
                  </div>
                </button>
              </div>
            </div>

            {/* <div className='md:flex md:justify-between lg:flex-col '> */}
            <div className='flex lg:flex-col lg:gap-40 items-center '>
              <img src="/Sec5/Logo.svg" alt="logo" className='w-32 hidden lg:block' />
              <div className='flex flex-col list-none gap-10  underline   lg:no-underline underline-offset-8  lg:flex-row lg:items-center '>
                <li onClick={() => navigate('/Home')}>Home</li>
                <li onClick={() => navigate('/Services')}>Services</li>
                <li onClick={() => navigate('/Projects')}>Projects</li>
                <li onClick={() => navigate('/Contact-us')} className=' lg:hidden'>Contact Us</li>
                <button
                  className="btn-fill hover:text-white font-medium rounded-3xl border  lg:flex  hidden  border-white pl-4 pr-4 p-2.5  space-x-2 button-container items-center  gap-2 "
                  onClick={() => navigate('/contact-us')}
                >
                  Contact us
                  <FaArrowRightLong />
                </button>
              </div>
            </div>

            {/* Find US */}
            <div className=''>
              <div className='text-sm sm:text-base'>
                <h2 className='text-xl font-medium mt-10 md:pt-0'>Find Us</h2>
                <h2 className=' font- py-5'>Kathmandu, Nepal</h2>
                <a href="mailto:Bhintuna23@gmail.com"> Bhintuna23@gmail.com </a>
                <h2 className='py-5 '>
                  <a href="tel:+977-9849585091">+977-9849585091</a>  </h2>
              </div>

              <div className='flex gap-x-6' >
                <ul onClick={() => navigate('/d')} >
                  < LinkedInIcon />
                </ul>
                <ul onClick={() => navigate('/d')} >
                  < InstagramIcon />
                </ul>
                <ul onClick={() => navigate('/d')} >
                  < FacebookIcon />
                </ul>
              </div>
            </div>
            {/* </div> */}
          </div>
          <div className=' lg:flex  md:items-center md:justify-between  md:py-5 '>
            <div className=" py-3">
              <a href="#">
                <img
                  src='/Logo.svg'
                  alt="Bhintuna logo"
                  className="w-36  md:block lg:block xl:block  sm:w-40 md:w-48 lg:w-64 xl:w-80  h-auto"
                />
              </a>
            </div>
            <p className='text-xs font-thin pb-5 lg:pb-0'> &copy; 2024 Bhintuna - Bhintuna IT Firm Pvt Ltd.All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;
