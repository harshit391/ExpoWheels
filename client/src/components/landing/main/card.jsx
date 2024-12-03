const Card = ({item}) =>
{
    return (
        <div className="">
            <img src={item.image} alt="card-img" />
            <div className="card-body">
                <h2>{item.name}</h2>
                <p>{item.price}</p>
            </div>
        </div>
    )
}

export default Card;