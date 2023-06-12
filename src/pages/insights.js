import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const Insights = () => {
    const [insights, setInsights] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://dubaibizbuzz.emqubeweb.com/wp-json/wp/v2/insights')

                const fetchedPosts = response.data;
                setInsights(fetchedPosts);
                console.log(fetchedPosts);
            } catch (error) {
                console.log('Error Fetching data: ', error);
            }
        };
        fetchData();

    }, []);

    return (
        <Layout>
            <div>Insights Post</div>
            <div>
                {insights.map(insight => (
                    <div key={insight.id}>
                        <Link to={`/postdetail/${insight.slug}`}>
                            <div className='text-3xl font-bold underline'>{insight.title.rendered} {'-'} {insight.acf.insights_tags}
                            </div>
                            <img src={insight.better_featured_image.source_url} alt={insight.better_featured_image.alt_text} />
                        </Link>
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export default Insights


