import React from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useBookmarkStore } from '../store/bookmarks';

const BookmarkButton = ({ article, className = "" }) => {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();
  const bookmarked = isBookmarked(article.id);

  const handleBookmark = (e) => {
    e.stopPropagation();
    if (bookmarked) {
      removeBookmark(article.id);
    } else {
      addBookmark(article);
    }
  };

  return (
    <button
      onClick={handleBookmark}
      className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
        bookmarked 
          ? 'text-purple-600 bg-purple-50 hover:bg-purple-100' 
          : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
      } ${className}`}
    >
      {bookmarked ? (
        <BookmarkCheck className="w-4 h-4 mr-1" />
      ) : (
        <Bookmark className="w-4 h-4 mr-1" />
      )}
      {bookmarked ? 'Saved' : 'Save'}
    </button>
  );
};

export default BookmarkButton;