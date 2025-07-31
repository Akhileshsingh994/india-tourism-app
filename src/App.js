// App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route as RouteElement,
  Link
} from 'react-router-dom';
import {
  Navbar, Nav,
  NavDropdown, Carousel
} from 'react-bootstrap';
import DestinationList from './components/DestinationList';
import DestinationDetail from './components/DestinationDetail';
import ContactForm from './components/ContactForm';
import Favorites from './components/Favorites';
import { FavoritesProvider } from './components/FavoritesContext';
import Travel from './components/Travel';
import Destinations from './components/Destinations';
import Experience from './components/Experience';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <FavoritesProvider>
      <Router>
        <div>
          <Navbar className="custom-navbar" expand="lg">
            <Navbar.Brand className="brand-heading">
              Let's explore Heaven
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Link to="/" className="nav-link">
                  Home
                </Link>
                <Link to="/contact" className="nav-link">
                  Contact
                </Link>
                <NavDropdown title="Explore" id="basic-nav-dropdown">
                  <Link to="/travel" className="dropdown-item">
                    Travel
                  </Link>
                  <Link to="/Destinations" className="dropdown-item">
                    Destinations
                  </Link>
                  <Link to="/experience" className="dropdown-item">
                    Experience
                  </Link>
                </NavDropdown>
                <Link to="/favorites" className="nav-link">
                  Favorites
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          {/* Carousel */}
          <Carousel className="custom-carousel flex w-[1400px] ">
            <Carousel.Item>
              <img
                className=" carousel-image w-full"
                src="https://cdn.pixabay.com/photo/2023/08/13/14/42/mountain-8187621_1280.jpg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-image"
                src="https://cdn.pixabay.com/photo/2019/03/12/20/19/india-4051753_1280.jpg"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-image"
                src="https://www.hindustantimes.com/ht-img/img/2024/01/22/550x309/PTI01-21-2024-RPT355A-0_1705843796443_1705892588810.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-image"
                src="https://cdn.pixabay.com/photo/2010/11/29/india-370_1280.jpg"
                alt="Fourth slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-image"
                src="https://media.geeksforgeeks.org/wp-content/uploads/20240105125539/4th.jpg"
                alt="Fifth item"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-image"
                src="https://cdn.pixabay.com/photo/2016/11/21/14/45/blue-city-1845779_960_720.jpg"
                alt="Sixth slide"
              />
            </Carousel.Item>
          </Carousel>
          <br />
          {}
          <Routes>
            <RouteElement path="/" element={<DestinationList />} />
            <RouteElement path="/destination/:id" element={<DestinationDetail />} />
            <RouteElement path="/contact" element={<ContactForm />} />
            <RouteElement path="/experience" element={<Experience />} />
            <RouteElement path="/travel" element={<Travel />} />
            <RouteElement path="/destinations/:id" element={<Destinations />} />
            <RouteElement path="/favorites" element={<Favorites />} />
          </Routes>
          {/* Footer */}
          <div className="custom-footer">
            <div className="footer-section">
              <h3>Connect with us</h3>
              <ul className="social-links">
                <li>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Contact us</h3>
              <p>Email: contact@incredibleindia.com</p>
              <p>Phone: +91 123 456 7890</p>
            </div>
            <div className="footer-section">
              <h3>Newsletter</h3>
              <p>Subscribe to our newsletter for updates and offers.</p>
              <form>
                <input type="email" placeholder="Your email" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </Router>
    </FavoritesProvider>
  );
};

export default App;
