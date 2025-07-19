import React, { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';
import { 
  FacebookShareButton, 
  TwitterShareButton, 
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon
} from 'react-share';
import toast from 'react-hot-toast';

const ShareButton = ({ article, analysis }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = article?.url || window.location.href;
  const shareTitle = `${article?.title} - Verified by TruthGuard`;
  const shareDescription = analysis 
    ? `Credibility Score: ${analysis.credibilityScore}% - ${analysis.explanation.substring(0, 100)}...`
    : article?.description || 'News verification powered by AI';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleShare = (platform) => {
    // Track sharing analytics here if needed
    console.log(`Shared on ${platform}:`, { article, analysis });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="flex items-center px-3 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
      >
        <Share2 className="w-4 h-4 mr-1" />
        Share
      </button>

      {showShareMenu && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border p-4 z-50 min-w-[280px]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Share Article</h3>
            <button
              onClick={() => setShowShareMenu(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4">
            <FacebookShareButton
              url={shareUrl}
              quote={shareTitle}
              hashtag="#TruthGuard"
              onShareWindowClose={() => handleShare('Facebook')}
            >
              <FacebookIcon size={40} round />
            </FacebookShareButton>

            <TwitterShareButton
              url={shareUrl}
              title={shareTitle}
              hashtags={['TruthGuard', 'FactCheck', 'NewsVerification']}
              onShareWindowClose={() => handleShare('Twitter')}
            >
              <TwitterIcon size={40} round />
            </TwitterShareButton>

            <LinkedinShareButton
              url={shareUrl}
              title={shareTitle}
              summary={shareDescription}
              onShareWindowClose={() => handleShare('LinkedIn')}
            >
              <LinkedinIcon size={40} round />
            </LinkedinShareButton>

            <WhatsappShareButton
              url={shareUrl}
              title={shareTitle}
              onShareWindowClose={() => handleShare('WhatsApp')}
            >
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>
          </div>

          <div className="border-t pt-3">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50"
              />
              <button
                onClick={handleCopyLink}
                className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;