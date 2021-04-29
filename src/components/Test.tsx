import React, {useState} from 'react';

export default function Test() {
    const [liked, setLiked] = useState(false);

    return(
        <React.Fragment>
            <button 
                onClick={() => {setLiked(!liked);}} 
                type="submit"
            >
                {liked ? 'Liked' : 'Like'}
            </button>
        </React.Fragment>
    );
}