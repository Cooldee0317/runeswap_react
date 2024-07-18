import React, { useState } from 'react'
import { Fade as Hamburger } from 'hamburger-react'
import ConnectButton from '../components/UI/ConnectButton'

function Header() {
  // const currentUrl = window.location.pathname
  const [isMobile, setMobile] = useState(false)
  return (
    <div className='py-3 bg-gray-800 text-white'>
      <div className='container flex justify-between items-center mr-auto ml-auto relative'>
        <div className='hidden sm:block flex'>
          {/* <a href='/'>
            <img src='' alt='' />
          </a> */}
          <span>Runeswap</span>
        </div>
        <div
          className='text-symbol ml-2 block sm:hidden mt-[3px]'
          onClick={() => setMobile(!isMobile)}
        >
          <Hamburger />
        </div>
        <div className='hidden lg:flex'>
          <ul className='nav_list lg: flex gap-3'>
            <li className={`list_item ${true ? 'active' : ''}`}>
              <a href={'/'}>Home</a>
              <div className='flex gap-[2px]'>
                <div className='h-1 w-full bg-symbol'></div>
                <div className='w-1 h-1 bg-symbol rounded-full'></div>
              </div>
            </li>
            <li className={`list_item ${false ? 'active' : ''}`}>
              <a href={'/swap'}>Swap</a>
              <div className='flex gap-[2px]'>
                <div className='h-1 w-full bg-symbol'></div>
                <div className='w-1 h-1 bg-symbol rounded-full'></div>
              </div>
            </li>
          </ul>
        </div>
        <div className='nav_action'>
          <ConnectButton />
          <div
            className='text-symbol ml-2 hidden sm:block lg:hidden'
            onClick={() => setMobile(!isMobile)}
          >
            <Hamburger />
          </div>
        </div>
      </div>
      {isMobile === true ? (
        <div className='container mr-auto ml-auto bg-slate-400'>
          <div className='nav_bar mobile_navbar'>
            <ul className='nav_list'>
              <li
                className={`list_item ${
                  true ? 'active' : ''
                } py-2 hover:bg-slate-500 px-3`}
              >
                <a href={'/home'}>Home</a>
                <div className='flex gap-[2px]'>
                  <div className='h-1 w-full bg-symbol'></div>
                  <div className='w-1 h-1 bg-symbol rounded-full'></div>
                </div>
              </li>
              <li
                className={`list_item ${
                  false ? 'active' : ''
                } py-2 hover:bg-slate-500 px-3`}
              >
                <a href={'/home'}>Swap</a>
                <div className='flex gap-[2px]'>
                  <div className='h-1 w-full bg-symbol'></div>
                  <div className='w-1 h-1 bg-symbol rounded-full'></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Header
