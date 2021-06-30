const substring = '/articles/';

const setDisqus = () => {
    const { pathname } = window.location;
    const isArticle = pathname.includes(substring) && pathname.length > substring.length;
    
}