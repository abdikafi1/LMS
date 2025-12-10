'use client'

import { SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import { BookOpen, Code2, LayoutDashboard, Play, Sparkles } from "lucide-react";
import { Ultra } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Logo(){
    return (
        <>
            <div className="relative">
                   <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-400 flex item-center justify-center shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/50 transition-shadow">
                             <Code2 className="w-5 h-5 text-white"/>
                   </div>
                  <div className="absolute -botton-1 -right-1 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex item-center justify-center">
                    <Play className="w-2 h-2"/>
                   </div>  
            </div>

            <div className="flex flex-col ">

                    <span className="font-bold textlg tracking-tight leading-none">AE</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] bg-zinc-500">College</span>
            </div>
        </>
    );
}

const LoughedOutLink =[
    {href:"/courses",label:"courses"},
    {href:"/pricing",label:"Pricing"},
    {href:"#testimonials",label:"Testmonials"}
]

function Header() {
    const pathname = usePathname()
    const {has} =useAuth()

    const  UltraUser =has?.({plan : "Ultra"})
    const LoughedInLink = [
        {
            href:"/dashboard",label:"dashboard",icon:LayoutDashboard
        },
        {
            href:"/dashboard/courses",label:"courses",icon:BookOpen
        },
        // each user will user what type of user has like Ultra or Needs Upgrade
        ...(UltraUser
            ?[{href:'/Pricing' ,label : "Account" ,icon:Sparkles}]
            :[{href:'/Pricing' ,label : "Upgrade" ,icon:Sparkles }]
        )
    ]
  return (
    <nav className="relative z-10 flex item-center justify-between px-6 lg:px-12 py-8 max-ww-8xl mx-auto">
            
           <div>
                 <SignedIn>
                <Link href="/dashboard">
                    <Logo />
                </Link>
            </SignedIn>
            <SignedOut>
                <Link href="/">
                    <Logo />
                </Link>
            </SignedOut>
           </div>

           <div>
            <SignedIn>
                <div>
                    {
                        LoughedInLink.map( (link)=>{

                            const Icon=link.icon;
                            const isActive = pathname === link.href ||(link.href !== "/dashboard" && pathname.startsWith(link.href))

                            return(
                                <Link href={link.href} key={link.href}>
                                    <Icon />
                                    {link.label}
                                </Link>
                            )
                    }
                    )
                }
                </div>
            </SignedIn>

            <SignedOut>
                <div>
                     {
                     LoughedOutLink.map(
                        (link)=>{
                           return ( <Link href={link.href} key={link.href} >
                                {link.label}
                            </Link>
                             )
                        }
                    )
                    }
                </div>
            </SignedOut>
           </div>
    </nav>
  )
}

export default Header
