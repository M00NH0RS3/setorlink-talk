'use client'
import { CamOff, CamOn, MicroOff, MicroOn, TelaOff, TelaOn, Telef } from "@/Icons";
import Container from "./Container";
import { MutableRefObject, useState } from "react";

export default function Footer({ videoMediaStream, peerConnections, localStream, logout }: {
    videoMediaStream: MediaStream;
    peerConnections: MutableRefObject<Record<string, RTCPeerConnection>>;
    localStream: MutableRefObject<HTMLVideoElement | null>;
    logout: ()=> void;
}) {
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOff, setIsCameraOff] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0') + ':';
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const toggleMuted = () => {
        videoMediaStream?.getAudioTracks().forEach((track) => {
            track.enabled = isMuted;
        })
        setIsMuted(!isMuted);

        Object.values(peerConnections.current).forEach((peerConnections) => {
            peerConnections.getSenders().forEach((sender) => {
                if (sender.track?.kind === 'audio') {
                    if (videoMediaStream?.getAudioTracks().length > 0) {
                        sender.replaceTrack(videoMediaStream?.getAudioTracks().find((track) => track.kind === 'audio') || null,);
                    }
                }
            });
        });
    };

    const toggleVideo = () => {
        videoMediaStream?.getVideoTracks().forEach((track) => {
            track.enabled = isCameraOff;
        })
        setIsCameraOff(!isCameraOff);

        Object.values(peerConnections.current).forEach((peerConnections) => {
            peerConnections.getSenders().forEach((sender) => {
                if (sender.track?.kind === 'video') {
                    sender.replaceTrack(videoMediaStream?.getVideoTracks().find((track) => track.kind === 'video') || null,);
                }
            });
        });
    };

    const toggleScreenSharing = async () => {

        if (!isScreenSharing) {
            const videoShrareScreen = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });

            if (localStream.current) localStream.current.srcObject = videoShrareScreen;

            Object.values(peerConnections.current).forEach((peerConnections) => {
                peerConnections.getSenders().forEach((sender) => {
                    if (sender.track?.kind === 'video') {
                        sender.replaceTrack(videoShrareScreen?.getVideoTracks()[0]);
                    }
                });
            });

            setIsScreenSharing(!isScreenSharing);
            return;
        }

        if (localStream.current) localStream.current.srcObject = videoMediaStream;

        Object.values(peerConnections.current).forEach((peerConnections) => {
            peerConnections.getSenders().forEach((sender) => {
                if (sender.track?.kind === 'video') {
                    sender.replaceTrack(videoMediaStream?.getVideoTracks()[0]);
                }
            });
        });
        setIsScreenSharing(!isScreenSharing);
    };

    return (
        <div className="fixed items-center bottom-0 bg-black py-6 w-full">
            <Container>

                <div className="grid grid-cols-3">
                    <div className="flex items-center">
                        <p className="text-xl">{hours}{minutes}</p>
                    </div>
                    <div className="flex space-x-6 justify-center">

                        {isMuted ? (<MicroOff className="h-12 w-16 text-white p-2 cursor-pointer bg-red-500 rounded-md" onClick={() => toggleMuted()} />) : (<MicroOn className="h-12 w-16 text-white p-2 cursor-pointer bg-gray-950 rounded-md" onClick={() => toggleMuted()} />)}

                        {isCameraOff ? (<CamOff className="h-12 w-16 text-white p-2 cursor-pointer bg-red-500 rounded-md" onClick={() => toggleVideo()} />) : (<CamOn className="h-12 w-16 text-white p-2 cursor-pointer bg-gray-950 rounded-md" onClick={() => toggleVideo()} />)}

                        {isScreenSharing ? (<TelaOff className="h-12 w-16 text-white p-2 cursor-pointer bg-red-500 rounded-md" onClick={() => toggleScreenSharing()} />) : (<TelaOn className="h-12 w-16 text-white p-2 cursor-pointer bg-gray-950 rounded-md" onClick={() => toggleScreenSharing()} />)}

                        <Telef onClick={logout} className="h-12 w-16 text-white hover:bg-red-500 p-2 cursor-pointer bg-primary rounded-md" />
                    </div>
                </div>
            </Container>
        </div>
    )
}