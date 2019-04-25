import { MEMBER_FETCHED } from '../Actions/Actions'
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
        referralId: '',
        ragpReferralId: '',
        paid: '',
        created_at : '',
        updated_at : '',

}
const userFetched = (state = initial, action) => {
    switch (action.type) {
        case MEMBER_FETCHED:
            return state = action.details
        default:
            return state
    }
}

export default userFetched