const InitialState = {}

const Reducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'eeTRANSACTION':
            let list = {...state};
            list = {...action.payload} ;
            return list;
        default: return {...state};
    }
}
export default Reducer;