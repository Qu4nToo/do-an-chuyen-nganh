"use client";

import { useEffect, useState } from "react";
import Enter from "@/components/features/google";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth } from '@/app/firebase/config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// Login Component
export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            
            const user = userCredential.user;
            console.log(user)
            if (user.email === "nq2018.nguyenthanhtrien210403@gmail.com") {
                alert("Đăng nhập thành công! Chuyển đến trang Admin.");
            sessionStorage.setItem("user_info", JSON.stringify(user));
            router.push('/admin');
            }else{
            await signInWithEmailAndPassword(auth, email, password);
            alert("Đăng nhập thành công!");
            router.push('/');
            }
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div>
            
            <h1 className="text-3xl text-center">ĐĂNG NHẬP</h1>
            <form onSubmit={handleLogin}>
                <Label htmlFor="email">Email của bạn</Label>
                <Input
                    className="mt-2 mb-4 bg-transparent rounded-full"
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                    className="mt-2 mb-2 bg-transparent rounded-full"
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <center>
                    <Button className="bg-gradient-to-r from-[#FFA008] to-[#FF6F00] text-white font-bold py-2 px-4 rounded" type="submit">
                        Đăng nhập
                    </Button>
                </center>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                <h6><span>Hoặc</span></h6>
               <Enter/>
            </form>
            <center>
                <p>Chưa có tài khoản ? <Link href="/register">Đăng ký</Link></p>
            </center>
        </div>
    );
}


export function Sign() {
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState(''); 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
          
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

          
            await user.updateProfile({
                displayName: displayName,  
            });

            alert("Đăng ký thành công!");
            router.push('/login');
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h1 className="text-3xl text-center">ĐĂNG KÝ</h1>
            <form onSubmit={handleRegister}>
                <Label htmlFor="displayName">Tên hiển thị</Label> 
                <Input
                    className="mt-2 mb-4 bg-transparent rounded-full"
                    type="text"
                    id="displayName"
                    placeholder="Tên hiển thị"
                    value={displayName} 
                    onChange={(e) => setDisplayName(e.target.value)} 
                />
                <Label htmlFor="email">Email của bạn</Label>
                <Input
                    className="mt-2 mb-4 bg-transparent rounded-full"
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                    className="mt-2 mb-4 bg-transparent rounded-full"
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                <Input
                    className="mt-2 mb-2 bg-transparent rounded-full"
                    type="password"
                    id="confirmPassword"
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <center>
                    <Button className="bg-gradient-to-r from-[#FFA008] to-[#FF6F00] text-white font-bold py-2 px-4 rounded" type="submit">
                        Đăng ký
                    </Button>
                </center>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            </form>
            <center>
                <p>Bạn đã có tài khoản ? <Link href="/login">Đăng nhập</Link></p>
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

