import { useState } from 'react';
import { Search, MessageCircle, Phone, Mail, HelpCircle, Book, FileText, ChevronRight } from 'lucide-react';

// Enhanced help center with search - Day 6
export function Help() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      title: 'Booking & Payments',
      icon: Book,
      questions: [
        { q: 'How do I book a PG?', a: 'Browse PGs, select one, fill booking form, and complete payment through Razorpay.' },
        { q: 'What payment methods are accepted?', a: 'We accept all major payment methods through Razorpay including UPI, cards, and net banking.' },
        { q: 'Can I cancel my booking?', a: 'Yes, you can cancel upcoming bookings from the My Bookings page.' },
        { q: 'How do I get a refund?', a: 'Refunds are processed within 5-7 business days after cancellation approval.' }
      ]
    },
    {
      title: 'Account & Profile',
      icon: FileText,
      questions: [
        { q: 'How do I update my profile?', a: 'Go to My Profile from the menu and click Edit Profile.' },
        { q: 'How do I change my password?', a: 'Go to Settings > Security > Change Password.' },
        { q: 'I forgot my password', a: 'Click "Forgot Password" on the login page to reset it.' },
        { q: 'How do I delete my account?', a: 'Contact support to request account deletion.' }
      ]
    },
    {
      title: 'PG Search & Listings',
      icon: Search,
      questions: [
        { q: 'How do I search for PGs?', a: 'Use the Search PG page with filters for location, price, and amenities.' },
        { q: 'How do I save a PG?', a: 'Click the heart icon on any PG card to save it to your favorites.' },
        { q: 'Are the PG listings verified?', a: 'Yes, all PGs with a "Verified" badge have been checked by our team.' },
        { q: 'Can I contact the owner directly?', a: 'Yes, use the contact options on the PG details page.' }
      ]
    }
  ];

  const contactOptions = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Mon-Sat, 9 AM - 6 PM',
      value: '+91 98765 43210',
      action: 'tel:+919876543210'
    },
    {
      icon: Mail,
      title: 'Email Us',
      description: 'We reply within 24 hours',
      value: 'support@pgfinder.com',
      action: 'mailto:support@pgfinder.com'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team',
      value: 'Start Chat',
      action: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <HelpCircle className="text-blue-600" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help you?</h1>
          <p className="text-lg text-gray-600 mb-8">Search for answers or browse our help topics</p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
            </div>
          </div>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <a
                key={index}
                href={option.action}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <Icon className="text-blue-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                <p className="text-blue-600 font-medium">{option.value}</p>
              </a>
            );
          })}
        </div>

        {/* FAQ Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqCategories.map((category, catIndex) => {
              const Icon = category.icon;
              return (
                <div key={catIndex} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 flex items-center gap-3">
                    <Icon className="text-blue-600" size={24} />
                    <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {category.questions.map((item, qIndex) => (
                      <details key={qIndex} className="group">
                        <summary className="px-6 py-4 cursor-pointer hover:bg-gray-50 flex items-center justify-between">
                          <span className="font-medium text-gray-900">{item.q}</span>
                          <ChevronRight className="text-gray-400 group-open:rotate-90 transition-transform" size={20} />
                        </summary>
                        <div className="px-6 py-4 bg-gray-50 text-gray-700">
                          {item.a}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
