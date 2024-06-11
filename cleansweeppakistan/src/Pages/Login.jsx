// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import AuthContext from '../context/AuthContext';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
//       if (response.status === 200) {
//         login(response.data.token, response.data.role); // Pass both token and role
//         if (response.data.role === 'admin') {
//           navigate('/status/admin');
//         } else {
//           navigate('/status/civilian');
//         }
//       } else {
//         setError('Login failed');
//       }
//     } catch (error) {
//       console.error('Error logging in:', error);
//       setError('Error logging in');
//     }
//   };

//   return (
//     <div className="flex flex-col my-10">
//       <div className="flex-grow flex items-center justify-center">
//         <form onSubmit={handleSubmit}>
//           <h2 className="text-4xl font-semibold text-center mb-5">Login</h2>
//           <p className="text-center mb-6 text-red-500">
//             This is only for admin, citizens don't need it to launch complaints
//           </p>
//           {error && <p className="text-red-500 text-center">{error}</p>}
//           <div className="mb-4">
//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full p-3 border-2 border-gray-400 rounded-full"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full p-3 border-2 border-gray-400 rounded-full"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <a href="#" className="text-gray-600 hover:underline">
//               Forgot Password?
//             </a>
//           </div>
//           <button
//             type="submit"
//             className="h-25 w-[35%] bg-[#505150] text-white py-3 rounded-full font-semibold hover:bg-gray-400 transition duration-300 mx-auto block"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

// src/Pages/Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      if (response.status === 200) {
        login(response.data.token, response.data.role); // Pass both token and role
        if (response.data.role === 'admin') {
          navigate('/status/admin');
        } else {
          navigate('/status/civilian');
        }
      } else {
        setError('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Error logging in');
    }
  };

  return (
    <div className="flex flex-col my-10">
      <div className="flex-grow flex items-center justify-center">
        <form onSubmit={handleSubmit}>
          <h2 className="text-4xl font-semibold text-center mb-5">Login</h2>
          <p className="text-center mb-6 text-red-500">
            This is only for admin, citizens don't need it to launch complaints
          </p>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border-2 border-gray-400 rounded-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border-2 border-gray-400 rounded-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <a href="#" className="text-gray-600 hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="h-25 w-[35%] bg-[#505150] text-white py-3 rounded-full font-semibold hover:bg-gray-400 transition duration-300 mx-auto block"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
