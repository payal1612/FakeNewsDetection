import React, { useState, useEffect } from 'react';
import { BarChart as ChartBar, Clock, Link } from 'lucide-react';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Mock profile data
    setTimeout(() => {
      setProfile({
        name: 'Demo User',
        bio: 'News verification enthusiast',
        total_analyses: 15,
        created_at: new Date().toISOString(),
        recent_searches: [
          {
            id: '1',
            title: 'Climate Change Research',
            url: 'https://example.com/climate',
            credibilityScore: 95
          },
          {
            id: '2',
            title: 'Technology Innovation',
            url: 'https://example.com/tech',
            credibilityScore: 88
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mx-auto mb-4">
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-400">
                  {profile?.name?.charAt(0).toUpperCase()}
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{profile?.name}</h1>
              <p className="text-gray-600">{profile?.bio}</p>
              <div className="mt-4 text-sm text-gray-500">
                Member since {new Date(profile?.created_at || '').toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Stats and Recent Activity */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <ChartBar className="h-6 w-6 mr-2 text-purple-600" />
                Statistics
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Total Analyses</p>
                  <p className="text-2xl font-bold">{profile?.total_analyses || 0}</p>
                </div>
                <div>
                  <p className="text-gray-600">Member Since</p>
                  <p className="text-2xl font-bold">
                    {new Date(profile?.created_at || '').toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Clock className="h-6 w-6 mr-2 text-purple-600" />
                Recent Activity
              </h2>
              <div className="space-y-4">
                {profile?.recent_searches.map((analysis) => (
                  <div key={analysis.id} className="border-b pb-4 last:border-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium line-clamp-1">{analysis.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Link className="h-4 w-4 mr-1" />
                          <span className="line-clamp-1">{analysis.url}</span>
                        </div>
                      </div>
                      <div className={`ml-4 font-semibold ${
                        analysis.credibilityScore >= 70 ? 'text-green-500' :
                        analysis.credibilityScore >= 30 ? 'text-yellow-500' :
                        'text-red-500'
                      }`}>
                        {analysis.credibilityScore}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;