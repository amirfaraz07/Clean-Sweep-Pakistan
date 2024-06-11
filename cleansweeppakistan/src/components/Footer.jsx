import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <footer className="border-t border-[#9B9A9A] py-2">
      <div className="container mx-auto text-center text-gray-600">
        <div className="mb-2">
          <p className="text-xl font-semibold">Connect with us</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              <FontAwesomeIcon icon={faFacebook} size="1x" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
              <FontAwesomeIcon icon={faTwitter} size="1x" />
            </a>
            <a href="someone@example.com" className="text-red-600 hover:text-red-800">
              <FontAwesomeIcon icon={faGoogle} size="1x" />
            </a>
          </div>
        </div>
        <p className="text-sm font-bold">&copy; 2024 - A Project by Faraz Amir</p>
      </div>
    </footer>
  )
}

export default Footer