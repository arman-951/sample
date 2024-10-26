import React, { useState } from 'react';
import { useLeaderboard } from './context/LeaderboardContext';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [formData, setFormData] = useState({ firstName: '', email: '', password: '' });
  const [loginData, setLoginData] = useState({ name: '', password: '' });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Access the leaders and the setter from context
  const { leaders, setLeaders } = useLeaderboard();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ firstName: formData.firstName, email: formData.email, password: formData.password });
    localStorage.setItem('users', JSON.stringify(users));
    setIsRegistering(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.firstName === loginData.name && user.password === loginData.password);
    if (user) {
      setUserName(user.firstName);
      setIsLoggedIn(true);
      setLoginData({ name: '', password: '' });
      toggleModal();
    } else {
      alert('Invalid login credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setDropdownOpen(false);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleLeaderClick = (index) => {
    const updatedLeaders = [...leaders];
    updatedLeaders[index].points += 1;
    setLeaders(updatedLeaders);
  };

// Sort the leaders by points in descending order
const sortedLeaders = leaders.sort((a, b) => b.points - a.points).slice(0, 3); // Take the top 3 entries


  return (
    <>
      {/* Modal for Login/Register */}
      {isModalOpen && (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="modal-content bg-white p-5 rounded shadow-lg">
            <h2 className="text-lg font-semibold">{isRegistering ? 'Register' : 'Login'}</h2>
            {isRegistering ? (
              <form onSubmit={handleRegister}>
                <input
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                  className="border p-2 mb-2 w-full"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="border p-2 mb-2 w-full"
                />
                <input
                  type="password"
                  placeholder="Create Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="border p-2 mb-2 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white py-1 px-3 rounded">Register</button>
                <button onClick={() => setIsRegistering(false)} className="ml-2 text-blue-500">Switch to Login</button>
              </form>
            ) : (
              <form onSubmit={handleLogin}>
                <input
                  type="text"
                  placeholder="Name"
                  value={loginData.name}
                  onChange={(e) => setLoginData({ ...loginData, name: e.target.value })}
                  required
                  className="border p-2 mb-2 w-full"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                  className="border p-2 mb-2 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white py-1 px-3 rounded">Login</button>
                <button onClick={() => setIsRegistering(true)} className="ml-2 text-blue-500">Switch to Register</button>
              </form>
            )}
            <button onClick={toggleModal} className="mt-3 bg-red-500 text-white py-1 px-3 rounded">Close</button>
          </div>
        </div>
      )}

      {/* Pop-up Modal */}
      {isPopupOpen && (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="modal-content bg-white p-5 rounded shadow-lg w-1/2">
            <h2 className='font-bold text-xl pb-6'>tests History</h2>
            <div className="border-b py-3">
            <p>Date: 15 Oct 2024</p>
            <p>Points Awarded: 7</p>
            </div>
            <div className="border-b py-3">
            <p>Date: 15 Oct 2024</p>
            <p>Points Awarded: 7</p>
            </div>
            <div className="border-b py-3">
            <p>Date: 15 Oct 2024</p>
            <p>Points Awarded: 7</p>
            </div>
            <div className="border-b py-3">
            <p>Date: 15 Oct 2024</p>
            <p>Points Awarded: 7</p>
            </div>
            <div className="border-b py-3">
            <p>Date: 15 Oct 2024</p>
            <p>Points Awarded: 7</p>
            </div>
            <button onClick={togglePopup} className="mt-3 bg-red-500 text-white py-1 px-3 rounded">Close</button>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-gray-900 text-white text-[17px] p-3 flex justify-between items-center">
        <ul className="flex gap-4">
          {/* Show Home and Pop-up options for both logged in and logged out states */}
          <li className="hover:bg-gray-700 cursor-pointer px-3 py-2">Home</li>
          <li onClick={togglePopup} className="hover:bg-gray-700 cursor-pointer px-3 py-2">Pop-up</li>
          
          {/* Show Login/Register options only when not logged in */}
          {!isLoggedIn && (
            <>
              <li onClick={() => { setIsRegistering(false); toggleModal(); }} className="hover:bg-gray-700 cursor-pointer px-3 py-2">Login</li>
              <li onClick={() => { setIsRegistering(true); toggleModal(); }} className="hover:bg-gray-700 cursor-pointer px-3 py-2">Register</li>
            </>
          )}
        </ul>

        {isLoggedIn && (
          <div className="relative">
            <span className="cursor-pointer px-3 py-2" onClick={() => setDropdownOpen(!dropdownOpen)}>
              {userName} ⬇️
            </span>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded">
                <button onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-200">Logout</button>
              </div>
            )}
          </div>
        )}
      </nav>

      <section className="w-3/4 mx-auto">
        <div className="flex justify-between py-3 mt-10 bg-blue-500">
          <div className="flex flex-col px-3 text-white">
            <p>3982 Today</p>
            <p>₹2875.00</p>
          </div>
          <div className="flex gap-3 items-center text-black font-semibold px-3">
            <p>LeaderBoard</p>
            <p>👤</p>
          </div>
        </div>
        <div className="bg-gray-100">
          <div className="flex items-center justify-center gap-3 py-3">
            <button className="bg-orange-500 text-white rounded-full py-1 px-3">Daily</button>
            <button className="bg-stone-200 rounded-full py-1 px-3">Weekly</button>
            <button className="bg-stone-200 rounded-full py-1 px-3">Monthly</button>
          </div>

          <div className="flex justify-around">
          {/* // Render the sorted leaders */}
          {sortedLeaders.map((leader, index) => (
      <div key={index} className="text-center my-3">
        <div className="name">{leader.name}</div>
        <div className="points">{leader.points}</div>
        <div className="price text-orange-500">Prize: ₹{leader.prize}</div>
      </div>
    ))}   
          </div>

       {/* Dynamic Leader Entries from Context */}
{leaders
  .slice() // Create a copy to avoid mutating the original array
  .sort((a, b) => b.points - a.points) // Sort leaders by points in descending order
  // .slice(0, 3) // Get the top 3 leaders
  .map((leader, index) => (
    <div
      key={index}
      className="leader-board flex justify-between gap-11 items-center px-5 py-2 my-3 hover:bg-gray-200 cursor-pointer"
      onClick={() => handleLeaderClick(index)} // Use index for the click handler
    >
      <div className="rank flex items-center gap-3">
        <div>👤</div>
        <div className="flex flex-col">
          <p>{leader.name}</p>
          <p>Rank: {index + 1}</p> {/* Assign rank based on the index after sorting */}
        </div>
      </div>
      <div className="text-orange-500">Prize: ₹{leader.prize}</div>
      <div className="text-green-600">{leader.points}</div>
    </div>
  ))}

        </div>
      </section>
    </>
  );
}

export default App;
