"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { StudioSpaceLogo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "cn"
import { authClient } from "@/lib/auth-client"
import { FiChevronDown } from "react-icons/fi";
import { LuBookText } from "react-icons/lu";
import { FaArrowRightToBracket, FaClipboardList } from "react-icons/fa6";


import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IoIosAddCircleOutline } from "react-icons/io";

function NavLink({
  href,
  children,
  active = false,
  className,
  onClick,
}: {
  href: string
  children: React.ReactNode
  active?: boolean
  className?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "text-sm font-medium transition-colors hover:text-brand",
        active ? "text-brand" : "text-foreground",
        className,
      )}
    >
      {children}
    </Link>
  )
}



export function Navbar() {
  const { data: session } = authClient.useSession()

  const user = session?.user


  const handleSignout = () => {
    authClient.signOut();
  }
  const [open, setOpen] = React.useState(false)

  return (
    <header className="bg-background dark:bg-ink sticky inset-x-0 top-0 z-50 border-b border-border">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="bg-brand grid size-8 place-items-center rounded-lg text-white">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
              <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
          </span>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Studio<span className="text-brand">Space</span>
          </span>
        </Link>

        {/* Desktop nav */}


        <div className="hidden items-center gap-8 lg:flex">
          <NavLink href="/" active>
            Home
          </NavLink>
          <NavLink href="/explore-studios">Explore Studios</NavLink>
          <NavLink href="/#how-it-works">How It Works</NavLink>
          <NavLink href="/#about-us">About Us</NavLink>

        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">

          <ThemeToggle />

          {/* {
            user ? <div className="hidden items-end gap-4 lg:flex">
              <Popover >
                <PopoverTrigger render={<Button className={"cursor-pointer"} variant={"outline"}><Avatar>
                  <AvatarImage referrerPolicy="no-referrer" src={user?.image as string} />
                  <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                </Avatar>{user?.name.split(" ")[0]} <FiChevronDown />
                </Button>}>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader>
                    <p className="text-gray-300">Signed in as</p>
                    <PopoverTitle>{user?.name}</PopoverTitle>
                    <PopoverDescription>{user?.email}</PopoverDescription>

                    <Link href={"/add-new-studio"} className="my-2 flex items-center gap-1"><IoIosAddCircleOutline />
                      Add New Studio
                    </Link>

                    <Link href={"/my-listings"} className="my-2 flex items-center gap-1"><FaClipboardList />
                      My Studio Listings
                    </Link>

                    <Link href={"/my-bookings"} className="my-2 flex items-center gap-1"><LuBookText />
                      My Bookings
                    </Link>

                    <Button onClick={handleSignout} className="mr-40 cursor-pointer" variant={'destructive'}><FaArrowRightToBracket /> SignOut</Button>
                  </PopoverHeader>
                </PopoverContent>
              </Popover>
            </div> : <>
              <div className="hidden items-end gap-4 lg:flex">
                <NavLink href="/login" className="rounded-md px-3  py-2.5 text-foreground" onClick={() => setOpen(false)}>
                  Login
                </NavLink>

                <NavLink href="/registration" className="rounded-md  py-2.5 text-foreground" onClick={() => setOpen(false)}>
                  Registration
                </NavLink>
              </div>
            </>
          } */}



          {/* -----------hidden----------- */} 


          <div className="hidden items-end gap-4 lg:flex">
            <Popover >
              <PopoverTrigger render={<Button className={"cursor-pointer"} variant={"outline"}><Avatar>
                <AvatarImage referrerPolicy="no-referrer" src={user?.image as string} />
                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>{user?.name.split(" ")[0]} <FiChevronDown />
              </Button>}>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <p className="text-gray-300">Signed in as</p>
                  <PopoverTitle>{user?.name}</PopoverTitle>
                  <PopoverDescription>{user?.email}</PopoverDescription>

                  <Link href={"/add-new-studio"} className="my-2 flex items-center gap-1"><IoIosAddCircleOutline />
                    Add New Studio
                  </Link>

                  <Link href={"/my-listings"} className="my-2 flex items-center gap-1"><FaClipboardList />
                    My Studio Listings
                  </Link>

                  <Link href={"/my-bookings"} className="my-2 flex items-center gap-1"><LuBookText />
                    My Bookings
                  </Link>

                  <Button onClick={handleSignout} className="mr-40 cursor-pointer" variant={'destructive'}><FaArrowRightToBracket /> SignOut</Button>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          </div>
          <div className="hidden items-end gap-4 lg:flex">
            <NavLink href="/login" className="rounded-md px-3  py-2.5 text-foreground" onClick={() => setOpen(false)}>
              Login
            </NavLink>

            <NavLink href="/registration" className="rounded-md  py-2.5 text-foreground" onClick={() => setOpen(false)}>
              Registration
            </NavLink>
          </div>

          {/* --------------------------------- */}



          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="text-foreground inline-flex size-10 items-center justify-center rounded-lg lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 gap-0">
              <SheetHeader className="border-b border-border">
                <SheetTitle
                  render={<StudioSpaceLogo className="[&_span:last-child]:text-xl [&_span:last-child]:text-foreground" />}
                />
              </SheetHeader>
              <nav className="flex flex-col gap-1 p-4">
                <NavLink href="/" active className="rounded-md px-3 py-2.5 hover:bg-muted">
                  Home
                </NavLink>
                <NavLink href="/#about-us" className="rounded-md px-3 py-2.5 text-foreground hover:bg-muted" onClick={() => setOpen(false)}>
                  About
                </NavLink>
                <NavLink href="/explore-studios" className="rounded-md px-3 py-2.5 text-foreground hover:bg-muted" onClick={() => setOpen(false)}>
                  Explore Studios
                </NavLink>
                <NavLink href="/#how-it-works" className="rounded-md px-3 py-2.5 text-foreground hover:bg-muted" onClick={() => setOpen(false)}>
                  How It Works
                </NavLink>

                <NavLink href="/login" className="rounded-md px-3 py-2.5 text-foreground" onClick={() => setOpen(false)}>
                  Login
                </NavLink>

                <NavLink href="/registration" className="rounded-md px-3 py-2.5 text-foreground" onClick={() => setOpen(false)}>
                  Registration
                </NavLink>

                {
                  user ? <Popover >
                    <PopoverTrigger render={<Button className={"cursor-pointer"} variant={"outline"}><Avatar>
                      <AvatarImage referrerPolicy="no-referrer" src={user?.image as string} />
                      <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                    </Avatar>{user?.name.split(" ")[0]} <FiChevronDown />
                    </Button>}>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverHeader>
                        <p className="text-gray-300">Signed in as</p>
                        <PopoverTitle>{user?.name}</PopoverTitle>
                        <PopoverDescription>{user?.email}</PopoverDescription>

                        <Link href={"/add-new-studio"} className="my-2 flex items-center gap-1"><IoIosAddCircleOutline />
                          Add New Studio
                        </Link>

                        <Link href={"/my-listings"} className="my-2 flex items-center gap-1"><FaClipboardList />
                          My Studio Listings
                        </Link>

                        <Link href={"/my-bookings"} className="my-2 flex items-center gap-1"><LuBookText />
                          My Bookings
                        </Link>



                        <Button onClick={handleSignout} className="mr-40 cursor-pointer" variant={'destructive'}><FaArrowRightToBracket /> SignOut</Button>
                      </PopoverHeader>
                    </PopoverContent>
                  </Popover> : <>
                    <div className="hidden items-end gap-4 lg:flex">
                      <NavLink href="/login" className="rounded-md px-3  py-2.5 text-foreground" onClick={() => setOpen(false)}>
                        Login
                      </NavLink>

                      <NavLink href="/registration" className="rounded-md  py-2.5 text-foreground" onClick={() => setOpen(false)}>
                        Registration
                      </NavLink>
                    </div>
                  </>
                }

                <div className="mt-3 flex items-center gap-2">
                  <ThemeToggle />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
