import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center pb-20 ">
      <div className="w-1/2 pb-40">
        <div className="ml-40 pr-16">
          <Image
            src={"/facebook.svg"}
            width={300}
            height={100}
            alt="Facebook Logo"
          ></Image>
          <p className="ml-8 -mt-3 text-gray-900 text-2xl">
            Facebook helps you connect and share with the people in your life.
          </p>
        </div>
      </div>

      {/* Right Side */}

      <div className="pr-16 w-1/2">
        <div className="bg-white flex flex-col pt-3 pb-6 px-4 mt-10 rounded-md w-96 drop-shadow-2xl">
          <input
            className="mt-1 border border-gray-300 rounded-md px-4 py-3.5 "
            type="text"
            placeholder="Email address or phone number"
          />
          <input
            className="mt-3 border border-gray-300 rounded-md px-4 py-3.5 "
            type="password"
            placeholder="Password"
          />

          <button className="bg-blue-600 text-white px-4 py-3.5 rounded-md mt-3 text-lg font-bold hover:bg-blue-700">
            Log in
          </button>

          <Link
            href="/forgotpassword"
            className="text-blue-600 text-center mt-4 font-light text-sm"
          >
            Forgotten password?
          </Link>

          <span className="my-3">
            <hr />
          </span>
          <a
            href="/createAccount"
            className="create-acc text-white px-4 py-3 rounded-md mt-3 text-lg font-bold text-center"
          >
            Create new account
          </a>
        </div>
        <div className="w-96 flex flex-col items-center justify-center py-3">
          <p className="text-gray-800 text-center mt-4 text-sm mb-11 text-thin">
            <a href="/createPage" className="text-black hover:underline">
              <b className="text-black">Create a page</b>
            </a>{" "}
            for a celebrity, brand or business.
          </p>
        </div>
      </div>
    </div>
  );
}
