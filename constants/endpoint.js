const USER_ROUTES = {
    REGISTER: '/register',
    LOGIN: '/login',
    GET_USER: '/list'
};

const POST_ROUTES = {
    CREATE: '/create',
    GET_ALL: '/getAll',
    GET_BY_ID: '/:id',
    UPDATE_BY_ID: '/:id',
    DELETE_BY_ID: '/:id',
    SEARCH: '/search',
    CREATE_COMMENT: '/createComment',
    GET_COMMENTS: '/getComments/:postId',
    CREATE_LIKE: '/createLike/:postId'
};

module.exports = {
    USER_ROUTES,
    POST_ROUTES
};