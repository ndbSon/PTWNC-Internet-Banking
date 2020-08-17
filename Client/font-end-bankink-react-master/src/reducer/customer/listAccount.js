import LocalStorageService from '../../config/LocalStorageService/LocalStorageService'
const Payment = LocalStorageService.getPayment();
const InitialState = Payment != null ? Payment : {};

const Reducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'ACCOUNT':
            let list = { ...state };
            list = { ...action.payload };
            // localStorage.setItem('paymet', JSON.stringify([...list.paymet]));
            LocalStorageService.setPayment(list.paymet[0])
            return list;
        default: return { ...state };
    }
}
export default Reducer;