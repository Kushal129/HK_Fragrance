import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';

function Testimonial() {
  const context = useContext(myContext);
  const { mode } = context;

  return (
    <div>
      <section className="text-gray-600 body-font mb-10">
        <div className="container px-5 py-10 mx-auto">
          <h1 className='text-center text-3xl font-bold' style={{ color: mode === 'dark' ? 'white' : '' }}>Testimonial</h1>
          <h2 className='text-center text-2xl font-semibold mb-10' style={{ color: mode === 'dark' ? 'white' : '' }}>
            What our <span className='text-bgcolor'>customers</span> are saying
          </h2>
          <div className="flex flex-wrap -m-4">
            <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                />
                <p style={{ color: mode === 'dark' ? 'white' : '' }} className="leading-relaxed">
                  "The fragrance is absolutely mesmerizing! It lasts all day and I've received so many compliments. HK Perfumes has definitely gained a loyal customer."
                </p>
                <span className="inline-block h-1 w-10 rounded bg-bgcolor mt-6 mb-4" />
                <h2 style={{ color: mode === 'dark' ? '#ffd000' : '' }} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">
                  John Doe
                </h2>
                <p style={{ color: mode === 'dark' ? 'white' : '' }} className="text-gray-500">Perfume Enthusiast</p>
              </div>
            </div>
            <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                />
                <p style={{ color: mode === 'dark' ? 'white' : '' }} className="leading-relaxed">
                  "I love the unique scents HK Perfumes offers. They are perfect for any occasion and make me feel confident and elegant."
                </p>
                <span className="inline-block h-1 w-10 rounded bg-bgcolor mt-6 mb-4" />
                <h2 style={{ color: mode === 'dark' ? '#ffd000' : '' }} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">
                  Jane Smith
                </h2>
                <p style={{ color: mode === 'dark' ? 'white' : '' }} className="text-gray-500">Fragrance Lover</p>
              </div>
            </div>
            <div className="lg:w-1/3 lg:mb-0 p-4">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src="https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
                />
                <p style={{ color: mode === 'dark' ? 'white' : '' }} className="leading-relaxed">
                  "The quality of these perfumes is top-notch. I am impressed with the lasting power and the beautiful packaging."
                </p>
                <span className="inline-block h-1 w-10 rounded bg-bgcolor mt-6 mb-4" />
                <h2 style={{ color: mode === 'dark' ? '#ffd000' : '' }} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">
                  Michael Lee
                </h2>
                <p style={{ color: mode === 'dark' ? 'white' : '' }} className="text-gray-500">Fragrance Collector</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Testimonial;
