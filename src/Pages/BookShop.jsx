import React from 'react'
import '../Styles/TherapistsList.css'
import Header from '../Components/Header/Header.jsx'
import Footer from '../Components/Footer/Footer.jsx'
import BookCard from '../Components/BookCard/BookCard.jsx'
import book1 from '../Assets/book1.png'
import book2 from '../Assets/book2.png'
import book3 from '../Assets/book3.png'
import book4 from '../Assets/book4.png'
import FiltersBook from '../Components/filtersBook/FiltersBook.jsx'

const BookShop = () => {
  return (
    <>
      <Header />
      <div className="part">

      </div>
      <div className="middle">
          <div className="left-menu">
            <FiltersBook />
          </div>

          <div className="right-part">
            
            <div className="title">
               Our Book Collection:
              <div className="t2">
              Explore our carefully curated collection of books designed to help you on your journey of healing, self-discovery, and personal growth.
              </div>
            </div>

           

            <div className="search-sort">
            <div className="search-wrapper">
              <i className="fa fa-search search-icon" aria-hidden="true"></i>
              <input type="text" placeholder="Search" className="search-input" />
            </div>
            <select className="sort-dropdown">
              <option>Sort by</option>
              <option>Category</option>
              <option>Target Audience</option>
              <option>Language</option>
              <option>Purpose</option>
              <option>Price Range</option>
            </select>
            </div>

            <div className="cards">
              <BookCard
               id="1"
              name="The Autistic Survival Guide To Therapy"
              category="Mental Health"
              author="Dr. Steph Jones"
              price={2000}
              image={book3}
              
              />
              <BookCard
              id="2"
              name="Choosing Therapy"
              category="Psychology"
              author="Dr. Ilyana Romoanovsky"
              price={1500}
              image={book4}
              />
              <BookCard
               id="3"
              name="Change your lfe in 30 days"
              category="Personal Development"
              author="Dr. Joseph Murphy"
              price={900}
              image={book1}
              />
              <BookCard
              id="4"
              name="The Power of Your Subconscious Mind"
              category="Spiritual Growth"
              author="Dr. Joseph Murphy"
              price={1800}
              image={book2}
              />
             
            </div>

          </div>
      </div>
      <Footer />
    </>
  )
}

export default BookShop
