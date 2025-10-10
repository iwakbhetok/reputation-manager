
import React, { useState } from 'react';
import { UserCircleIcon, ChatBubbleLeftRightIcon, BoltIcon, LinkIcon, GoogleIcon, CheckCircleIcon } from '../components/shared/Icons';
import { useAppContext } from '../context/AppContext';
import GoogleAuthButton from '../components/shared/GoogleAuthButton';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'templates':
        return <ResponseTemplates />;
      case 'automation':
        return <AutomationRules />;
      case 'integrations':
        return <IntegrationsSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto bg-white p-6 md:p-8 rounded-xl shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>
      <div className="flex border-b border-gray-200">
        <TabButton
          icon={UserCircleIcon}
          label="Profile"
          isActive={activeTab === 'profile'}
          onClick={() => setActiveTab('profile')}
        />
        <TabButton
          icon={ChatBubbleLeftRightIcon}
          label="Response Templates"
          isActive={activeTab === 'templates'}
          onClick={() => setActiveTab('templates')}
        />
        <TabButton
          icon={BoltIcon}
          label="Automation"
          isActive={activeTab === 'automation'}
          onClick={() => setActiveTab('automation')}
        />
        <TabButton
          icon={LinkIcon}
          label="Integrations"
          isActive={activeTab === 'integrations'}
          onClick={() => setActiveTab('integrations')}
        />
      </div>
      <div className="mt-8">{renderContent()}</div>
    </div>
  );
};

interface TabButtonProps {
    icon: React.ElementType;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ icon: Icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center space-x-2 px-4 py-3 -mb-px text-sm font-semibold transition-colors duration-200 border-b-2
        ${isActive ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
    >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
    </button>
);


const ProfileSettings: React.FC = () => (
  <div>
    <h2 className="text-2xl font-semibold text-gray-700 mb-4">My Profile</h2>
    <div className="space-y-4 max-w-lg">
      <input type="text" placeholder="Full Name" defaultValue="Jane Doe" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
      <input type="email" placeholder="Email Address" defaultValue="jane.doe@example.com" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
      <button className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">Save Changes</button>
    </div>
  </div>
);

const ResponseTemplates: React.FC = () => (
  <div>
    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Response Templates</h2>
    <div className="space-y-4">
        <div className="p-4 border rounded-md bg-gray-50">
            <h3 className="font-semibold">Positive Review Reply</h3>
            <p className="text-gray-600 text-sm mt-1">"Thank you so much for your kind words! We're thrilled to hear you had a great experience."</p>
        </div>
        <div className="p-4 border rounded-md bg-gray-50">
            <h3 className="font-semibold">Negative Review Apology</h3>
            <p className="text-gray-600 text-sm mt-1">"We're so sorry to hear about your experience. This is not the standard we aim for, and we'd like to make things right."</p>
        </div>
        <button className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">Add New Template</button>
    </div>
  </div>
);

const AutomationRules: React.FC = () => (
    <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Automation Rules</h2>
        <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-md bg-gray-50">
                <div>
                    <h3 className="font-semibold">Auto-thank 5★ reviews</h3>
                    <p className="text-gray-600 text-sm">Automatically reply to 5-star reviews using the 'Positive Review Reply' template.</p>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="toggle" id="toggle" defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                    <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
                <style>{`.toggle-checkbox:checked { right: 0; border-color: #4f46e5; } .toggle-checkbox:checked + .toggle-label { background-color: #4f46e5; }`}</style>
            </div>
            <button className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">Add New Rule</button>
        </div>
    </div>
);

const IntegrationsSettings: React.FC = () => {
    const { isGoogleConnected, googleUser, connectGoogle, disconnectGoogle, loadingGoogleStatus } = useAppContext();

    if (loadingGoogleStatus) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-600">Loading...</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Integrations</h2>
            <div className="max-w-2xl">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start">
                        <GoogleIcon className="h-10 w-10 mr-4" />
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800">Google Business Profile</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Connect your Google account to automatically sync reviews from your business profile.
                            </p>
                        </div>
                        <div>
                            {!isGoogleConnected ? (
                                <GoogleAuthButton>
                                    <span className="font-semibold">Connect Google</span>
                                </GoogleAuthButton>
                            ) : (
                                <button
                                    onClick={disconnectGoogle}
                                    className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-700"
                                >
                                    Disconnect
                                </button>
                            )}
                        </div>
                    </div>
                    {isGoogleConnected && googleUser && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center">
                            <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
                            <p className="text-sm text-green-800">
                                Connected as <span className="font-semibold">{googleUser.name || googleUser.email}</span> ({googleUser.email})
                            </p>
                        </div>
                    )}
                </div>
                
                {isGoogleConnected && (
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Connected Features</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start">
                                <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Automatic review synchronization from Google Business Profile</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Review response management</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Review analytics and insights</span>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};


export default SettingsPage;
