import NavListElement from "@/components/Layout/Header/Navbar/NavListElement"
import { Search, CircleUserRound, LogIn, Power, Plus } from "lucide-react"

const NavList = () => {
    return (
        <ul className="flex items-center gap-3">
            <NavListElement icon={Search} href="#">Search</NavListElement>
            <NavListElement icon={CircleUserRound} href="#">Auth related stuff</NavListElement>
            <NavListElement highlighted icon={Plus} href="#" >New Post</NavListElement>
        </ul>
    )
}

export default NavList