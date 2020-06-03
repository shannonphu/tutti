export function isRoomCodeSet(props) {
    let isRoomCodeSet = 
        (props.roomCode !== null)
        && (props.room.roomCode !== null);
    return isRoomCodeSet;
}

export function isUserCreated(props) {
    let user = props.user;
    let isUserCreated =  
        (user != null)
        && (user != undefined)
        && (user.playerName != null) 
        && (user.playerName != undefined);
    return (isUserCreated);
}