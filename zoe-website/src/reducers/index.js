import{

    USER_LOGING_IN,
    USER_LOGING_IN_SUCCESS,
    USER_LOGING_IN_FAILURE,

    USER_SIGNING,
    USER_SIGNING_SUCCESS,
    USER_SIGNING_FAILURE,

} from '../actions/index';

const initialState = {
    userData: {},
    fetchingData: false,
    error: '',
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

        default:
            return state
    }
}

export default reducer;
