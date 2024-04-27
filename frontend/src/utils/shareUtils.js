const shareTwitter = (product) => {
    const shareText = encodeURIComponent(`${product.name} | $${product.price}\n${product.description}...\n`);
    const shareLink = encodeURIComponent(window.location.href);
    const TwitterUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareLink}`;
    window.open(TwitterUrl, '_blank');
}

const shareWhatsApp = (product) => {
    const shareText = encodeURIComponent(`${product.name} | $${product.price}\n${product.description}...\n`);
    const shareLink = encodeURIComponent(window.location.href);
    const WhatsAppUrl = `https://api.whatsapp.com/send?text=${shareText}${shareLink}`;
    window.open(WhatsAppUrl, '_blank');
}

const shareTelegram = (product) => {
    const shareText = encodeURIComponent(`${product.name} | $${product.price}\n${product.description}...`);
    const shareLink = encodeURIComponent(window.location.href);
    const TelegramUrl = `https://telegram.me/share/url?url=${shareLink}&text=${shareText}`;
    window.open(TelegramUrl, '_blank');
}

export {
    shareTwitter,
    shareWhatsApp,
    shareTelegram
};