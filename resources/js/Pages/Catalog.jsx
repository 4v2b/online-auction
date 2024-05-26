import LotCard from "@/Components/LotCard";
import MainLayout from "@/Layouts/MainLayout";

export default function Catalog({ lots }) {
    return (
        <MainLayout>
            {lots.map(lot => (<LotCard lot={lot}></LotCard>))}
        </MainLayout>
    )
}