const InitialState = []

const Reducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'MYDEBIT':
            var list = [...state];
            list = [...action.payload];
            // console.log("result: ",list);
            return list;
        case 'ADDDEBIT':
            var list = [...state];
            list.push(action.payload);
            console.log("result: ", list);
            return list;
        case 'NOTIFYDEBIT':
            var list = [...state];
            var index = list.findIndex(l=>l.Id===action.payload.Id)
            list[index]={
                ...list[index],
                Done:action.payload.Done,
                Reason:action.payload.Reason
            }
            return list;
        case 'DELETEDEBIT':
            var list = [...state];
            var index = list.findIndex(l=>l.Id===action.payload.Id)
            list.splice(index,1);
            console.log("result: ", list);
            return list;
        case 'DONEDEBIT':
            var list = [...state];
            // console.log("Id: ",action.payload.Id)
            var index = list.findIndex(l=>l.Id===action.payload.Id)
            list[index]={
                ...list[index],
                Done:1
            }
            // console.log("result: ", list);
            return list;
        default: return [...state];
    }
}
export default Reducer;