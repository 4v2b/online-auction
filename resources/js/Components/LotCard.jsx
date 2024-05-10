export default function LotCard({ id, title, currentBid, photoBlob }) {
    const currentBidLabel = 'Поточна ставка: ' + currentBid;

    return (
        <div className={"card"} onClick={()=> route(`/lot/${id}`)} >
            <img src={URL.createObjectURL(photoBlob)} class="card-img-top" alt="LotCard Preview"></img>
            <div className={"card-body"}>
                <h5 className={"card-title"}>{title}</h5>
                <h6 className={"card-subtitle mb-2 text-muted"}>{currentBidLabel}</h6>
            </div>
        </div>
    );
}