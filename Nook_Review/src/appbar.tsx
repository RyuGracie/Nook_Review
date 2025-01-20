import React, { useState } from "react";
import { Link } from "react-router";
import Button from "./components/button";

export default function Appbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="flex w-full items-center bg-green-500">
      <>
        <div className="relative mx-4 flex w-full items-center justify-between">
          <div className="flex w-min grow text-nowrap p-4">
            <Link className="text-4xl font-bold text-white" to="/">
              Nook Review
            </Link>
          </div>
          <div className="flex w-full grow-0 items-center justify-between">
            <div>
              <button
                onClick={() => setOpen(!open)}
                id="navbarToggler"
                className={` ${
                  open && "navbarTogglerActive"
                } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] transition-all duration-100 ease-in hover:ring-2 hover:ring-slate-100/40 lg:hidden`}
              >
                <span className="bg-body-color relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                <span className="bg-body-color relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                <span className="bg-body-color relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
              </button>
              <nav
                id="navbarCollapse"
                className={`absolute -right-4 top-full w-full max-w-[125px] rounded-l-lg bg-white px-4 py-3 shadow lg:static lg:right-0 lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:shadow-none ${
                  !open && "hidden"
                } `}
              >
                <ul className="lg:flex lg:items-end lg:justify-end">
                  <ListItem NavLink="/#">Home</ListItem>
                  <ListItem NavLink="/islands">Islands</ListItem>
                  <ListItem NavLink="/#">About</ListItem>
                  <ListItem NavLink="/#">Blog</ListItem>
                </ul>
              </nav>
            </div>
            <div className="hidden h-min justify-end text-nowrap pr-16 sm:flex lg:pr-0">
              <Button
                to="/#" // This is a placeholder
              >
                Sign in
              </Button>

              <Button
                to="/#" // This is a placeholder
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </>
    </header>
  );
}

type ListItemProps = {
  children: React.ReactNode;
  NavLink: string;
};

function ListItem({ children, NavLink }: ListItemProps) {
  return (
    <>
      <li>
        <Button
          to={NavLink}
          className="flex p-2 font-medium text-slate-800 hover:text-orange-500 lg:ml-3 lg:inline-flex lg:px-7 lg:py-3 lg:font-semibold lg:text-white lg:hover:bg-slate-800/35 lg:hover:text-white"
        >
          {children}
        </Button>
      </li>
    </>
  );
}
