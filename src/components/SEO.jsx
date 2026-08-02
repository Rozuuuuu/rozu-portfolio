import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, path, image }) => {
    const siteUrl = 'https://lloydrosales.com';
    const fullUrl = `${siteUrl}${path}`;
    const imageUrl = `${siteUrl}${image || '/og-image.png'}`;

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook / LinkedIn */}
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Lloyd C. Rosales" />
            <meta property="og:locale" content="en_US" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:image:secure_url" content={imageUrl} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={title} />

            {/* Twitter / X */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />
            <meta name="twitter:image:alt" content={title} />
        </Helmet>
    );
};

export default SEO;
