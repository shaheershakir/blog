export function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }


  export function formatDate(date){
    return new Date(date).toLocaleDateString('en-US', {
        timeZone: 'UTC',
    });
  } 

  export function formatBlogPosts(posts, {
    filterOutDrafts = true,
    filterOutFuturePosts = true,
    sortByDate = true,
    limit = undefined
  } = {}) {

    const filterPosts = posts.reduce((acc, post) => {
      const {date, draft} = post.frontmatter;
      //filter out drafts if true
      if(filterOutDrafts && draft) return acc;

      //filter out future posts if true
      if(filterOutFuturePosts && new Date(date) > new Date()) return acc;
      
      //add post to array
      acc.push(post);

      return acc;
    }, []);

    //sort by date if true
    if(sortByDate) {
      filterPosts.sort((a, b) => {
        return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
      });
    } else {
      filterPosts.sort((a, b) => Math.random() - 0.5);
      };

    //limit posts if true
      if(typeof limit === 'number') {
        filterPosts: filterPosts.slice(0, limit);
      }
      return filterPosts;

  }