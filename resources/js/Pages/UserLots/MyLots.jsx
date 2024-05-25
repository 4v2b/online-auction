import { Button } from "react-bootstrap";
import {PlusLg } from 'react-bootstrap-icons';
import LotPanel from "@/Components/LotPanel";
import { Link } from "@inertiajs/react";
import Navbar from "@/Components/NavBar";
import MainLayout from "@/Layouts/MainLayout";
import MenuLayout from "@/Layouts/MenuLayout";

export default function MyLots({ lots }) {

    const panels = lots?.map(el => <LotPanel lot={el} />);

    return (
        <MenuLayout>
            {panels}
            <Button href={route('lot.create')}><PlusLg style={{display:"inline"}}/> Створити</Button>
        </MenuLayout>
    );

}