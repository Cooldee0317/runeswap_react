import React from 'react'
import { IoIosArrowDown, IoMdSync } from 'react-icons/io'
import ConnectButton from '../components/UI/ConnectButton'

function Swap() {
  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-81px)] pb-[200px]'>
      <div className='min-w-lg bg-white rounded-lg overflow-hidden shadow-lg px-5 py-5'>
        <div className='mb-2'>
          <div>
            <h2 className='font-bold text-[26px]'>RUNE SWAP</h2>
          </div>
        </div>
        <div className='flex bg-[#f9faf7] border-[#e3e4e5] border-[0.5px] rounded-md '>
          <div className=' px-5 py-3 border-r-[0.5px] border-[#e3e4e5]'>
            <div className='mb-2 mr-3 text-opacity-50'>
              <span>You pay</span>
            </div>
            <div className='mb-2'>
              <input
                type='text'
                className='text-[24px] rounded-md bg-transparent focus-visible:outline-none'
                placeholder='0'
              />
            </div>
            <div className='flex gap-3 '>
              <div className='px-1 rounded-md cursor-pointer border-2 border-gray-700'>
                <span>25%</span>
              </div>
              <div className='px-1 rounded-md cursor-pointer border-2 border-gray-700'>
                <span>50%</span>
              </div>
              <div className='px-1 rounded-md cursor-pointer border-2 border-gray-700'>
                <span>75%</span>
              </div>
              <div className='px-1 rounded-md cursor-pointer border-2 border-gray-700'>
                <span>100%</span>
              </div>
            </div>
          </div>
          <div className='px-5 py-3'>
            <div className='mb-2'>
              <span>Rune</span>
            </div>
            <div className='flex items-center justify-between gap-5 mb-2'>
              <div className='flex gap-3'>
                <img
                  src='https://ord-mirror.magiceden.dev/content/e79134080a83fe3e0e06ed6990c5a9b63b362313341745707a2bff7d788a1375i0'
                  className='rounded-full'
                  width='36'
                  height='36'
                  alt='rune'
                />
                <span className='text-lg'>Name</span>
              </div>
              <div>
                <IoIosArrowDown />
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center py-4'>
          <IoMdSync className='text-[36px]' />
        </div>
        <div className='flex bg-[#f9faf7] border-[#e3e4e5] border-[0.5px] rounded-md mb-12'>
          <div className=' px-5 py-3 border-r-[0.5px] border-[#e3e4e5]'>
            <div className='mb-2 mr-3 text-opacity-50'>
              <span>You receive</span>
            </div>
            <div className='mb-2'>
              <input
                type='text'
                className='text-[24px] rounded-md bg-transparent focus-visible:outline-none'
                placeholder='0'
              />
            </div>
          </div>
          <div className='px-5 py-3'>
            <div className='mb-2'>
              <span>Rune</span>
            </div>
            <div className='flex items-center justify-between gap-5 mb-2'>
              <div className='flex gap-3'>
                <img
                  src='https://ord-mirror.magiceden.dev/content/e79134080a83fe3e0e06ed6990c5a9b63b362313341745707a2bff7d788a1375i0'
                  className='rounded-full'
                  width='36'
                  height='36'
                  alt='rune'
                />
                <span className='text-lg'>Name</span>
              </div>
              <div>
                <IoIosArrowDown />
              </div>
            </div>
          </div>
        </div>
          <button className='w-full bg-[#5c6879] py-2 rounded-md px-4 rounded-lg bg-black text-[#59B200]'>Connect Wallet</button>
        </div>
      </div>
  )
}

export default Swap
