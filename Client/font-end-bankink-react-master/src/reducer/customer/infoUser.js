const InitialState ={
    Name:"",
    Email:"",
    Phone:"",
    Fullname:""
}

const Reducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'INFO':
            let info = { ...state };
            info = { ...action.payload };
            return info;
        default: return { ...state };
    }
}
export default Reducer;