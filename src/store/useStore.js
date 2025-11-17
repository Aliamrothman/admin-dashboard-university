import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      // Theme state
      theme: 'light',
      toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light'
      })),

      // Color theme state
      colorTheme: 'blue',
      setColorTheme: (color) => set({ colorTheme: color }),

      // Sidebar state
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({
        sidebarOpen: !state.sidebarOpen
      })),
      
      // User data
      user: {
        name: 'ali othman',
        email: 'aliamrothman10@gmail.com',
        // Default cartoon avatar
        avatar: 'https://i.imgur.com/0Z8FQY9.png',
        role: 'Admin'
      },
      
      // Ecommerce Dashboard data
      dashboardStats: {
        totalRevenue: 9876543,
        totalOrders: 4210,
        totalCustomers: 3120,
        totalProducts: 980,
        conversionRate: 4.2,
        averageOrderValue: 2450.75,
        monthlyGrowth: 8.3,
        returnRate: 1.7
      },

      // Color themes
      colorThemes: {
        blue: {
          primary: '#3b82f6',
          secondary: '#1e40af',
          accent: '#60a5fa',
          gradient: 'from-blue-500 to-blue-600'
        },
        green: {
          primary: '#10b981',
          secondary: '#047857',
          accent: '#34d399',
          gradient: 'from-green-500 to-green-600'
        },
        purple: {
          primary: '#8b5cf6',
          secondary: '#7c3aed',
          accent: '#a78bfa',
          gradient: 'from-purple-500 to-purple-600'
        },
        orange: {
          primary: '#f59e0b',
          secondary: '#d97706',
          accent: '#fbbf24',
          gradient: 'from-orange-500 to-orange-600'
        },
        red: {
          primary: '#ef4444',
          secondary: '#dc2626',
          accent: '#f87171',
          gradient: 'from-red-500 to-red-600'
        },
        pink: {
          primary: '#ec4899',
          secondary: '#db2777',
          accent: '#f472b6',
          gradient: 'from-pink-500 to-pink-600'
        }
      },
      
      // Orders data
      ordersData: [
        { id: 'ORD-001', customer: 'Anna Ivanova', email: 'anna.ivanova@example.ru', total: 12500, status: 'Delivered', date: '2025-01-15', items: 3, payment: 'Mir Card' },
        { id: 'ORD-002', customer: 'Sergey Sokolov', email: 'sergey.sokolov@example.ru', total: 8420, status: 'Processing', date: '2025-02-02', items: 2, payment: 'Bank Transfer' },
        { id: 'ORD-003', customer: 'Olga Smirnova', email: 'olga.smirnova@example.ru', total: 6390, status: 'Shipped', date: '2025-03-18', items: 1, payment: 'Mir Card' },
        { id: 'ORD-004', customer: 'Dmitry Volkov', email: 'dmitry.volkov@example.ru', total: 15780, status: 'Pending', date: '2025-04-05', items: 2, payment: 'Cash' },
        { id: 'ORD-005', customer: 'Natalia Petrova', email: 'natalia.petrova@example.ru', total: 22150, status: 'Delivered', date: '2025-05-21', items: 4, payment: 'Mir Card' },
      ],

      // Customers data
      customersData: [
        { id: 1, name: 'Anna Ivanova', email: 'anna.ivanova@example.ru', phone: '+7 495 123-45-67', totalOrders: 18, totalSpent: 285000, status: 'VIP', joinDate: '2023-01-15', location: 'Moscow, Russia' },
        { id: 2, name: 'Sergey Sokolov', email: 'sergey.sokolov@example.ru', phone: '+7 812 234-56-78', totalOrders: 9, totalSpent: 112500, status: 'Regular', joinDate: '2023-02-20', location: 'Saint Petersburg, Russia' },
        { id: 3, name: 'Olga Smirnova', email: 'olga.smirnova@example.ru', phone: '+7 343 345-67-89', totalOrders: 22, totalSpent: 354800, status: 'VIP', joinDate: '2023-03-10', location: 'Yekaterinburg, Russia' },
        { id: 4, name: 'Dmitry Volkov', email: 'dmitry.volkov@example.ru', phone: '+7 383 456-78-90', totalOrders: 6, totalSpent: 74800, status: 'Regular', joinDate: '2023-04-05', location: 'Novosibirsk, Russia' },
        { id: 5, name: 'Natalia Petrova', email: 'natalia.petrova@example.ru', phone: '+7 861 567-89-01', totalOrders: 14, totalSpent: 192300, status: 'VIP', joinDate: '2023-05-12', location: 'Krasnodar, Russia' },
      ],

      // Employees data
      employeesData: [
        { id: 1, name: 'Ivan Kuznetsov', email: 'ivan.kuznetsov@company.ru', role: 'Store Manager', department: 'Operations', salary: 145000, status: 'Active', hireDate: '2022-01-15', phone: '+7 495 700-00-01' },
        { id: 2, name: 'Elena Morozova', email: 'elena.morozova@company.ru', role: 'Sales Associate', department: 'Sales', salary: 95000, status: 'Active', hireDate: '2022-03-20', phone: '+7 812 700-00-02' },
        { id: 3, name: 'Pavel Popov', email: 'pavel.popov@company.ru', role: 'Customer Support', department: 'Support', salary: 88000, status: 'Active', hireDate: '2022-05-10', phone: '+7 343 700-00-03' },
        { id: 4, name: 'Maria Kuzina', email: 'maria.kuzina@company.ru', role: 'Marketing Specialist', department: 'Marketing', salary: 110000, status: 'Active', hireDate: '2022-07-05', phone: '+7 383 700-00-04' },
        { id: 5, name: 'Alexey Orlov', email: 'alexey.orlov@company.ru', role: 'Warehouse Manager', department: 'Logistics', salary: 98000, status: 'On Leave', hireDate: '2022-09-12', phone: '+7 861 700-00-05' },
      ],

      // Products data
      productsData: [
        { id: 1, name: 'Wireless Headphones Moscow Edition', category: 'Electronics', price: 7590, stock: 150, sold: 89, status: 'Active', sku: 'RU-WH-001', rating: 4.5 },
        { id: 2, name: 'Smart Watch Neva', category: 'Electronics', price: 18990, stock: 75, sold: 156, status: 'Active', sku: 'RU-SW-002', rating: 4.8 },
        { id: 3, name: 'Running Shoes Siberia', category: 'Sports', price: 11250, stock: 200, sold: 234, status: 'Active', sku: 'RU-RS-003', rating: 4.3 },
        { id: 4, name: 'Samovar Coffee Maker', category: 'Home', price: 8450, stock: 50, sold: 67, status: 'Low Stock', sku: 'RU-CM-004', rating: 4.2 },
        { id: 5, name: 'Leather Laptop Bag Volga', category: 'Accessories', price: 6290, stock: 0, sold: 123, status: 'Out of Stock', sku: 'RU-LB-005', rating: 4.0 },
      ],
      
      // Calendar events (spread across 2025 for Russian branches)
      calendarEvents: [
        {
          id: 1,
          title: 'Moscow Team Meeting',
          start: new Date(2025, 0, 15, 10, 0),
          end: new Date(2025, 0, 15, 11, 0),
          resource: 'meeting'
        },
        {
          id: 2,
          title: 'Quarterly Review – Saint Petersburg',
          start: new Date(2025, 1, 20, 14, 0),
          end: new Date(2025, 1, 20, 15, 30),
          resource: 'review'
        },
        {
          id: 3,
          title: 'Client Call – Novosibirsk',
          start: new Date(2025, 2, 5, 9, 0),
          end: new Date(2025, 2, 5, 10, 0),
          resource: 'call'
        },
        {
          id: 4,
          title: 'Warehouse Audit – Yekaterinburg',
          start: new Date(2025, 3, 10, 13, 0),
          end: new Date(2025, 3, 10, 15, 0),
          resource: 'review'
        },
        {
          id: 5,
          title: 'Marketing Workshop – Moscow',
          start: new Date(2025, 4, 8, 11, 0),
          end: new Date(2025, 4, 8, 13, 0),
          resource: 'meeting'
        },
        {
          id: 6,
          title: 'Logistics Planning – Krasnodar',
          start: new Date(2025, 5, 22, 16, 0),
          end: new Date(2025, 5, 22, 17, 30),
          resource: 'meeting'
        },
        {
          id: 7,
          title: 'Key Client Visit – Saint Petersburg',
          start: new Date(2025, 7, 3, 10, 0),
          end: new Date(2025, 7, 3, 12, 0),
          resource: 'call'
        },
        {
          id: 8,
          title: 'Year-End Strategy Review',
          start: new Date(2025, 10, 18, 15, 0),
          end: new Date(2025, 10, 18, 17, 0),
          resource: 'review'
        }
      ],
      
      // Kanban data
      kanbanData: {
        todo: [
          { id: '1', title: 'Update Moscow landing page', description: 'Adapt content for Russian audience', priority: 'high', assignee: 'Ivan' },
          { id: '2', title: 'Localize email templates', description: 'Translate templates to Russian', priority: 'medium', assignee: 'Olga' },
        ],
        inProgress: [
          { id: '3', title: 'Integrate payment with Mir', description: 'Add Mir card payment gateway', priority: 'high', assignee: 'Sergey' },
          { id: '4', title: 'Optimize delivery routes', description: 'Improve logistics for Siberia region', priority: 'medium', assignee: 'Anna' },
        ],
        done: [
          { id: '5', title: 'Set up Russian tax rules', description: 'Configure VAT for Russian orders', priority: 'low', assignee: 'Pavel' },
        ]
      },
      
      // User actions
      setUserAvatar: (avatarUrl) => set((state) => ({
        user: {
          ...state.user,
          avatar: avatarUrl,
        }
      })),
      
      // Actions
      addCalendarEvent: (event) => set((state) => ({
        calendarEvents: [...state.calendarEvents, { ...event, id: Date.now() }]
      })),
      
      updateKanbanData: (newData) => set({ kanbanData: newData }),
      
      addTableRow: (row) => set((state) => ({
        tableData: [...state.tableData, { ...row, id: Date.now() }]
      })),
      
      updateTableRow: (id, updatedRow) => set((state) => ({
        tableData: state.tableData.map(row => 
          row.id === id ? { ...row, ...updatedRow } : row
        )
      })),
      
      deleteTableRow: (id) => set((state) => ({
        tableData: state.tableData.filter(row => row.id !== id)
      })),
    }),
    {
      // bump storage name so new default user data is applied
      name: 'admin-dashboard-storage-v8',
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
        user: state.user,
      }),
    }
  )
);

export default useStore;
