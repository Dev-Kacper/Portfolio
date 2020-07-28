
export default function reducer(state, action) {

    switch (action.type) {
        case 'SET_CURRENT_NOTE':
            return {
                ...state,
                currentNote: action.payload
            }
        case 'DELETE_NOTE':
            console.log({state,action})
            const deletedNotes = state.notes.filter(
                note => note._id !== action.payload
            )
            return {
                ...state,
                notes: deletedNotes
            }
        case 'ADD_NOTE':
            
            const addedNotes = [...state.notes, action.payload]
            return {
                ...state,
                notes: addedNotes
            }
        case 'UPDATE_NOTE':
            console.log(action.payload,state)
            const updatedNote = {
                ...state.currentNote,
                text: action.payload.value,
                title: action.payload.titleValue
            };

            const updatedNotesIndex = state.notes.findIndex(
                note => note._id === state.currentNote._id
            );

            const updatedNotes = [
                ...state.notes.slice(0, updatedNotesIndex),
                updatedNote,
                ...state.notes.slice(updatedNotesIndex + 1)
            ];

            return {
                currentNote: null,
                notes: updatedNotes
            };
        case 'GET_NOTES':
            
            return {
                ...state,
                notes: action.payload
            }
    
        default:
            return state;
    }
}