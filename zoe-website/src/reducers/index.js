import{

    USER_LOGING_IN,
    USER_LOGING_IN_SUCCESS,
    USER_LOGING_IN_FAILURE,

    USER_SIGNING,
    USER_SIGNING_SUCCESS,
    USER_SIGNING_FAILURE,

    PIC_POSTING,
    PIC_POSTING_SUCCESS,
    PIC_POSTING_FAILURE,

} from '../actions/index';

const initialState = {
    userData: {},
    fetchingData: false,
    error: '',
    pictures:{}
}

const reducer = (state = initialState, action) =>{
    switch(action.type){

        //*************************USER LOGIN */
        case USER_LOGING_IN: 
            return{
                ...state,
                fetchingData: true,
            }

        case USER_LOGING_IN_SUCCESS:
            return{
                ...state,
                fetchingData: false,
                userData: action.payload,
            }

        case USER_LOGING_IN_FAILURE:
            return{
                ...state,
                fetchingData: false,
                error: action.payload
            }

        //*************************USER SIGN-UP */    
        case USER_SIGNING:
            return{
                ...state,
                fetchingData: true,
            }

        case USER_SIGNING_SUCCESS:
            return{
                ...state,
                fetchingData: false,
                userData: action.payload
            }

        case USER_SIGNING_FAILURE:
            return{
                ...state,
                fetchingData: false,
                error: action.payload
            }

        //*************************PICTURE POST */
        case PIC_POSTING: 
            return{
                ...state,
                fetchingData: true,
            }

        case PIC_POSTING_SUCCESS:
            return{
                ...state,
                fetchingData: false,
                pictures: action.payload,
            }

        case PIC_POSTING_FAILURE:
            return{
                ...state,
                fetchingData: false,
                error: action.payload
            }    

        default:
            return state
    }
}

export default reducer;
