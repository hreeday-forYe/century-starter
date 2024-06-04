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
    '/Home/eleven1.svg',
    '/Home/eleven2.svg',
    '/Home/eleven3.svg',
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50; // Minimum distance for a swipe to be recognized
  const [showAllServices, setShowAllServices] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showButton1, setShowButton1] = useState(true);

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
          <div className=" shadow-md sm:shadow-md s px-5  xl:px-32 sm:px-10 md:px-20 py-5 sm:py-7">
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
                    alt="image"
                    className="hidden"
                  />
                </div>
                <div className="group">
                  <a className="ml-1 hover:p-" href="#" onClick={() => toggleImage('arrowImage3')}>Work</a>
                  <img
                    id="arrowImage3"
                    src="/Home1.svg"
                    alt="image"
                    className="hidden"
                  />
                </div>
                <div className="group">
                  <a className="ml-1 hover:p-" href="#" onClick={() => toggleImage('arrowImage4')}>About</a>
                  <img
                    id="arrowImage4"
                    src="/Home1.svg"
                    alt="image"
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
              <img src="/Home/logo11.svg" alt="img" className="mb-3 w-20 sm:w-20 md:w-16 md:mt-6  lg:w-auto xl:w-auto" />
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
              <img src="/Sec3/3.svg" alt="man" className='pr-16' />
              <img src="/Sec3/4.svg" alt="laptop" />
            </div>
          </div>
          <div className="px-5 sm:px-10 py-5">
  <h1 className="text-black text-4xl md:text-5xl lg:text-6xl">
    Transforming Your
    <span className="relative inline-block">
      Vision To Reality
      <img
        src="/Sec3/Vector.svg"
        alt="Decorative Vector"
        className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2"
      />
    </span>
  </h1>
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
              <img src="/Sec3/arrow-right.svg" alt="Arrow Right Icon" />
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
              <img src="/Sec4/services.svg" alt="Services" className=" pt-5 w-full " />
            </div>
          </div>

          {/* box */}
          <div className='flex flex-col px-5 lg:flex  gap-5  sm:gap-10 md:gap-10 '>
            <div className='lg:gap-4 gap-11 flex flex-col  py-12  sm:gap-10 md:gap-10  lg:flex-row'>

              <div className='bg-[#023F90] rounded-xl p-4 sm:p-5  flex flex-col items-center '>
                <img src="/Sec4/White_logo.svg" alt="Decorative Vector" className="max-w-full  py-1 sm:w-20 " />
                <p className='text-white font-semibold px-5 text-2xl sm:pt-5  text-center py-3 sm:text-xl'>Bhintuna Custom Package</p>
                <p className='text-white  text-center  text-smn py-1   sm:text-lg'>Expert Build Custom Software Solution</p>
                <button className='bg-white text-black text-sm font-medium rounded-3xl px-2.5 py-2  mt-4 p-1.5 flex items-center my-2 sm:bg-black gap-2 ' >
                  Learn More
                  <img src="/Sec3/arrow-right.svg" alt="arrow" className='-rotate-45' />
                </button>
              </div>

              <div className='rounded-xl  flex  flex-col items-center md:hidden'>
                <img src="/Sec4/UIUX.svg" alt="UIUX Vector" className="  w-auto max-w-full sm:w-20" />
                <p className=' font-semibold mt-2 text-2xl pt-5 text-center'>UI/UX Design</p>
                <p className='text-center mt-2'>Using tech knowledge to create applications and websites that convert well and are customized for your business.</p>
              </div>

              <div className='bg-[#023F90] rounded-xl p-4 sm:p-5  flex flex-col items-center '>
                <img src="/Sec4/Bhintunasimple.svg" alt="Decorative Vector" className="max-w-full  py-1 sm:w-20 " />
                <p className='text-white font-semibold px-5 text-2xl sm:pt-5  text-center py-3 sm:text-xl'>Bhintuna Simple Package</p>
                <p className='text-white  text-center  text-smn py-1   sm:text-lg'>Budget Friendly Simple Software Solutions.</p>
                <button className='bg-white text-black text-sm font-medium rounded-3xl px-2.5 py-2  mt-4 p-1.5 flex items-center my-2 sm:bg-black gap-2 '>
                  Learn More
                  <img src="/Sec3/arrow-right.svg" alt="arrow" className='-rotate-45' />
                </button>
              </div>

              <div className='rounded-xl  flex  flex-col items-center md:hidden'>
                <img src="/Sec4/web_development.svg" alt="webdevelopment Vector" className="  w-auto max-w-full sm:w-20" />
                <p className=' font-semibold mt-2 text-2xl pt-5 text-center'>Web Development</p>
                <p className='text-center mt-2'>Crafting modern, responsive websites for your business needs.</p>
              </div>


              <div className='rounded-xl  flex  flex-col items-center md:hidden'>
                <img src="/Sec4/Webhosting.svg" alt="webdevelopment Vector" className="  w-auto max-w-full sm:w-20" />
                <p className=' font-semibold mt-2 text-2xl pt-5 text-center'>Web hosting</p>
                <p className='text-center mt-2'>Increase visibility in your products digitally.</p>
              </div>

              {showButton && (
                <button
                  className='bg-white border justify-center border-black text-black text-base font-medium rounded-3xl px-2.5 py-2 mt-4 p-1.5 flex items-center my-2 sm:bg-black gap-2'
                  onClick={() => {
                    setShowAllServices(!showAllServices); // Toggle showAllServices
                    if (!showAllServices) { // Only hide the button if all services are being shown
                      setShowButton(false);
                    }
                  }}
                >
                  View All Services
                  <img src="/Sec3/arrow-right.svg" alt="arrow" className='-rotate-45' />
                </button>
              )}


              {/* ********************************** */}
              {showAllServices && (
                <>

                  <div className='rounded-xl  flex  flex-col items-center md:hidden'>
                    <img src="/Sec4/SEO.svg" alt="webdevelopment Vector" className="  w-auto max-w-full sm:w-20" />
                    <p className=' font-semibold mt-2 text-2xl pt-5 text-center'>SEO</p>
                    <p className='text-center mt-2'>Increase visibility in your products digitally.</p>
                  </div>

                  <div className='rounded-xl  flex  flex-col items-center md:hidden'>
                    <img src="/Sec4/Webhosting.svg" alt="webdevelopment Vector" className="  w-auto max-w-full sm:w-20" />
                    <p className=' font-semibold mt-2 text-2xl pt-5 text-center'>IT Support</p>
                    <p className='text-center mt-2'>Reliable, comprehensive IT assistance for seamless business operations.</p>
                  </div>

                  <div className='rounded-xl  flex  flex-col items-center md:hidden'>
                    <img src="/Sec4/Customproduct.svg" alt="Custom Product Vector" className="  w-auto max-w-full sm:w-20" />
                    <p className=' font-semibold mt-2 text-2xl pt-5 text-center'>Custom Product Development</p>
                    <p className='text-center mt-2'>Comprehensive IT management for , efficient operations.</p>
                  </div>

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


                  <button
                    className='bg-white border justify-center border-black text-black text-base font-medium rounded-3xl px-2.5 py-2 mt-4 p-1.5 flex items-center my-2 sm:bg-black gap-2'
                    onClick={() => {
                      setShowAllServices(false); // Hide all services
                      setShowButton(true); // Show the "View All Services" button again
                    }}
                  >
                    View Less Services
                    <img src="/Sec3/arrow-right.svg" alt="arrow" className='-rotate-45' />
                  </button>
                </>
              )}
            </div>
          </div>
        </section>


        {/* 5th */}
        <section className=''>
          <div className='bg-black py-14 text-white px-5'>
            <h1 className=" text-4xl md:text-5xl lg:text-6xl">
              How Bhintuna-Tech can help you
            </h1>
            <div className='py-16 flex justify-center'>
              <img src="/Sec5/Logo.svg" alt="Logo" className='' />

            </div>

            <div className='flex flex-col   gap-8'>
              <ul className='flex gap-10  items-center'>
                <li className='text-xs'>01</li><p className='font-medium text-[17px] '>Budget Friendly Solutions</p>
              </ul>
              <ul className='flex gap-10 items-center'>
                <li className='text-xs'>02</li><p className='font-medium text-[17px]' >Expert Consultations</p>
              </ul>
              <ul className='flex gap-10  items-center'>
                <li className='text-xs'>03</li><p className='font-medium text-[17px]'>Focused Approach</p>
              </ul>
              <ul className='flex gap-10 items-center'>
                <li className='text-xs text-center'>04</li><p className='font-medium text-[17px]' >Result  Driven Solution</p>
              </ul>
            </div>

          </div>

        </section>

        {/* 6th  Project*/}
        <section>
          <div className='py-11 px-5'>
            <h1 className='flex gap-3 font-medium'><p className='text-[#023F90]  sm:mr-3 text-xl -mt-1'> &#9679;</p>Projects</h1>
            <div className=" ">
              <h1 className="text-black text-4xl md:text-5xl  lg:text-6xl leading-normal pt-3  ">The Results
                <img src="/Sec6/3.svg" alt="Decorative Vector" className=" absolute ml-[73px] -mt-2  " />
                &nbsp; We&apos;ve Achieved</h1>
            </div>
          </div>


          <div className='px-5 flex flex-col gap-5  '>
            <div className="relative text-white bg-[url('/Sec6/5.svg')] bg-cover bg-center pt-20">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="relative z-10">
                <p className='pl-6 text-2xl pr-10'>Gym Web Application where user gets best Workout Plan</p>
                <div className='flex gap-4 pl-6 pt-2 pb-6'>
                  <h1 className="text-middle text-white">View More</h1>
                  <button
                    className="sm:p-1.5 sm:pl-4 sm:pr-4 border-[#B5B5B5]"
                    onClick={() => navigate('/k')}
                  >
                    <img
                      src="/Sec6/arrow.svg"
                      alt="arrow"
                      className="rounded-2xl px-2.5 py-1 border sm:"
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="relative text-white bg-[url('/Sec6/6.svg')] bg-cover bg-center pt-20">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="relative z-10">
                <p className='pl-6 text-2xl pr-10'>Gym Web Application where user gets best Workout Plan</p>
                <div className='flex gap-4 pl-6 pt-2 pb-6'>
                  <h1 className="text-middle text-white">View More</h1>
                  <button
                    className="sm:p-1.5 sm:pl-4 sm:pr-4 border-[#B5B5B5]"
                    onClick={() => navigate('/k')}
                  >
                    <img
                      src="/Sec6/arrow.svg"
                      alt="arrow"
                      className="rounded-2xl px-2.5 py-1 border sm:"
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="relative text-white bg-[url('/Sec6/7.svg')] bg-cover bg-center pt-20">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="relative z-10">
                <p className='pl-6 text-2xl pr-10'>Gym Web Application where user gets best Workout Plan</p>
                <div className='flex gap-4 pl-6 pt-2 pb-6'>
                  <h1 className="text-middle text-white">View More</h1>
                  <button
                    className="sm:p-1.5 sm:pl-4 sm:pr-4 border-[#B5B5B5]"
                    onClick={() => navigate('/k')}
                  >
                    <img
                      src="/Sec6/arrow.svg"
                      alt="arrow"
                      className="rounded-2xl px-2.5 py-1 border sm:"
                    />
                  </button>
                </div>
              </div>
            </div>

            {showButton1 && (
              <button
                className='bg-white border justify-center border-black text-black text-base font-medium rounded-3xl px-2.5 py-2 mt-4 p-1.5 flex items-center my-2 sm:bg-black gap-2'
                onClick={() => {
                  setShowAllProjects(!showAllProjects); // Toggle showAllServices
                  if (!showAllProjects) { // Only hide the button if all services are being shown
                    setShowButton1(false);
                  }
                }}
              >
                View All Projects
                <img src="/Sec3/arrow-right.svg" alt="arrow" className='-rotate-45' />
              </button>
            )}

            {showAllProjects && (
              <>

                <div className="relative text-white bg-[url('/Sec6/7.svg')] bg-cover bg-center pt-20">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="relative z-10">
                    <p className='pl-6 text-2xl pr-10'>Gym Web Application where user gets best Workout Plan</p>
                    <div className='flex gap-4 pl-6 pt-2 pb-6'>
                      <h1 className="text-middle text-white">View More</h1>
                      <button
                        className="sm:p-1.5 sm:pl-4 sm:pr-4 border-[#B5B5B5]"
                        onClick={() => navigate('/k')}
                      >
                        <img
                          src="/Sec6/arrow.svg"
                          alt="arrow"
                          className="rounded-2xl px-2.5 py-1 border sm:"
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="relative text-white bg-[url('/Sec6/7.svg')] bg-cover bg-center pt-20">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="relative z-10">
                    <p className='pl-6 text-2xl pr-10'>Gym Web Application where user gets best Workout Plan</p>
                    <div className='flex gap-4 pl-6 pt-2 pb-6'>
                      <h1 className="text-middle text-white">View More</h1>
                      <button
                        className="sm:p-1.5 sm:pl-4 sm:pr-4 border-[#B5B5B5]"
                        onClick={() => navigate('/k')}
                      >
                        <img
                          src="/Sec6/arrow.svg"
                          alt="arrow"
                          className="rounded-2xl px-2.5 py-1 border sm:"
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  className='bg-white border justify-center border-black text-black text-base font-medium rounded-3xl px-2.5 py-2 mt-4 p-1.5 flex items-center my-2 sm:bg-black gap-2'
                  onClick={() => {
                    setShowAllProjects(false); // Hide all Projects
                    setShowButton1(true); // Show the "View All Projects" button again
                  }}
                >
                  View Less Projects
                  <img src="/Sec3/arrow-right.svg" alt="arrow" className='-rotate-45' />
                </button>
              </>
            )}
          </div>
        </section>

