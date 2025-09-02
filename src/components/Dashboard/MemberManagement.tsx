import React, { useState } from "react";
import { Plus, Mail, Phone, Calendar, Edit, Trash2, X } from "lucide-react";

interface Member {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  status: "active" | "inactive";
  created_at: string;
}

export function MemberManagement() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [members, setMembers] = useState<Member[]>([
    {
      id: "1",
      full_name: "John Doe",
      email: "john@example.com",
      phone: "+880123456789",
      status: "active",
      created_at: "2024-01-15",
    },
    {
      id: "2",
      full_name: "Jane Smith",
      email: "jane@example.com",
      phone: "+880987654321",
      status: "active",
      created_at: "2024-01-20",
    },
  ]);

  const [newMember, setNewMember] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Supabase member creation
    console.log("Adding member:", newMember);
    setShowAddForm(false);
    setNewMember({ full_name: "", email: "", phone: "", password: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
            Member Management
          </h1>
          <p className="mt-1 text-gray-600">Manage your platform members</p>
        </div>
        <button className="transition-colors duration-200 text-error hover:text-error/90">
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Add Member Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Add New Member
              </h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 transition-colors duration-200 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newMember.full_name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, full_name: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={newMember.email}
                  onChange={(e) =>
                    setNewMember({ ...newMember, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  value={newMember.phone}
                  onChange={(e) =>
                    setNewMember({ ...newMember, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={newMember.password}
                  onChange={(e) =>
                    setNewMember({ ...newMember, password: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div className="flex pt-4 space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 text-gray-700 transition-colors duration-200 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Members List */}
      <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Member
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Contact
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Joined
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {members.map((member) => (
                <tr
                  key={member.id}
                  className="transition-colors duration-150 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                          <span className="font-medium text-blue-600">
                            {member.full_name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {member.full_name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      {member.email}
                    </div>
                    {member.phone && (
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {member.phone}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        member.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(member.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 transition-colors duration-200 hover:text-blue-800">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="transition-colors duration-200 text-error hover:text-error/90">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
