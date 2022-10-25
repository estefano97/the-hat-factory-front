import React from 'react';
import MLB from './MLB';
import NBA from './NBA';
import NFL from './NFL';

const DeportMain = (props) => {
    let deport = "";

    let deportTitle = {
        marginLeft: "2rem",
        fontSize: "2rem"
    }

    switch (props.deport) {
        case "MLB":
            deport = <MLB/>;
            break;
    
        case "NFL":
            deport = <NFL/>;
        break;

        case "NBA":
            deport = <NBA/>;
        break;

        default:
            deport = "Not Found";
        break;
    }

    return(
        <div>
            <h2 style={deportTitle}>{props.deport}</h2>
            {deport}
        </div>
    )
}

export default DeportMain;