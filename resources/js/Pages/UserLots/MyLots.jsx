import { Button } from "react-bootstrap";
import {PlusLg } from 'react-bootstrap-icons';
import LotPanel from "@/Components/LotPanel";
import { Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";

export default function MyLots({ lots }) {

    const panels = lots?.map(el => {
        return (<LotPanel lot={el} />);
    });

    return (
        <>

            <Navbar auth={{ user: true }} categories={[]}></Navbar>

            {panels}
            <Button href={route('lot.create')}><PlusLg style={{display:"inline"}}/> Створити</Button>
        </>
    );

}