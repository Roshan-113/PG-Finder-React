import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { messageAPI } from '../../services/api';

export default function Messages() {
  const location = useLocation();
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const pollRef = useRef(null);
  const user = JSON.parse(localStorage.getItem('pgfinder_user') || '{}');

  useEffect(() => {
    loadConversations();
  }, []);

  // Auto-open conversation if navigated from roommate finder / PG details
  useEffect(() => {
    const { openUserId, openUserName } = location.state || {};
    if (openUserId && conversations.length >= 0 && !loading) {
      const existing = conversations.find(c => c.other_id === openUserId || String(c.other_id) === String(openUserId));
      if (existing) {
        selectConversation(existing);
      } else {
        // Create a virtual conversation entry
        const virtual = { other_id: openUserId, other_name: openUserName || 'User', last_message: '', unread_count: 0 };
        setSelected(virtual);
        loadMessages(openUserId);
      }
    }
  }, [loading, location.state]);

  const loadConversations = () => {
    messageAPI.getConversations()
      .then(r => setConversations(r.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const loadMessages = (otherId) => {
    messageAPI.getMessages(otherId)
      .then(r => {
        setMessages(r.data || []);
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      })
      .catch(() => setMessages([]));
  };

  const selectConversation = (conv) => {
    setSelected(conv);
    loadMessages(conv.other_id);
    // Poll every 5s
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = setInterval(() => loadMessages(conv.other_id), 5000);
  };

  useEffect(() => () => { if (pollRef.current) clearInterval(pollRef.current); }, []);

  const sendMessage = async () => {
    if (!text.trim() || !selected || sending) return;
    setSending(true);
    try {
      const res = await messageAPI.send({ receiverId: selected.other_id, messageText: text.trim() });
      setMessages(prev => [...prev, res.data]);
      setText('');
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      // Refresh conversations list
      loadConversations();
    } catch (err) {
      alert(err.message || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const formatTime = (ts) => {
    if (!ts) return '';
    const d = new Date(ts);
    const now = new Date();
    const diff = now - d;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
    if (diff < 86400000) return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: '#111827' }}>Messages</h1>
        <button onClick={loadConversations}
          style={{ width: '2.5rem', height: '2.5rem', border: 'none', background: 'white', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
          onMouseOver={e => { e.currentTarget.style.background = '#f3f4f6'; e.currentTarget.style.color = '#2563eb'; }}
          onMouseOut={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#6b7280'; }}>
          <i className="fas fa-sync-alt"></i>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '1.5rem', height: 'calc(100vh - 200px)', minHeight: '600px' }}>

        {/* Sidebar — Conversations */}
        <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', position: 'relative' }}>
            <i className="fas fa-search" style={{ position: 'absolute', left: '1.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}></i>
            <input type="text" placeholder="Search conversations..."
              style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
              onFocus={e => e.target.style.borderColor = '#2563eb'}
              onBlur={e => e.target.style.borderColor = '#d1d5db'} />
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {loading ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>
                <i className="fas fa-spinner fa-spin" style={{ marginRight: '0.5rem' }}></i>Loading...
              </div>
            ) : conversations.length === 0 ? (
              <div style={{ padding: '3rem 1rem', textAlign: 'center', color: '#9ca3af' }}>
                <i className="fas fa-comments" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}></i>
                <p style={{ margin: 0 }}>No conversations yet</p>
                <p style={{ margin: '0.5rem 0 0', fontSize: '0.8125rem' }}>Start messaging PG owners</p>
              </div>
            ) : conversations.map(conv => (
              <div key={conv.other_id} onClick={() => selectConversation(conv)}
                style={{ padding: '1rem', borderBottom: '1px solid #f3f4f6', cursor: 'pointer', background: selected?.other_id === conv.other_id ? '#eff6ff' : 'transparent', borderLeft: selected?.other_id === conv.other_id ? '3px solid #2563eb' : '3px solid transparent', transition: 'background 0.15s' }}
                onMouseOver={e => { if (selected?.other_id !== conv.other_id) e.currentTarget.style.background = '#f9fafb'; }}
                onMouseOut={e => { if (selected?.other_id !== conv.other_id) e.currentTarget.style.background = 'transparent'; }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: 'linear-gradient(135deg,#667eea,#764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                    <i className={conv.other_role === 'owner' ? 'fas fa-home' : 'fas fa-user'}></i>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 600, color: '#111827', fontSize: '0.9375rem' }}>
                        {conv.other_name}
                        {conv.other_role && (
                          <span style={{ fontWeight: 400, color: conv.other_role === 'owner' ? '#7c3aed' : '#0369a1', fontSize: '0.8125rem', marginLeft: '0.375rem' }}>
                            ({conv.other_role === 'owner' ? 'Owner' : conv.other_role === 'admin' ? 'Admin' : 'Tenant'})
                          </span>
                        )}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#9ca3af', flexShrink: 0, marginLeft: '0.5rem' }}>{formatTime(conv.last_time)}</span>
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{conv.last_message}</div>
                  </div>
                  {conv.unread_count > 0 && (
                    <span style={{ background: '#2563eb', color: 'white', fontSize: '0.75rem', fontWeight: 600, padding: '0.125rem 0.5rem', borderRadius: '9999px', flexShrink: 0 }}>{conv.unread_count}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {selected ? (
            <>
              {/* Chat Header */}
              <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'linear-gradient(135deg,#667eea,#764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    <i className="fas fa-user"></i>
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#111827' }}>
                      {selected.other_name}
                      {selected.other_role && (
                        <span style={{ fontWeight: 400, color: selected.other_role === 'owner' ? '#7c3aed' : '#0369a1', fontSize: '0.8125rem', marginLeft: '0.375rem' }}>
                          ({selected.other_role === 'owner' ? 'Owner' : selected.other_role === 'admin' ? 'Admin' : 'Tenant'})
                        </span>
                      )}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#10b981' }}>Active</p>
                  </div>
                </div>
                <button onClick={() => loadMessages(selected.other_id)}
                  style={{ width: '2rem', height: '2rem', border: 'none', background: '#f3f4f6', borderRadius: '0.5rem', cursor: 'pointer', color: '#6b7280' }}>
                  <i className="fas fa-sync-alt"></i>
                </button>
              </div>

              {/* Messages */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {messages.length === 0 ? (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                    <i className="fas fa-comment" style={{ fontSize: '3rem', marginBottom: '1rem', color: '#d1d5db' }}></i>
                    <p style={{ margin: 0, color: '#6b7280' }}>No messages yet</p>
                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.8125rem' }}>Start the conversation!</p>
                  </div>
                ) : messages.map((msg, i) => {
                  const isMe = msg.senderId === user.id || String(msg.senderId) === String(user.id);
                  return (
                    <div key={msg.id || i} style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start', gap: '0.75rem' }}>
                      {!isMe && (
                        <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: 'linear-gradient(135deg,#667eea,#764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.875rem', flexShrink: 0, alignSelf: 'flex-end' }}>
                          <i className="fas fa-user"></i>
                        </div>
                      )}
                      <div style={{ maxWidth: '60%' }}>
                        <div style={{ padding: '0.75rem 1rem', borderRadius: '1rem', fontSize: '0.875rem', lineHeight: 1.5, background: isMe ? '#2563eb' : '#f3f4f6', color: isMe ? 'white' : '#111827', borderBottomRightRadius: isMe ? '0.25rem' : '1rem', borderBottomLeftRadius: isMe ? '1rem' : '0.25rem' }}>
                          {msg.messageText || msg.message_text}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem', textAlign: isMe ? 'right' : 'left' }}>
                          {formatTime(msg.createdAt || msg.created_at)}
                        </div>
                      </div>
                      {isMe && (
                        <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: 'linear-gradient(135deg,#2563eb,#1d4ed8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.875rem', flexShrink: 0, alignSelf: 'flex-end' }}>
                          <i className="fas fa-user"></i>
                        </div>
                      )}
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <input type="text" value={text} onChange={e => setText(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder="Type a message..."
                  style={{ flex: 1, padding: '0.75rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#2563eb'}
                  onBlur={e => e.target.style.borderColor = '#d1d5db'} />
                <button onClick={sendMessage} disabled={sending || !text.trim()}
                  style={{ padding: '0.75rem 1.5rem', background: sending || !text.trim() ? '#93c5fd' : '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: sending || !text.trim() ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'background 0.2s' }}
                  onMouseOver={e => { if (!sending && text.trim()) e.currentTarget.style.background = '#1d4ed8'; }}
                  onMouseOut={e => { if (!sending && text.trim()) e.currentTarget.style.background = '#2563eb'; }}>
                  <i className="fas fa-paper-plane"></i> Send
                </button>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
              <i className="fas fa-comment-dots" style={{ fontSize: '4rem', marginBottom: '1rem' }}></i>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#6b7280' }}>Select a conversation</h3>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>Choose from the left to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
