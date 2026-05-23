import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, path }) => {
    const siteUrl = 'https://lloydrosales.com';
    const fullUrl = `${siteUrl}${path}`;

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullUrl} />
            
            {/* Open Graph / Social Media Meta Tags */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:type" content="website" />
            
            {/* Twitter Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    );
};

export default SEO;
