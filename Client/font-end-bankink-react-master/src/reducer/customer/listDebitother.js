const InitialState = []

const Reducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'DEBITOTHER':
            var list = [...state];
            list = [...action.payload];
            // console.log("result: ",list);
            return list;
        case 'DELETEDEBIT':
            var list = [...state];
            var index = list.findIndex(l=>l.Id===action.payload.Id)
            list.splice(index,1);
            console.log("result: ", list);
            return list;
        default: return [...state];
    }
}
export default Reducer;