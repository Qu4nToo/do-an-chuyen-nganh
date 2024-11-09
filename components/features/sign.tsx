import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from "react-icons/fa";

export function Login() {
    return (
        <div>
            <h1 className="text-3xl text-center">ĐĂNG NHẬP</h1>

            <form>
                <Label htmlFor="username">Username*</Label>
                <Input
                    className="mt-2 mb-4 bg-transparent rounded-full"
                    type="text"
                    id="username"
                    placeholder="username"
                />
                <Label htmlFor="password">Password*</Label>
                <Input
                    className="mt-2 bg-transparent rounded-full"
                    type="password"
                    id="password"
                    placeholder="password"
                />
                <br />
                <center>
                    <Button className="bg-gradient-to-r from-[#FFA008] to-[#FF6F00] text-white font-bold py-2 px-4 rounded">
                        Đăng nhập
                    </Button>
                </center>
                <br />
                <h6><span>Hoặc</span></h6>
                <Button
                    className="flex items-center w-full gap-4 px-12 mb-4 bg-transparent rounded-full"
                    variant="outline"
                >
                    <FcGoogle size="25" />
                    Sign In With Google
                </Button>
                <Button
                    className="flex items-center w-full gap-4 px-12 mb-4 bg-transparent rounded-full"
                    variant="outline"
                >
                    <FaFacebook size="25" />
                    Sign In With Facebook
                </Button>
            </form>
            <center>
                <p>Chưa có tài khoản ? <Link href="/register">Đăng ký</Link></p>
                <p className="mt-4 text-xs text-slate-500">
                @2023 All rights reserved
            </p>
            
            </center>
            
        </div>

    );
}

export function RSign() {
    return (
            <Image
                className="object-cover"
                fill={true}
                src="/loginimg.jpg"
                alt="bg-image"
            />
    );
}
export function Sign() {
    return (
        <div>
            <h1 className="text-3xl text-center">ĐĂNG KÝ</h1>

            <form>
                <Label htmlFor="username">Your email*</Label>
                <Input
                    className="mt-2 mb-4 bg-transparent rounded-full"
                    type="text"
                    id="username"
                    placeholder="username"
                />
                <Label htmlFor="password">Password*</Label>
                <Input
                    className="mt-2 mb-4 bg-transparent rounded-full"
                    type="password"
                    id="password"
                    placeholder="password"
                />
                 <Label htmlFor="password">Repeat password*</Label>
                <Input
                    className="mt-2 bg-transparent rounded-full"
                    type="password"
                    id="password"
                    placeholder="Repeat password"
                />
                <br />
                <center>
                    <Button className="bg-gradient-to-r from-[#FFA008] to-[#FF6F00] text-white font-bold py-2 px-4 rounded">
                        Đăng ký
                    </Button>
                </center>
                <br />
                <h6><span>Hoặc</span></h6>
                <Button
                    className="flex items-center w-full gap-4 px-12 mb-4 bg-transparent rounded-full"
                    variant="outline"
                >
                    <FcGoogle size="25" />
                    Sign In With Google
                </Button>
                <Button
                    className="flex items-center w-full gap-4 px-12 mb-4 bg-transparent rounded-full"
                    variant="outline"
                >
                    <FaFacebook size="25" />
                    Sign In With Facebook
                </Button>
            </form>
            <center>
                <p>Bạn đã có tài khoản ? <Link href="/login">Đăng nhập</Link></p>
                <p className="mt-4 text-xs text-slate-500">
                @2023 All rights reserved
            </p>
            
            </center>
            
        </div>

    );
}
