'use client'
import { useRef } from "react";
import Button from "./Button";
import { Input } from "./Input";
import { useRouter } from "next/navigation";

export function Create() {
    const name = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleCreateRoom = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name.current && name.current.value != "") {
            sessionStorage.setItem('username', name.current.value);
            const roomId = generateRandomString();
            console.log('🚀 ~ handlesCreateRoom ~ roomId:', roomId)
            window.location.href = `/room/${roomId}`;

        };
    };

    function generateRandomString() {
        const randomString = Math.random().toString(36).substring(2, 7);
        return randomString;
    }
    return (
        <>
            <form onSubmit={(e) => handleCreateRoom(e)} className="space-y-8">

                <Input placeholder="Seu nome" type="text" ref={name} />
                <Button title="Entrar" type="submit" />
            </form>
        </>
    );
};