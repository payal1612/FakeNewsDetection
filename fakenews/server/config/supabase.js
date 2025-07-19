// Mock supabase client for demo purposes
export const supabase = {
  auth: {
    getUser: async (token) => {
      return { data: { user: { id: 'demo-user', email: 'demo@example.com' } }, error: null };
    },
    signUp: async (credentials) => {
      return { data: { user: { id: 'demo-user', email: credentials.email } }, error: null };
    },
    signInWithPassword: async (credentials) => {
      return { data: { user: { id: 'demo-user', email: credentials.email } }, error: null };
    }
  },
  from: (table) => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null })
      })
    }),
    insert: () => ({
      select: () => ({
        single: async () => ({ data: { id: 'demo-id' }, error: null })
      })
    })
  })
};

export const supabaseAdmin = supabase;