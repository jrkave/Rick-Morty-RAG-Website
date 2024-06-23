import { useState, useEffect } from 'react';
import useDarkMode from '../hooks/useDarkMode';
import { FaMoon, FaSun } from 'react-icons/fa';
import { TbUfo } from 'react-icons/tb';
import { useAuth } from '../context/AuthProvider';
import { FaAngleDown } from 'react-icons/fa6';

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { isAuthorized, logout } = useAuth();

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

    // Monitors screen size and closes hamburger menu if screen size > sm
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640) {
                setMenuOpen(false);
            }
        };
    
        window.addEventListener('resize', handleResize);
    
        // Initial check
        handleResize();
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (
        <>
        <header className='bg-white dark:bg-lighter sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-2'>
            <div className='flex items-center justify-between px-4 py-2 sm:p-0'>
                <div className='flex items-center'>
                    <TbUfo className='text-green-600 dark:text-green-500 text-4xl mr-2'/>
                    <p className='text-gray-700 dark:text-zinc-100 font-semibold text-xl'>Rickipedia</p>
                </div>
                <div className='sm:hidden'>
                    <button type='button' onClick={toggleMenu} className='block text-zinc-500 dark:text-zinc-300 hover:text-zinc-300 dark:hover:text-zinc-500 focus:text-white focus:outline-none'>
                        <svg className='h-6 w-6 fill-current' viewBox='0 0 24 24'>
                            {menuOpen ? (
                                <path fillRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
                            ) : (
                                <path fillRule='evenodd' d='M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'/>
                            )}
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`px-2 pt-2 pb-4 sm:block ${menuOpen ? 'block' : 'hidden'} sm:flex sm:p-0`}>
                <a href='#' className='block px-2 py-1 font-semibold hover:bg-zinc-200 dark:hover:bg-lightest rounded-md text-green-600 dark:text-green-500 '>Home</a>
                <a href='#' className='block mt-1 px-2 py-1 font-semibold text-gray-700 hover:bg-zinc-200 dark:text-zinc-100 dark:hover:bg-lightest rounded-md sm:mt-0 sm:ml-2 hover:text-green-600 hover:dark:text-green-500'>Characters</a>
                {/* Dropdown above 'sm' sizes */}
                <div className={`${!menuOpen ? 'block' : 'hidden'} relative block mt-1 px-2 py-1 w-28 font-semibold text-gray-700 hover:bg-zinc-200 dark:text-zinc-100 dark:hover:bg-lightest rounded-md sm:mt-0 sm:ml-2 hover:text-green-600 hover:dark:text-green-500`}>
                    <button type='button' onClick={toggleDropDown}>Episodes<FaAngleDown className='inline-block ml-2 2x'/></button>
                    <div className={`absolute left-0 mt-2 px-2 py-1 pt-2 pb-2 bg-white dark:bg-lighter rounded-md ${dropdownOpen ? 'block' : 'hidden'}`}>
                        <a href='#' className='block px-2 py-1 rounded-md font-semibold text-gray-600 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-lightest hover:text-green-600 hover:dark:text-green-500'>Season 1</a>
                        <a href='#' className='block px-2 py-1 rounded-md font-semibold text-gray-600 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-lightest hover:text-green-600 hover:dark:text-green-500'>Season 2</a>
                        <a href='#' className='block px-2 py-1 rounded-md font-semibold text-gray-600 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-lightest hover:text-green-600 hover:dark:text-green-500'>Season 3</a>
                        <a href='#' className='block px-2 py-1 rounded-md font-semibold text-gray-600 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-lightest hover:text-green-600 hover:dark:text-green-500'>Season 4</a>
                        <a href='#' className='block px-2 py-1 rounded-md font-semibold text-gray-600 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-lightest hover:text-green-600 hover:dark:text-green-500'>Season 5</a>
                        <a href='#' className='block px-2 py-1 rounded-md font-semibold text-gray-600 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-lightest hover:text-green-600 hover:dark:text-green-500'>Season 6</a>
                        <a href='#' className='block px-2 py-1 rounded-md font-semibold text-gray-600 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-lightest hover:text-green-600 hover:dark:text-green-500'>Season 7</a>
                    </div>
                </div>
                {/* No dropdown for 'sm' size */}
                <div className={`${menuOpen ? 'block' : 'hidden'}`}>
                    <a href='#' className='block mt-1 px-2 py-1 font-semibold text-gray-700 hover:bg-zinc-200 dark:text-zinc-100 dark:hover:bg-lightest rounded-md sm:mt-0 sm:ml-2 hover:text-green-600 hover:dark:text-green-500'>Episodes</a>
                    <div>
                        <a href='#' className='block px-2 py-1 ml-3 rounded-md font-semibold text-gray-600 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-lightest hover:text-green-600 hover:dark:text-green-500'>Season 1</a>
                        <a href='#' className='block px-2 py-1 ml-3 rounded-md font-semibold text-gray-600 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-lightest hover:text-green-600 hover:dark:text-green-500'>Season 2</a>
                        <a href='#' className='block px-2 py-1 ml-3 rounded-md font-semibold text-gray-600 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-lightest hover:text-green-600 hover:dark:text-green-500'>Season 3</a>
                        <a href='#' className='block px-2 py-1 ml-3 rounded-md font-semibold text-gray-600 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-lightest hover:text-green-600 hover:dark:text-green-500'>Season 4</a>
                        <a href='#' className='block px-2 py-1 ml-3 rounded-md font-semibold text-gray-600 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-lightest hover:text-green-600 hover:dark:text-green-500'>Season 5</a>
                        <a href='#' className='block px-2 py-1 ml-3 rounded-md font-semibold text-gray-600 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-lightest hover:text-green-600 hover:dark:text-green-500'>Season 6</a>
                        <a href='#' className='block px-2 py-1 ml-3 rounded-md font-semibold text-gray-600 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-lightest hover:text-green-600 hover:dark:text-green-500'>Season 7</a>
                    </div>
                </div>
                {isAuthorized ? 
                    <a href='#' onClick={logout} className='block mt-1 px-2 py-1 font-semibold text-gray-700 hover:bg-zinc-200 dark:text-zinc-100 dark:hover:bg-lightest rounded-md sm:mt-0 sm:ml-2 hover:text-green-600 hover:dark:text-green-500'>Logout</a> :
                    <a href='#' className='block mt-1 px-2 py-1 font-semibold text-gray-700 hover:bg-zinc-200 dark:text-zinc-100 dark:hover:bg-lightest rounded-md sm:mt-0 sm:ml-2 hover:text-green-600 hover:dark:text-green-500'>Login</a> 
                }
                <ThemeIcon />
            </div>
        </header>
        </>
    );
};

const ThemeIcon = () => {
    const [darkTheme, setDarkTheme] = useDarkMode();
    const handleMode = () => setDarkTheme(!darkTheme);
    return (
        <span 
            onClick={handleMode}
            className={`flex items-center mt-1 px-2 py-1 cursor-pointer sm:mt-0 sm:ml-2 rounded-full transition-shadow duration-300 ${darkTheme ? 'hover:shadow-aura-light' : 'hover:shadow-aura-dark'}`}
        >
            {darkTheme ? (
                <FaSun size='24' className='text-zinc-100' />
            ) : (
                <FaMoon size='24' className='text-zinc-700' />
            )}
        </span>
    );
};

export default NavBar;
