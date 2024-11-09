import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from "react-icons/fa";
import { Sign,RSign } from '@/components/features/sign';

export default function Home() {
  return (
    <main className="bg-[#FF9D00] h-screen flex items-center justify-center p-10">
      <div className="grid w-full h-full grid-cols-1 bg-white box-anim md:grid-cols-2">
        <div className="bg-white text-black flex items-center justify-center flex-col">
          <div className="my-4">
          </div>
          <div><Sign/></div>
        </div>
        <div className="relative hidden md:block">
        <div><RSign/></div>
        </div>
      </div>
    </main>
  );
}