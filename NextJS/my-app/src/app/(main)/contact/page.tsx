"use client"
// import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useEffect, useState } from 'react'
import { Message } from '@/src/types/user';
import { sendMessage } from '@/src/api/sendMessage';
import { useRouter } from 'next/navigation';
export default function ContactPage() {
  const router = useRouter()
  const [message, setMessage] = useState<Message>({
    fname: "",
    lname: "",
    email: "",
    number: "",
    text: "",
    isagree: false
  });


  const handleChange = (e: any) => {
    const {name, value} = e.target;

    setMessage((prev) => ({...prev, [name]: value, isagree: !message.isagree}))
  }

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
     sendMessage(message);
    alert("message send successfull")

   
};
  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-gray-900">
      {/* <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-3xl "
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-288.75 dark:opacity-20"
        />
      </div> */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white">
          Contact Us
        </h2>
        <p className="mt-2 text-lg/8 text-gray-600 dark:text-gray-400">
          Aute magna irure deserunt veniam aliqua magna enim voluptate.
        </p>
      </div>
      <form onSubmit={handleSubmit} action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="fname" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
              First name
            </label>
            <div className="mt-2.5">
              <input
                id="fname"
                name="fname"
                value={message.fname}
                onChange={handleChange}
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="lname" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
              Last name
            </label>
            <div className="mt-2.5">
              <input
                id="lname"
                name="lname"
                type="text"
                value={message.lname}
                 onChange={handleChange}
                autoComplete="family-name"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
              />
            </div>
          </div>
          {/* <div className="sm:col-span-2">
            <label htmlFor="company" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
              Company
            </label>
            <div className="mt-2.5">
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
              />
            </div>
          </div> */}
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                value={message.email}
                 onChange={handleChange}
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="number" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
              Phone number
            </label>
            <div className="mt-2.5">
              <div className="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 dark:bg-white/5 dark:outline-white/10 dark:has-[input:focus-within]:outline-indigo-500">
                {/* <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country"
                    aria-label="Country"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pr-7 pl-3.5 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-transparent dark:text-gray-400 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  >
                    <option>US</option>
                    <option>CA</option>
                    <option>EU</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
                  />
                </div> */}
                <input
                  id="number"
                  name="number"
                  type="text"
                   onChange={handleChange}
                  value={message.number}
                  placeholder="+91 999 999 9999"
                  className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 dark:bg-transparent dark:text-white dark:placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="text" className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                id="text"
                name="text"
                rows={4}
                value={message.text}
                 onChange={handleChange}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                defaultValue={''}
              />
            </div>
          </div>
          <div className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <div className="group relative inline-flex w-8 shrink-0 rounded-full bg-gray-200 p-px inset-ring inset-ring-gray-900/5 outline-offset-2 outline-indigo-600 transition-colors duration-200 ease-in-out has-checked:bg-indigo-600 has-focus-visible:outline-2 dark:bg-white/5 dark:inset-ring-white/10 dark:outline-indigo-500 dark:has-checked:bg-indigo-500">
                <span className="size-4 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-3.5" />
                <input
                  id="isagree"
                  name="isagree"
                  type="checkbox"
                  value={message.isagree}
                   onChange={handleChange}
                  aria-label="Agree to policies"
                  className="absolute inset-0 size-full appearance-none focus:outline-hidden"
                />
              </div>
            </div>
            <label htmlFor="isagree" className="text-sm/6 text-gray-600 dark:text-gray-400">
              By selecting this, you agree to our{' '}
              <a href="#" className="font-semibold whitespace-nowrap text-indigo-600 dark:text-indigo-400">
                privacy policy
              </a>
              .
            </label>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
          >
            Let's talk
          </button>
        </div>
      </form>
    </div>
  )
}
