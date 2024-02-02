'use client'
import { useState } from "react";
import Button from "./Button";
import Container from "./Container";
import { Input } from "./Input";
import { Join } from "./Join";
import { Create } from "./Create";

export function FormWrapper() {
    const [SelectedRoom, setSelectedRoom] = useState<'join' | 'create'>('join');
    console.log('🚀 ~ FormWrapper ~ selectedRoom:', SelectedRoom)
    const handleSelectRoom = (room: 'join' | 'create') => {
        setSelectedRoom(room)
    }
    return (
        <div className="w-full p-4 rounded-lg">
            <div className="flex items-center text-center">
                <span className={`w-1/2 p-4 rounded-t-lg cursor-pointer ${SelectedRoom === 'join' && 'text-primary bg-secondary'}`} onClick={() => handleSelectRoom('join')}>Ingressar</span>
                <span className={`w-1/2 p-4 rounded-t-lg cursor-pointer ${SelectedRoom === 'create' && 'text-primary bg-secondary'}`} onClick={() => handleSelectRoom('create')}>Nova Reunião</span>
            </div>
            <div className="bg-secondary rounded-b-lg space-y-8 p-10">
                <RoomSelector selectedRoom={SelectedRoom} />
            </div>
        </div>
    );
};

const RoomSelector = ({selectedRoom}: {selectedRoom: 'join' | 'create'}) => {
    switch (selectedRoom){
        case 'join':
            return <Join/>;
        case 'create':
            return <Create/>;
        default:
            <Join/>
    }
}