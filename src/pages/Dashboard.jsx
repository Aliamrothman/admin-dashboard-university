import React from 'react';
import {
  CreditCard,
  PackageCheck,
  UserPlus,
  Activity,
  Target,
  BarChart2,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import useStore from '../store/useStore';

const Dashboard = () => {
  const { dashboardStats, colorTheme, colorThemes } = useStore();
  const currentTheme = colorThemes[colorTheme];

  const lineChartData = [
    { name: 'Jan', revenue: 4000, users: 240 },
    { name: 'Feb', revenue: 3000, users: 139 },
    { name: 'Mar', revenue: 2000, users: 980 },
    { name: 'Apr', revenue: 2780, users: 390 },
    { name: 'May', revenue: 1890, users: 480 },
    { name: 'Jun', revenue: 2390, users: 380 },
  ];

  const barChartData = [
    { name: 'Mon', orders: 20 },
    { name: 'Tue', orders: 35 },
    { name: 'Wed', orders: 25 },
    { name: 'Thu', orders: 40 },
    { name: 'Fri', orders: 55 },
    { name: 'Sat', orders: 30 },
    { name: 'Sun', orders: 15 },
  ];

  const StatCard = ({ icon: Icon, title, value, change, gradient }) => (
    <div className={`p-6 rounded-xl shadow-sm border border-transparent bg-gradient-to-br ${gradient}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white/90">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-sm text-white/80">
            {change >= 0 ? '+' : ''}
            {change}% vs last month
          </p>
        </div>
        <div className="p-3 rounded-full bg-white/20 text-white">
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Ecommerce Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's your store performance overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={CreditCard}
          title="Monthly Revenue"
          value={`₽${dashboardStats.totalRevenue.toLocaleString('ru-RU')}`}
          change={dashboardStats.monthlyGrowth}
          gradient="from-indigo-500 to-blue-600"
        />
        <StatCard
          icon={PackageCheck}
          title="Orders Fulfilled"
          value={dashboardStats.totalOrders.toLocaleString()}
          change={8.2}
          gradient="from-emerald-500 to-teal-500"
        />
        <StatCard
          icon={UserPlus}
          title="New Customers"
          value={dashboardStats.totalCustomers.toLocaleString()}
          change={15.3}
          gradient="from-pink-500 to-rose-500"
        />
        <StatCard
          icon={Activity}
          title="Conversion Rate"
          value={`${dashboardStats.conversionRate}%`}
          change={5.7}
          gradient="from-amber-500 to-orange-500"
        />
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Inventory Health</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardStats.totalProducts} items</p>
            </div>
            <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300">
              <BarChart2 className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track how many products are currently active and ready to sell.
          </p>
        </div>
        <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Targets</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">On Track</p>
            </div>
            <div className="p-3 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-200">
              <Target className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sales and customer goals are aligned with this month’s targets.
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue & Users Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Orders</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="orders" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
