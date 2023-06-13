// src/components/CustomPostList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomPostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    'https://dubaibizbuzz.emqubeweb.com/wp-json/wp/v2/insights'
                );
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h2>Custom Post Type List</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.slug}>
                        <a href={`/custom-post/${post.slug}`}>{post.title.rendered}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomPostList;
