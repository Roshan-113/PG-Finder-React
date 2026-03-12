import { useState } from 'react';
import { Mail, Phone, MapPin, Building2 } from 'lucide-react';

// Improved approval workflow with quick actions - Day 2
export function Approvals() {
  const [pendingOwners, setPendingOwners] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      location: 'Bangalore, Karnataka',
      pgCount: 2,
      submittedDate: '2026-02-05',
      documents: ['Aadhar Card', 'PAN Card', 'Property Documents'],
      status: 'pending',
      experience: '5 years',
      propertyType: 'PG & Hostel'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 87654 32109',
      location: 'Mumbai, Maharashtra',
      pgCount: 1,
      submittedDate: '2026-02-06',
      documents: ['Aadhar Card', 'Property License'],
      status: 'pending',
      experience: '3 years',
      propertyType: 'Girls Hostel'
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit.patel@email.com',
      phone: '+91 76543 21098',
      location: 'Pune, Maharashtra',
      pgCount: 3,
      submittedDate: '2026-02-07',
      documents: ['Aadhar Card', 'PAN Card', 'GST Certificate', 'Property Documents'],
      status: 'pending',
      experience: '8 years',
      propertyType: 'Co-living Spaces'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const handleApprove = (id) => {
    setPendingOwners(pendingOwners.map(owner => 
      owner.id === id ? { ...owner, status: 'approved' } : owner
    ));
  };

  const handleReject = (id) => {
    setPendingOwners(pendingOwners.map(owner => 
      owner.id === id ? { ...owner, status: 'rejected' } : owner
    ));
  };

  const filteredOwners = filter === 'all' 
    ? pendingOwners 
    : pendingOwners.filter(owner => owner.status === filter);

  const stats = {
    pending: pendingOwners.filter(o => o.status === 'pending').length,
    approved: pendingOwners.filter(o => o.status === 'approved').length,
    rejected: pendingOwners.filter(o => o.status === 'rejected').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Owner Approvals</h1>
        <p className="text-gray-600 mt-1">Review and approve new PG owner registrations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 border border-gray-200 rounded">
          <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
          <div className="text-sm text-gray-600">Pending Approvals</div>
        </div>

        <div className="bg-white p-4 border border-gray-200 rounded">
          <div className="text-2xl font-bold text-gray-900">{stats.approved}</div>
          <div className="text-sm text-gray-600">Approved Today</div>
        </div>

        <div className="bg-white p-4 border border-gray-200 rounded">
          <div className="text-2xl font-bold text-gray-900">{stats.rejected}</div>
          <div className="text-sm text-gray-600">Rejected</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-3 border border-gray-200 rounded">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm font-medium ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({pendingOwners.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 text-sm font-medium ${
              filter === 'pending'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending ({stats.pending})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 text-sm font-medium ${
              filter === 'approved'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Approved ({stats.approved})
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-4 py-2 text-sm font-medium ${
              filter === 'rejected'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Rejected ({stats.rejected})
          </button>
        </div>
      </div>

      {/* Owner Applications List */}
      <div className="space-y-4">
        {filteredOwners.length === 0 ? (
          <div className="bg-white p-8 text-center border border-gray-200 rounded">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-600">There are no {filter === 'all' ? '' : filter} owner applications at the moment.</p>
          </div>
        ) : (
          filteredOwners.map((owner) => (
            <div key={owner.id} className="bg-white p-6 border border-gray-200 rounded">
              <div className="flex items-start gap-6">
                {/* Owner Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{owner.name}</h3>
                        <span className={`px-2 py-1 text-xs font-semibold ${
                          owner.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                          owner.status === 'approved' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {owner.status.charAt(0).toUpperCase() + owner.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Submitted on {new Date(owner.submittedDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Contact Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="text-gray-500" size={16} />
                      <span className="text-gray-700">{owner.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="text-gray-500" size={16} />
                      <span className="text-gray-700">{owner.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="text-gray-500" size={16} />
                      <span className="text-gray-700">{owner.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="text-gray-500" size={16} />
                      <span className="text-gray-700">{owner.pgCount} Properties</span>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 border border-gray-200">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Experience</div>
                      <div className="text-sm font-semibold text-gray-900">{owner.experience}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Property Type</div>
                      <div className="text-sm font-semibold text-gray-900">{owner.propertyType}</div>
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2">Submitted Documents</div>
                    <div className="flex flex-wrap gap-2">
                      {owner.documents.map((doc, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs border border-gray-300"
                        >
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {owner.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(owner.id)}
                        className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 text-sm font-medium"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(owner.id)}
                        className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 text-sm font-medium"
                      >
                        Reject
                      </button>
                      <button className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  )}

                  {owner.status === 'approved' && (
                    <div className="text-green-600 text-sm font-medium">
                      Owner has been approved and notified
                    </div>
                  )}

                  {owner.status === 'rejected' && (
                    <div className="text-red-600 text-sm font-medium">
                      Application has been rejected
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
