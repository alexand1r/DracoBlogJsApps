// eslint-disable-next-line
import {get, post, update} from './requester';
// import {joinTeam} from './user';

function loadPosts(callback) {
    // Request teams from db
    get('appdata', 'posts', 'kinvey')
        .then(callback);
}

function loadPostDetails(postId, onPostSuccess) {
    get('appdata', 'posts/' + postId, 'kinvey')
        .then(onPostSuccess);
}

function loadUsersDetails(postId, onUsersSuccess) {
    get('user', `?query={"post_id": "${postId}"}`, 'kinvey')
        .then(onUsersSuccess);
}

function loadTagsDetails(postId, onTagsSuccess) {
    get('appdata', `tags/?query={"post_id": "${postId}"}`, 'kinvey')
        .then(onTagsSuccess);
}

function loadCommentsDetails(postId, onCommentsSuccess) {
    get('appdata', `comments/?query={"post_id": "${postId}"}`, 'kinvey')
        .then(onCommentsSuccess);
}

function edit(postId, title, body, callback) {
    let postData = {
        title: title,
        body: body
    };
    update('appdata', 'posts/' + postId, postData, 'kinvey')
        .then(callback(true));
}

function create(title, body, callback) {
    let postData = {
        title: title,
        body: body
    };
    post('appdata', 'posts', postData, 'kinvey')
        .then(callback(true))
        .catch(callback(false));
        // .then((response) => {
        //     joinTeam(response._id, callback);
        // });
}

export {loadPosts, loadPostDetails, loadUsersDetails, loadTagsDetails, loadCommentsDetails, edit, create};