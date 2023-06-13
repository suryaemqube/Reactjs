import React, { useState, useEffect } from "react"
import axios from 'axios';
// import { useSiteMetadata } from "../hooks/seo"
import { getToken } from "../hooks/token";
// import DOMPurify from "dompurify";

const WEBSITE_URL = 'https://dubaibizbuzz.emqubeweb.com/';
export const Seo = ({ title, description, pathname, children }) => {

    const [token, setToken] = useState('');
    const [html, setHTML] = useState('');

    // const { title: defaultTitle, description: defaultDescription, image, siteUrl } = useSiteMetadata()


    // Get token
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const fetchedToken = await getToken();
                setToken(fetchedToken);
            } catch (error) {

            }
        };

        fetchToken();
    }, []);

    useEffect(() => {
        // var currentUrl = window.location.href

        var currentUrl = 'https://dubaibizbuzz.emqubeweb.com/contactus/';
        axios({
            method: 'get',
            url: `${WEBSITE_URL}wp-json/yoast/v1/get_head?url=${currentUrl}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                setHTML(response.data.html);
            })
            .catch(error => console.error('Error sending email:', error));
    })

    // const cleanHtml = DOMPurify.sanitize(html, {
    //     USE_PROFILES: { html: true },
    // });
    // const seo = {
    //     title: title || defaultTitle,
    //     description: description || defaultDescription,
    //     image: `${siteUrl}${image}`,
    //     url: `${siteUrl}${pathname || ``}`,
    // }

    return (
        <>
            <script async
                dangerouslySetInnerHTML={{
                    __html: html,
                }}
            />

            {/* <title>{seo.title}</title>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />
            <link rel="pingback" href="https://dubaibizbuzz.emqubeweb.com/xmlrpc.php" />
            <link rel="icon" type="image/png" href={seo.image} />
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
            <meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" />
            <link rel="apple-touch-icon" href="apple-touch-icon.png" />
            <meta name='robots' content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />
            <link rel="canonical" href={seo.url} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:url" content={seo.url} />
            <meta property="og:site_name" content="" />
            <meta property="article:modified_time" content="2023-05-31T09:54:04+00:00" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:label1" content="Est. reading time" />
            <meta name="twitter:data1" content="1 minute" />
            <script async
                dangerouslySetInnerHTML={{
                    __html: `(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-PPFW664');`,
                }}
            /> */}
            {/* <Script>{`alert("Testing")`}</Script> */}
            {children}
        </>
    )
}