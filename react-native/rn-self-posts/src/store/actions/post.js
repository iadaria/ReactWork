import { LOAD_POSTS, TOGGLE_BOOKED, REMOVE_POST, ADD_POST } from "../types";
import { DB } from "../../db";
import * as FileSystem from 'expo-file-system';
//import { DATA } from "../../data";

export const loadPosts = () => {
    return async (dispatch) => {
        const posts = await DB.getPosts();
        dispatch({
            type: LOAD_POSTS,
            payload: posts, //DATA
        });
    };
};

export const toogleBooked = (post) => async dispatch => {
    console.log(post);
    await DB.updatePost(post);

    dispatch({
        type: TOGGLE_BOOKED,
        payload: post.id,
    });
};

export const removePost = (id) => async dispatch => {
    await DB.removePost(id);
    dispatch({
        type: REMOVE_POST,
        payload: id,
    });
};

export const addPost = (post) => async (dispatch) => {
    const fileName = post.img.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
        await FileSystem.moveAsync({
            to: newPath,
            from: post.img
        });
    } catch (e) {
        console.log('Error: ', e)
    }

    const payload = {...post, img: newPath};
    const id = await DB.createPost(payload);
    payload.id = id;

    dispatch({
        type: ADD_POST,
        payload
    });
};
/* export const addPost = post => {
    return async dispatch => {
        post.id = Date.now().toString();
        return {
            type: ADD_POST,
            payload: post
        };
    };
}; */