import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

export const useBookmarkStore = create(
  persist(
    (set, get) => ({
      bookmarks: [],
      
      addBookmark: (article) => {
        const bookmarks = get().bookmarks;
        const exists = bookmarks.find(b => b.id === article.id || b.url === article.url);
        
        if (exists) {
          toast.error('Article already bookmarked!');
          return;
        }
        
        const newBookmark = {
          ...article,
          bookmarkedAt: new Date().toISOString(),
          id: article.id || Date.now().toString(),
        };
        
        set((state) => ({
          bookmarks: [newBookmark, ...state.bookmarks]
        }));
        
        toast.success('Article bookmarked!');
      },
      
      removeBookmark: (id) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter(bookmark => bookmark.id !== id)
        }));
        toast.success('Bookmark removed!');
      },
      
      isBookmarked: (id) => {
        return get().bookmarks.some(bookmark => bookmark.id === id);
      },
      
      clearBookmarks: () => {
        set({ bookmarks: [] });
        toast.success('All bookmarks cleared!');
      },
      
      getBookmarksByCategory: (category) => {
        return get().bookmarks.filter(bookmark => 
          bookmark.category === category || (!category && true)
        );
      },
      
      searchBookmarks: (query) => {
        const bookmarks = get().bookmarks;
        if (!query) return bookmarks;
        
        return bookmarks.filter(bookmark =>
          bookmark.title?.toLowerCase().includes(query.toLowerCase()) ||
          bookmark.description?.toLowerCase().includes(query.toLowerCase())
        );
      }
    }),
    {
      name: 'truthguard-bookmarks',
      version: 1,
    }
  )
);