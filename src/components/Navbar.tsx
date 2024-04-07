
import logo from "../assets/logo.png";
const Navbar = () => {
    return(
        <div className="navbar flex justify-between items-center h-14 border-b px-6">
            <div className="logo h-8">
                <img src={logo} className="object-cover h-full w-full" alt="logo" />
            </div>
            <div className="nav w-1/5">
                <ul className="flex justify-between text-sm tracking-wide text-zinc-500">
                    <li className="hover:text-black hover:underline hover:underline-offset-2 decoration-2 decoration-zinc-800">Home</li>
                    <li className="hover:text-black hover:underline hover:underline-offset-2 decoration-2 decoration-zinc-800">About</li>
                    <li className="hover:text-black hover:underline hover:underline-offset-2 decoration-2 decoration-zinc-800">Contact</li>
                </ul>
            </div>
            <div className="action space-x-4 text-sm tracking-wide">
                <button type="button" className="py-1.5 px-4 rounded border border-[#012F82]">Sign In</button>
                <button type="button" className="py-1.5 px-4 rounded bg-[#012F82] text-white">Join Now</button>
            </div>
        </div>
    )
}

export default Navbar;