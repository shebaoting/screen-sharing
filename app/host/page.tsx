"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Monitor, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Peer from "peerjs";
import { useEffect, useState } from "react";
import { ShareOptions } from "./_components/ShareOptions";

export default function HostPage() {
    const [roomId, setRoomId] = useState("");
    const [peer, setPeer] = useState<Peer | null>(null);
    const [activeStream, setActiveStream] = useState<MediaStream | null>(null);
    const [connections, setConnections] = useState<string[]>([]);
    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        try {
            const newPeer = new Peer({ debug: 2 });
            setPeer(newPeer);

            newPeer.on("open", (id) => {
                setRoomId(id);
            });

            newPeer.on("connection", (connection) => {
                setConnections((prev) => [...prev, connection.peer]);

                connection.on("close", () => {
                    setConnections((prev) => prev.filter((peerId) => peerId !== connection.peer));
                });
            });

            return () => {
                newPeer.destroy();
            };
        } catch (error) {
            console.error("Error initializing peer:", error);
        }
    }, []);

    useEffect(() => {
        if (!peer) return;

        if (!activeStream) {
            if (connections.length > 0) {
                toast({
                    title: "已连接新查看器",
                    description: "点击开始共享屏幕。",
                    duration: Infinity,
                    action: (
                        <ToastAction
                            altText="开始共享"
                            onClick={async () => {
                                try {
                                    const stream = await navigator.mediaDevices.getDisplayMedia({
                                        video: true,
                                        audio: true
                                    });
                                    setActiveStream(stream);
                                } catch (err) {
                                    console.error("屏幕共享错误:", err);
                                    toast({
                                        title: "屏幕共享错误",
                                        description: "无法开始屏幕共享。请重试。",
                                        variant: "destructive"
                                    });
                                }
                            }}>
                            开始共享
                        </ToastAction>
                    )
                });
            }
        } else {
            connections.forEach((connection) => {
                const call = peer.call(connection, activeStream);

                activeStream.getTracks()[0].onended = () => {
                    call.close();
                    activeStream.getTracks().forEach((track) => track.stop());
                };
            });
        }
    }, [peer, toast, activeStream, connections]);

    function endSession() {
        if (activeStream) {
            activeStream.getTracks().forEach((track) => track.stop());
            setActiveStream(null);
        }

        if (peer) {
            peer.destroy();
            setPeer(null);
        }

        setConnections([]);
        setRoomId("");

        toast({
            title: "Session ended",
            description: "Your screen sharing session has been terminated."
        });

        router.push("/");
    }

    return (
        <div className="py-8 px-4">
            <div className="max-w-2xl mx-auto space-y-8">
                <Button variant="outline" asChild>
                    <Link href="/" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        返回首页
                    </Link>
                </Button>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Monitor className="h-6 w-6" />
                            您的屏幕共享房间
                        </CardTitle>
                        <CardDescription>分享您的房间代码或链接，以便他人查看您的屏幕。若要共享音频，请确保您正在使用 Chrome 或 Edge，并选择共享标签页的选项。</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <ShareOptions roomId={roomId} />

                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-gray-500" />
                                <span className="text-sm text-gray-500">当前观众</span>
                            </div>
                            <span className="text-lg font-semibold">{connections.length}</span>
                        </div>

                        {activeStream && (
                            <div className="flex justify-end pt-4">
                                <Button variant="destructive" onClick={endSession} className="flex items-center gap-2">
                                    停止共享
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
