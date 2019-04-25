import { USER_FETCHED } from "../Actions/Actions";

const initial = {
    id: '',
    email: '',
    surname: '',
    firstname: '',
    username: '',
    number: '',
    whatsapp: '',
    image: '',
    package: '',
    referal_id: '',
    ragp_referal_id: '',
    paid: '',
    created_at : '',
    updated_at : '',

}

const userDetails = (state = initial, action) => {
    switch (action.type) {
        case USER_FETCHED:
            return state = action.details
        default:
            return state;
    }
}

export default userDetails