export function isRoomCodeSet(props) {
    let isRoomCodeSet = props.match.params.roomId !== undefined 
        || (props.room !== null && props.room.code !== null);
    
    return isRoomCodeSet;
}

export function isPlayerNameSet(props) {
    let playerName = props.playerName;
    let isPlayerNameSet = ( (playerName != '') && (playerName != undefined) );
    // console.log(`isPlayerNameSet: ${isPlayerNameSet}`);
    // console.log(`playerName: ${playerName}`);
    return (isPlayerNameSet);
}