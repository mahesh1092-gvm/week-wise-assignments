
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../store/authStore.js';
import {
  pageBackground,
  pageWrapper,
  section,
  cardClass,
  headingClass,
  subHeadingClass,
  bodyText,
  articleGrid,
  articleCardClass,
  articleTitle,
  articleMeta,
  articleExcerpt,
  timestampClass,
  articleStatusActive,
  articleStatusDeleted,
  emptyStateClass,
  submitBtn,
  formGroup,
  labelClass,
  inputClass,
  errorClass,
  successClass,
} from '../styles/common.js';

const API_BASE = 'http://localhost:8074';

function AdminProfile() {
  const { currentUser, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAdminData = async () => {
      setError('');
      const token = localStorage.getItem('token');
      if (!token || currentUser?.role !== 'ADMIN') return;

      try {
        const [usersRes, articlesRes] = await Promise.all([
          fetch(`${API_BASE}/admin-api/users`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE}/admin-api/articles`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!usersRes.ok) {
          const errData = await usersRes.json();
          throw new Error(errData.message || 'Could not fetch users');
        }
        if (!articlesRes.ok) {
          const errData = await articlesRes.json();
          throw new Error(errData.message || 'Could not fetch articles');
        }

        const usersData = await usersRes.json();
        const articlesData = await articlesRes.json();

        setUsers(usersData.users || []);
        setArticles(articlesData.articles || []);
      } catch (err) {
        setError(err.message || 'Could not load admin data');
      }
    };

    loadAdminData();
  }, [currentUser]);

  const handleBlockArticle = async (articleId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE}/admin-api/articles/${articleId}/block`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.ok) {
        const updatedArticle = await response.json();
        setArticles(articles.map(article => 
          article._id === articleId 
            ? updatedArticle.article
            : article
        ));
        setMessage('Article blocked successfully');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to block article');
      }
    } catch (err) {
      setError(err.message || 'Could not block article');
    }
  };

  const handleActivateArticle = async (articleId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE}/admin-api/articles/${articleId}/activate`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.ok) {
        const updatedArticle = await response.json();
        setArticles(articles.map(article => 
          article._id === articleId 
            ? updatedArticle.article
            : article
        ));
        setMessage('Article activated successfully');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to activate article');
      }
    } catch (err) {
      setError(err.message || 'Could not activate article');
    }
  };

  const visibleUsers = users.filter((user) => user.role !== 'ADMIN');

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to change your password.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/admin-api/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Could not update password');
      }

      setMessage(data.message || 'Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setError(err.message || 'Could not update password');
    }
  };

  return (
    <div className={`${pageBackground} py-10`}>
      <div className={pageWrapper}>
        <div className={`mb-8 ${cardClass}`}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className={subHeadingClass}>Admin Dashboard</p>
              <h1 className={headingClass}>Welcome back, {currentUser?.firstName || 'Admin'}</h1>
            </div>
            <div className="text-right">
              <p className={bodyText}>Role: {currentUser?.role || 'ADMIN'}</p>
              <p className={bodyText}>{currentUser?.email}</p>
              <button
                onClick={handleLogout}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <section className={`${cardClass} ${section}`}>
            <h2 className={headingClass}>Admin Controls</h2>
            <p className={bodyText}>Manage users, review articles, and update your password.</p>

            <div className="mt-6 space-y-4">
              {message && <p className={successClass}>{message}</p>}
              {error && <p className={errorClass}>{error}</p>}

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className={formGroup}>
                  <label className={labelClass} htmlFor="currentPassword">Current Password</label>
                  <input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>

                <div className={formGroup}>
                  <label className={labelClass} htmlFor="newPassword">New Password</label>
                  <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                    className={inputClass}
                  />
                </div>

                <button type="submit" className={submitBtn}>
                  Update Password
                </button>
              </form>
            </div>
          </section>

          <section className={`${cardClass} ${section}`}>
            <h2 className={headingClass}>Summary</h2>
            <div className="mt-6 grid gap-4">
              <div className={`${cardClass} bg-[#f4f7fb]`}> 
                <p className={subHeadingClass}>Total Users</p>
                <p className={headingClass}>{visibleUsers.length}</p>
              </div>
              <div className={`${cardClass} bg-[#f4f7fb]`}> 
                <p className={subHeadingClass}>Total Articles</p>
                <p className={headingClass}>{articles.length}</p>
              </div>
            </div>
          </section>
        </div>

        <section className={`${cardClass} ${section} mt-8`}>
          <h2 className={headingClass}>All Users</h2>
          {visibleUsers.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleUsers.map((user) => (
                <div key={user._id} className={cardClass}>
                  <h4 className={articleTitle}>
                    {user.firstName} {user.lastName || ''}
                  </h4>
                  <p className={articleMeta}>{user.email}</p>
                  <p className={bodyText}>
                    Role: <strong>{user.role}</strong>
                  </p>
                  <p className={bodyText}>
                    Status: <span className={user.isUserActive ? articleStatusActive : articleStatusDeleted}>
                      {user.isUserActive ? 'Active' : 'Blocked'}
                    </span>
                  </p>
                  <p className={timestampClass}>
                    Joined: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className={emptyStateClass}>No users found.</p>
          )}
        </section>

        <section className={`${cardClass} ${section} mt-8`}>
          <h2 className={headingClass}>All Articles</h2>
          {articles.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <div key={article._id} className={articleCardClass}>
                  <h4 className={articleTitle}>{article.title}</h4>
                  <p className={articleMeta}>
                    Author: {article.author ? `${article.author.firstName} ${article.author.lastName || ''}`.trim() : 'Unknown'}
                  </p>
                  <p className={articleMeta}>Category: {article.category}</p>
                  <p className={bodyText}>
                    Status: <span className={article.isArticleActive ? articleStatusActive : articleStatusDeleted}>
                      {article.isArticleActive ? 'Active' : 'Inactive'}
                    </span>
                  </p>
                  <p className={timestampClass}>
                    Created: {new Date(article.createdAt).toLocaleDateString()}
                  </p>
                  <p className={articleExcerpt}>{article.content?.slice(0, 100)}...</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {article.isArticleActive ? (
                      <button
                        onClick={() => handleBlockArticle(article._id)}
                        className="bg-red-300 text-white text-sm px-3 py-2 rounded-full hover:bg-red-600 transition"
                      >
                        Block Article
                      </button>
                    ) : (
                      <button
                        onClick={() => handleActivateArticle(article._id)}
                        className="bg-green-400 text-white text-sm px-3 py-2 rounded-full hover:bg-green-600 transition"
                      >
                        Activate Article
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={emptyStateClass}>No articles found.</p>
          )}
        </section>
      </div>
    </div>
  );
}
export default AdminProfile;