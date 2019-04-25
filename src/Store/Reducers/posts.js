import { FETCHED_POSTS } from "../Actions/Actions";

const initialState = {
    postSection: [
        {
            "id": 1,
            "title": "Introduction",
            "section": 1,
            "sub_section": 0,
            "created_at": "2019-02-05 23:00:00",
            "updated_at": "2019-02-18 23:00:00"
        },
    ],
    posts: [
        {
            "id": 1,
            "post_title": "Welcome note",
            "post_body": "",
            "post_video_link": null,
            "post_image": null,
            "post_section_id": "1",
            "created_at": "2019-02-13 23:00:00",
            "updated_at": "2019-02-13 23:00:00"
        },
    ]
}

const posts = (state = initialState, action) => {
    switch (action.type) {
        case FETCHED_POSTS:
            console.log(action.posts, 'reducer')
            return { ...action.posts }
        default:
            return state
    }
}
export default posts