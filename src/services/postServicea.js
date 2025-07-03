import defaultApi from '../api/defaultApi'


export const getPostsByDealer = (dealerId) =>
    defaultApi.get(`/post/dealer/${dealerId}/posts`);

export const getPostById = (dealerId, postId) =>
    defaultApi.get(`/post/dealer/${dealerId}/posts/${postId}`);

export const searchPosts = (dealerId, text) =>
    defaultApi.get(`/post/dealer/${dealerId}/posts/search?text=${encodeURIComponent(text)}`);

export const createPost = (dealerId, formData) =>
    defaultApi.post(`/post/dealer/${dealerId}/posts`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const updatePost = (dealerId, postId, formData) =>
    defaultApi.put(`/post/dealer/${dealerId}/posts/${postId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const deletePost = (dealerId, postId) =>
    defaultApi.delete(`/post/dealer/${dealerId}/posts/${postId}`);

