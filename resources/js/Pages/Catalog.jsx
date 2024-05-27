import LotCard from "@/Components/LotCard";
import MainLayout from "@/Layouts/MainLayout";

export default function Catalog({ lots, message }) {
    
    return (
        <MainLayout>
            <h3>{message}</h3>
            <p>Знайдено лотів: {lots ? lots.length: 0}</p>
            {lots?.map(lot => (<LotCard
                id={lot.id}
                currentBid={lot.currentBid}
                preview={lot.preview}
                title={lot.title}
                tracked={lot?.tracked}></LotCard>))}
        </MainLayout>
    )
}