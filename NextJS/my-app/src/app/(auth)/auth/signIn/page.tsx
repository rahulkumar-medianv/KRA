"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/src/redux/authSlice";
import { RootState } from "@/src/redux/store";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [user, setUser] = useState({
    userId: "",
    email: "",
    password: ""
  });

  const dispatch = useDispatch()
  const state  = useSelector((state: RootState) => state.auth)
  const router = useRouter()

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setUser((prev) => ({...prev, userId: Date.now().toString(), [name]: value}))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(!user.email || !user.password) return alert("Email & password required");
    dispatch(loginUser({email: user.email, password: user.password}) as any)
  }

  useEffect(() => {
    if (state.isAuthenticated) {

      if(state.user.role == 'user'){
router.push('/profile');
      }else if(state.user.role == 'admin'){
        router.push('/content-manager')
      }
      
    }
  }, [state.isAuthenticated, router]);

  if(state.isAuthenticated) return null

  return (
   
      <div className="flex min-h-screen  bg-white dark:bg-gray-900 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter Email Address.."
                  value={user.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Enter Your Password.."
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                style={{cursor: 'pointer'}}
                disabled={state.loading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="flex mt-10 justify-between m-2">
            <Link className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-30" href="/">Back To Home</Link>
 <p className=" text-center text-sm/6 text-gray-500 dark:text-gray-400">
            Don't have an account ?{' '}
            <Link
              href="/auth/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Register
            </Link>
          </p>
          
          </div>
        </div>
      </div>
   
  )
}