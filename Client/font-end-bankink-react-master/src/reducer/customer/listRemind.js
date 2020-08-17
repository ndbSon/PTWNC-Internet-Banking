const InitialState = []

const Reducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'LISTREMIND':
            var list =[...state];
            list=[...action.payload];
            return list;
        case 'ADDREMIND':
            var list=[...state];
            list.push(action.payload);
            return list;
        case 'DELETEREMIND':
            var list=[...state];
            var index = list.findIndex(l=>l===action.payload);
            list.splice(index,1);
            return list;
        case 'UPDATEREMIND':
            var list=[...state];
            var index = list.findIndex(l=>l.Idaccount===action.payload.Idaccount);
            list[index]={...action.payload};
            console.log("list add: ",list);
            return list
        default: return [...state];
    }
}
export default Reducer;