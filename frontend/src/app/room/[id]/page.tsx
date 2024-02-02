'use client'
import Chat from "@/components/Chat";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SocketContext } from "@/context/SocketContext";
import { useContext, useEffect, useRef } from "react";

export default function Room({ params }: { params: { id: string } }) {
    const { socket } = useContext(SocketContext);
    const localStream = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        socket?.on('connect', async () => {
            console.log('conectado');
            socket?.emit('subscribe', {
                roomId: params.id,
                socketId: socket.id,
            });
            await initCamera();
        });
    }, [socket]);

    const initCamera = async () => {
        const video = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: {
                noiseSuppression: true,
                echoCancellation: true,
            },
        });
        if (localStream.current) localStream.current.srcObject = video;
    };
    return (
        <div className="h-screen">
            <Header />
            <div className="flex h-[70%]">
                <div className="md:w-[85%] w-full m-3">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-8">

                        <div className="bg-gray-950 w-full rounded-md h-full p-2 relative">
                            <video className="h-full" ref={localStream} autoPlay playsInline />
                            <span className="absolute bottom-3">Matheus Maciel</span>
                        </div>

                        <div className="bg-gray-950 w-full rounded-md h-full p-2 relative">
                            <video className="h-full"></video>
                            <span className="absolute bottom-3">Ana Luisa</span>
                        </div>

                        <div className="bg-gray-950 w-full rounded-md h-full p-2 relative">
                            <video className="h-full"></video>
                            <span className="absolute bottom-3">Raul Santos</span>
                        </div>

                        <div className="bg-gray-950 w-full rounded-md h-full p-2 relative">
                            <video className="h-full"></video>
                            <span className="absolute bottom-3">Gabriel Luz</span>
                        </div>

                        <div className="bg-gray-950 w-full rounded-md h-full p-2 relative">
                            <video className="h-full"></video>
                            <span className="absolute bottom-3">Sebastian Fonsceca</span>
                        </div>

                    </div>
                </div>
                <Chat roomId={params.id} />
            </div>
            <Footer />
        </div>
    );
};