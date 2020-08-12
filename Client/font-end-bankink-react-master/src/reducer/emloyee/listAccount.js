const InitialState = []

const Reducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'LISACCOUNT':
            var list = [...state];
            list = [...action.payload];
            return list;
        case 'SEARCH':
            var list = [...state];
            let tempt = list.filter(l=>{
                return l.Id.toLowerCase().indexOf(action.payload)!==-1;
            })
            return tempt;
        default: return [...state];
    }
}
export default Reducer;