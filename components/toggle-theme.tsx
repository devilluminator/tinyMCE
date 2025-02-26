"use client";

import * as React from "react";
import { Moon, Sun, Edit, Home } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className='flex justify-between items-center p-3 w-full'>
      <span className='flex justify-around items-center gap-9'>
        <Link
          href='/'
          className='flex justify-center items-center gap-1 font-bold'>
          <Home />
          Home
        </Link>
        <Link
          href='/editor'
          className='flex justify-center items-center gap-1 font-bold'>
          <Edit />
          Editor
        </Link>
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon'>
            <Sun className='w-[1.2rem] h-[1.2rem] rotate-0 dark:-rotate-90 scale-100 dark:scale-0 transition-all' />
            <Moon className='absolute w-[1.2rem] h-[1.2rem] rotate-90 dark:rotate-0 scale-0 dark:scale-100 transition-all' />
            <span className='sr-only'>Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
