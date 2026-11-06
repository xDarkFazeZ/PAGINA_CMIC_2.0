// /src/queries/socialPosts.js
export const SOCIAL_POSTS_QUERY = /* groq */ `
{
  "cmicPosts": *[_type == "cmicPost"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    postUrl,
    publishedAt
  },
  "icicEvents": *[_type == "icicEvent"] | order(eventDate desc)[0...3] {
    _id,
    title,
    eventDate,
    coverImage{
      asset->{
        _id,
        url
      }
    },
    description
  }
}
`;