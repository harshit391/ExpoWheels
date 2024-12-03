import { Link } from "react-router-dom";

const NotFound = () =>
{
    return (
        <div
        style={{
            fontFamily: "SuperBrigadeTitle",
            letterSpacing: "-0.1rem",
        }}
         className="flex w-full min-h-screen justify-center flex-col gap-4 items-center">
            <h1 className="text-4xl text-center font-bold uppercase">404 Page Not Found</h1>
            <Link className="bg-black text-white rounded px-4 py-2" to='/'>Go to Home Page</Link>
        </div>
    );
}

export default NotFound;