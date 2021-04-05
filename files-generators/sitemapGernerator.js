// create sitemap.xml
module.exports.siteMap = async (axios) => {
  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/posts'
  );

  const currentDate = new Date(Date.now()).toISOString();

  return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset
            xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
      <url>
        <loc>https://jsonplaceholder.typicode.com/</loc>
        <lastmod>${currentDate}</lastmod>
        <priority>1.00</priority>
      </url>

      
      ${data
        .map(
          (post) => `
        <url>
          <loc>https://jsonplaceholder.typicode.com/posts/${post.id}</loc>
          <lastmod>${currentDate}</lastmod>
          <priority>1.00</priority>
        </url>`
        )
        .join(' ')}
      
      </urlset>
          `;
};