{/* Sec 6 Contact Us */}
        <section className='pt-11'>
          <div className='px-5'>
          <h1 className='flex gap-3 font-medium'><p className='text-[#023F90]  sm:mr-3 text-xl -mt-1'> &#9679;</p>Contact Us</h1>
          </div>
          <img src="/Sec4/services.svg" alt="Services" className=" pt-3 w-full"/>

          <div className='px-5 py-11 text-4xl md:text-5xl lg:text-6xl leading-normal'>
  <h1 className='text-4xl relative'>
    Don&apos;t Be a&nbsp;
    <span className='relative inline-block'>
      Stranger
      <img
        src="/Sec6/3.svg"
        alt="Decorative Vector"
        className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2"
      />
    </span>
  </h1>
  </div> 
  {/* FORM */}
  <div className="max-w-lg  px-5">
      <form>
        <div className="mb-6">
          <label htmlFor="name" className="block text-black font-medium mb-1">
            Full Name <span className="text-[#023F90]">*</span>
          </label>
          <input
            type="text"
            id="name"
            required
            className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-[#023F90] "
            placeholder="John Doe"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-black font-medium mb-1">
            Email <span className="text-[#023F90]">*</span>
          </label>
          <input
            type="email"
            id="email"
            required
            className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-[#023F90] "
            placeholder="Where we can talk to you"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="phone" className="block text-black font-medium mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-[#023F90] "
            placeholder="Where we can reach you"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-black font-medium mb-1">
            Your Message
          </label>
          <textarea
            id="message"
            className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-[#023F90] "
            placeholder="Type your message here"
            rows="4"
          ></textarea>
        </div>

        <button
              className="lg:btn-fill text-center items-center font-medium rounded-3xl border border-black pl-2 pr-2 p-0.5 sm:p-1.5   flex space-x-3 "
              onClick={() => navigate('/k')}
            >
              <div className='items-center  text-base'>Contact Us</div>
              <img src="/Sec3/arrow-right.svg" alt="Arrow Right Icon" />
            </button>
      </form>
    </div>

    <div className='relative'>
    <img src="/Footer/2.svg" alt="Arrow Right Icon" className='pt-6 w-full'/>
    < p className='absolute top-16 text-center text-white p-5  px-10 '>Call Us on <a href="tel:+977-9849585091">+977-9849585091</a>  or email
<a href="mailto:Bhintuna23@gmail.com"> Bhintuna23@gmail.com </a> to discuss how we can help you.</p>
    {/* <p className='absolute top-20 text-white p-5  px-10 '>Call Us on <a href="tel:+977-9849585091">+977-9849585091</a>  or email</p>
    <p className='absolute top-[101px] text-white p-5'> <a href="mailto:Bhintuna23@gmail.com">Bhintuna23@gmail.com </a> to discuss how we can help you.</p> */}
    </div>
    </section>

        {/* FOOTER */}

        <footer>
          <div className=' px-5 bg-black text-white'>
            <h1 className=' text-4xl pt-7'>Become our partner today</h1>
            <div className="flex gap-4 py-10">
            <h1 className="text-lg text-white">Let&apos;s talk</h1>
            {/* <button className=" btn-fill rounded-2xl border   border-[#B5B5B5] hover:bg-[#023F90] " onClick={() => navigate('/k')}>
              <img src="/Home/white_arrow.svg" alt="arrow" />
            </button> */}
            <button
              className="relative sm:p-1.5 sm:pl-4 sm:pr-4 border-[#B5B5B5] "
              onClick={() => navigate('/k')}
            >
              {/* arrow image */}
              <img
                src="/Sec6/arrow.svg"
                alt="arrow"
                className=" rounded-2xl px-2 py-1 w  border   sm:w-10"
              />
            </button>
          </div>
          <div className='flex flex-col list-none gap-10  underline underline-offset-8  '>
            <li>Home</li>
            <li>Services</li>
            <li>Projects</li>
            <li>Contact Us</li>
          </div>

          <h2 className='text-xl font-medium pt-9'>Find Us</h2>
          <h2 className=' font- py-5'>Kathmandu, Nepal</h2>
          
           <a  href="mailto:Bhintuna23@gmail.com"> Bhintuna23@gmail.com </a>
           <h2 className='py-5'>
          <a  href="tel:+977-9849585091">+977-9849585091</a>  </h2>

          <div>

          </div>
          </div>
        </footer>
       
     


  
      </body>
    </div>
  );
};

export default Index;
