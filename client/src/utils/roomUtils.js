export function isRoomCodeSet(props) {
    var isRoomCodeSet = props.match.params.roomId !== undefined 
        || (props.room !== null && props.room.code !== null);
    
    return isRoomCodeSet;
}
