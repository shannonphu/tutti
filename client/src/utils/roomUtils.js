export function isRoomCodeSet(props) {
    let isRoomCodeSet = props.match.params.roomId !== undefined 
        || (props.room !== null && props.room.code !== null);
    return isRoomCodeSet;
}

export function isUserCreated(props) {
    let user = props.user;
    let isUserCreated = ( 
        (user != null)
        && (user != undefined)
        && (user.playerName != null) 
        && (user.playerName != undefined)
    );
    return (isUserCreated);
}