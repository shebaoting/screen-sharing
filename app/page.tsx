import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">立即分享您的屏幕</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">创建房间，分享代码，几秒钟内开始向您的观众展示。</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-12">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Monitor className="h-6 w-6" />
                                开始分享
                            </CardTitle>
                            <CardDescription>创建一个房间并与他人共享您的屏幕</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href="/host">
                                <Button className="w-full">创建房间</Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-6 w-6" />
                                加入房间
                            </CardTitle>
                            <CardDescription>输入房间代码以查看某人的屏幕</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href="/join">
                                <Button variant="outline" className="w-full">
                                    加入房间
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
