export default function Card({card, index, clickFunc}) {

    return (

        //Rendering a card and handling click events
        <div className={`card ${card.status}`} onClick={()=> clickFunc(index)}>

            <img src={card.img} alt={card.name}/>

        </div>
    )
}