import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost/wp/wp-json/wp/v2/luxury');
                const fetchedPosts = response.data;
                setPosts(fetchedPosts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Layout>
            <div>
                {posts.map(post => (
                    <div key={post.id}>Id: {post.id} {post.title.rendered}</div>
                ))}

                {/* <div>Insights Post</div> */}
                {/* <div>
                    {insights.map(insight => (
                        <div key={insight.id}>
                            <Link to={`/postdetail/${insight.slug}`}>
                                <div className='text-3xl font-bold underline'>{insight.title.rendered} - {insight.acf.insights_tags}
                                </div>
                                <img src={insight.better_featured_image.source_url} alt={insight.better_featured_image.alt_text} />
                            </Link>
                        </div>
                    ))}
                </div> */}
            </div>
        </Layout>
    );
};

export default Posts;
