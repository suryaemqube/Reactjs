// src/templates/CustomPostDetail.js
import React from 'react';
import Layout from '../components/Layout';

const CustomPostDetail = ({ pageContext }) => {
    const { post } = pageContext;
    var acf = post.digital.insightsDigitally;
    return (
        <Layout>
            <div>
                {console.log(post)}
                <h2>{post.title}</h2>
                <img src={post.featuredImage.node.mediaItemUrl} alt={post.title} />
                <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                <div>
                    <h2>ACF Fields</h2>
                    {acf.map((insight, index) => (
                        <div key={index}>
                            <h3>{insight.digitallyName}</h3>
                            <img src={insight.digitallyImage.mediaItemUrl} alt={insight.digitallyName} />
                            <p>{insight.digitallyDescription}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default CustomPostDetail;
