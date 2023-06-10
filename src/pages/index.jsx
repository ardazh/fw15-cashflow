import Image from 'next/image'
import { Inter } from 'next/font/google'

import banner from '../assets/banner-2.png'
import banner3 from '../assets/banner-3.png'
import sponsor from '../assets/sponsor.png'
import profile1 from '../assets/profile1.jpg'
import profile2 from '../assets/profile2.jpg'
import profile4 from '../assets/profile4.jpg'

import {IoCallOutline, IoLockClosedOutline, IoDownloadOutline} from 'react-icons/io5'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <section className='px-[150px] py-[65px]'>
        <div className='flex justify-between mb-[140px]'>
          <div className='text-primary font-bold text-[29px]'>CashFlow</div>
          <div className='flex gap-7'>
            <div>
              <button className='btn btn-secondary font-bold normal-case border-white text-lg text-white'>Login</button>
            </div>
            <div>
              <button className='btn bg-white font-bold normal-case border-secondary hover:bg-secondary hover:text-white hover:border-white text-lg text-secondary'>Sign Up</button>
            </div>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex flex-col'>
            <div className='font-extrabold text-6xl text-[#3A3D42] mb-10'>
              Awesome App<br/>For Saving <span className='text-primary'>Time.</span>
            </div>
            <div className='text-lg text-[#3A3D42] mb-[50px]'>We bring you a mobile app for banking problems that<br/>oftenly wasting much of your times.</div>
            <div>
              <button className='btn btn-secondary text-lg normal-case text-white'>Try It Free</button>
            </div>
          </div>
          <div className='flex align-top'>
            <Image className='w-[439px] h-[846px]' src={banner} alt='banner.png' />
          </div>
        </div>
      </section>
      <section className='flex flex-col text-center bg-[#E5E5E5] px-[15px] py-[80px]'>
        <div className='flex justify-center gap-4 font-extrabold text-6xl text-[#3A3D42] mb-[30px]'><span className='text-primary'>About</span>the Application.</div>
        <div className='flex flex-col justify-center items-center text-lg text-[#3A3D42] mb-[70px]'>
          <div>We have some great features from the application and it&apos;s totally free</div>
          <div>to use by all users around the world.</div>
        </div>
        <div className='flex justify-center gap-[20px]'>
          <div className='bg-white w-[367px] h-[344px] rounded-2xl'>
            <div className='flex flex-col justify-center items-center px-[30px] py-[45px] gap-[35px]'>
              <div className='flex items-center justify-center border w-[50px] h-[50px] rounded-full bg-[#E5E5E5]'>
                <i >
                  <IoCallOutline size={30} />
                </i>
              </div>
              <div className='flex items-center justify-center text-2xl font-bold text-[#3A3D42]'>24/7 Support</div>
              <div className='flex text-center justify-center text-lg text-[#3A3D42]'>We have 24/7 contact support so you can contact us whenever you want and we will respond it.</div>
            </div>
          </div>
          <div className='bg-white w-[367px] h-[344px] rounded-2xl'>
            <div className='flex flex-col justify-center items-center px-[30px] py-[45px] gap-[35px]'>
              <div className='flex items-center justify-center border w-[50px] h-[50px] rounded-full bg-[#E5E5E5]'>
                <i >
                  <IoLockClosedOutline size={30} />
                </i>
              </div>
              <div className='flex items-center justify-center text-2xl font-bold text-[#3A3D42]'>Data Privacy</div>
              <div className='flex text-center justify-center text-lg text-[#3A3D42]'>We make sure your data is safe in our database and we will encrypt any data you submitted to us.</div>
            </div>
          </div>
          <div className='bg-white w-[367px] h-[344px] rounded-2xl'>
            <div className='flex flex-col justify-center items-center px-[30px] py-[45px] gap-[35px]'>
              <div className='flex items-center justify-center border w-[50px] h-[50px] rounded-full bg-[#E5E5E5]'>
                <i >
                  <IoDownloadOutline size={30} />
                </i>
              </div>
              <div className='flex items-center justify-center text-2xl font-bold text-[#3A3D42]'>Easy Download</div>
              <div className='flex text-center justify-center text-lg text-[#3A3D42]'>Zwallet is 100% totally free to use it&apos;s now available on Google Play Store and App Store.</div>
            </div>
          </div>
        </div>
      </section>
      <section className='flex items-center justify-center gap-[215px] px-[150px] py-[120px]'>
        <div className='flex flex-col gap-[40px]'>
          <div className='flex flex-col gap-4 font-extrabold text-6xl text-[#3A3D42]'>
            <p className='flex'>100+ <span className='text-primary'>Trusted</span></p>
            <p>Partners.</p>
          </div>
          <div className='flex text-lg text-[#3A3D42] pr-16'>We have reached global level and have 100+ brand partners around the globe.</div>
        </div>
        <div>
          <Image src={sponsor} alt='sponsor.png' />
        </div>
      </section>
      <section className='flex px-[150px] py-[80px] bg-[#E5E5E5]'>
        <div>
          <Image src={banner3} alt='banner-3.png' />
        </div>
        <div className='flex flex-col justify-center gap-[40px]'>
          <div className='flex flex-col gap-4 font-extrabold text-6xl text-[#3A3D42]'>
            <p>All The <span className='text-primary'>Great</span></p>
            <p>CashFlow Features.</p>
          </div>
          <div className='flex flex-col gap-[30px]'>
            <div className='border rounded-xl bg-white shadow-xl w-[620px] h-[127px] font-bold text-xl text-[#3A3D42] px-[25px] py-[25px]'>
              <span className='text-primary'>1.</span>&nbsp; Small Fee
              <p className='mt-[15px] font-normal text-lg'>We only charge 5% of every success transaction done in CashFlow app.</p>
            </div>
            <div className='border rounded-xl bg-white shadow-xl w-[620px] h-[127px] font-bold text-xl text-[#3A3D42] px-[25px] py-[25px]'>
              <span className='text-primary'>2.</span>&nbsp; Data Secured
              <p className='mt-[15px] font-normal text-lg'>All your data is secured properly in our system and it&apos;s encrypted.</p>
            </div>
            <div className='border rounded-xl bg-white shadow-xl w-[620px] h-[127px] font-bold text-xl text-[#3A3D42] px-[25px] py-[25px]'>
              <span className='text-primary'>3.</span>&nbsp; User Friendly
              <p className='mt-[15px] font-normal text-lg'>CashFlow come up with modern and sleek design and not complicated.</p>
          </div>
          </div>
        </div>
      </section>
      <section className='flex flex-col justify-center items-center text-[#3A3D42] px-[150px] py-[120px]'>
        <div className='font-extrabold text-6xl mb-[30px]'>What Users are <span className='text-primary'>Saying.</span></div>
        <div className='text-center justify-center text-lg mb-[70px]'>We have some great features from the application and it&apos;s totally free <br/>to use by all users around the world.</div>
        <div className='flex gap-[20px]'>
          <div className='bg-[#FFFFFF] shadow-2xl w-[367px] h-[344px] rounded-2xl'>
            <div className='flex flex-col justify-center items-center px-[30px] py-[45px] gap-[35px]'>
              <div className='flex items-center justify-center border w-[60px] h-[60px] rounded-xl overflow-hidden object-cover'>
                <Image className='' src={profile1} alt='profile1.jpg' size={60} />
              </div>
              <div className='flex items-center justify-center text-2xl font-bold'>Kim Jisoo</div>
              <div className='flex text-center justify-center text-lg'>“I use this app since 2 years ago and this is the best app that I&apos;ve ever use in my entire life”</div>
            </div>
          </div>
          <div className='bg-[#FFFFFF] shadow-2xl w-[367px] h-[344px] rounded-2xl'>
            <div className='flex flex-col justify-center items-center px-[30px] py-[45px] gap-[35px]'>
              <div className='flex items-center justify-center border w-[60px] h-[60px] rounded-xl overflow-hidden object-cover'>
                <Image className='' src={profile2} alt='profile2.jpg' size={60} />
              </div>
              <div className='flex items-center justify-center text-2xl font-bold'>Kim Jennie</div>
              <div className='flex text-center justify-center text-lg'>“I use CashFlow to manage all financial needs. It&apos;s super easy to use and it&apos;s 100% free app”</div>
            </div>
          </div>
          <div className='bg-[#FFFFFF] shadow-2xl w-[367px] h-[344px] rounded-2xl'>
            <div className='flex flex-col justify-center items-center px-[30px] py-[45px] gap-[35px]'>
              <div className='flex items-center justify-center border w-[60px] h-[60px] rounded-xl overflow-hidden object-cover'>
                <Image className='' src={profile4} alt='profile3.jpg' size={60} />
              </div>
              <div className='flex items-center justify-center text-2xl font-bold'>Park Chae Young</div>
              <div className='flex text-center justify-center text-lg'>“Since I&apos;m using this app, I&apos;m not going to move to another similar app. Thank you CashFlow!”</div>
            </div>
          </div>
        </div>
      </section>
      <section className='bg-primary text-[#EFEFEF] px-[150px] py-[80px]'>
        <div className='flex flex-col gap-[30px] border-b-2 mb-[30px]'>
          <div className='font-bold text-4xl text-white'>CashFlow</div>
          <div className='text-lg mb-[50px]'>Simplify financial needs and saving<br/> much time in banking needs with<br/> one single app.</div>
        </div>
        <div className='flex justify-between text-base'>
          <div>2023 CashFlow. All right reserved.</div>
          <div className='flex gap-[40px]'>
            <div>+62 5637 8882 9901</div>
            <div>contact@cashflow.com</div>
          </div>
        </div>
      </section>
    </main>
  )
}
