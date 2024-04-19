const shareTwitter = (product) => {
    const shareText = `${product.name} | $${product.price}\n${product.description}`;
    const TwitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(TwitterUrl, '_blank');
}

export {
    shareTwitter
};