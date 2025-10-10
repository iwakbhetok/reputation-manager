
import React from 'react';
import { mockUsers } from '../constants';
import type { User } from '../types';

const TeamPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Team Management</h1>
          <button className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">
            Invite Member
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockUsers.map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full" src={user.avatarUrl} alt={user.name} />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${user.role === 'Admin' ? 'bg-red-100 text-red-800' :
                          user.role === 'Responder' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</a>
                    <a href="#" className="text-red-600 hover:text-red-900">Remove</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
