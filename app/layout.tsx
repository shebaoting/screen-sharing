import { Clarity } from "@/components/Clarity";
import { Toaster } from "@/components/ui/toaster";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "屏幕共享-立即共享您的屏幕",
    description: "使用简单的房间代码立即与任何人共享您的屏幕。无需下载或注册。",
    keywords: "屏幕共享， webrtc，在线屏幕共享，浏览器屏幕共享，免费屏幕共享"
} satisfies Metadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main className="flex flex-col justify-between min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                    {children}
                    <footer className="py-8 px-4 text-center text-gray-500 text-sm">
                        可前往{" "}
                        <Link href="https://wyz.xyz" className="underline" target="_blank">
                            乌鸦嘴社区
                        </Link>
                        交流. 或联系客服微信 shebaoting
                    </footer>
                </main>
                <Clarity />
                <Toaster />
            </body>
        </html>
    );
}
