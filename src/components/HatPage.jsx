import { useParams } from "react-router";

const HatPage = () => {

    const {productName} = useParams();

    return(
        <div>
            <h1>hola ekisde</h1>
            <p>{productName}</p>
        </div>
    )
}

export  default HatPage;