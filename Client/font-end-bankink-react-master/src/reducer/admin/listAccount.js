const InitialState = []

const Reducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'adLISTACCOUNT':
            var list = [...state];
            list = [...action.payload];
            return list;
        case 'adSEARCH':
            var list = [...state];
            let tempt = list.filter(l => {
                return l.Id.toLowerCase().indexOf(action.payload) !== -1;
            })
            return tempt;
        case 'LOCKACCOUNT':
            var list = [...state];
            let locklist = list.map(l => {
                if(l.Id===action.payload){
                    let t={...l,Permission:0};
                    return t;
                }else{
                    return l;
                }
                
            })
            return locklist;
            case 'UNLOCKACCOUNT':
            var list = [...state];
            let unlocklist = list.map(l => {
                if(l.Id===action.payload){
                    let t={...l,Permission:1};
                    return t;
                }else{
                    return l;
                }
                
            })
            return unlocklist;
        default: return [...state];
    }
}
export default Reducer;