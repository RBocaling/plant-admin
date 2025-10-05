import { useState, useEffect } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { FileText, Grid2x2, PackageSearch, BarChart3, Bell, Search, LogOut, HelpCircle, Menu, X, MessageSquare, Leaf, User, Settings, FileText as AccessLogs } from 'lucide-react';
import ThryveLogoWhite from '../assets/Thryve Logo White.png';
import useUserAuth from '../hooks/useUserAuth';
import { useAuthStore } from '../store/authStore';


const AdminLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const navigate = useNavigate();
  // const { isAuthenticated} = useUserAuth()

  const { isAuthenticated, data, isLoading } = useUserAuth();
    const { clearTokens } = useAuthStore();
  
  
  if (isLoading) return <div>Loading...</div>;
 if (!isAuthenticated) {
      navigate('/login');
    } 

  const handleLogout = () => {
clearTokens();
    navigate('/login');
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  
  // Menu items based on user role
  const getMenuItems = () => {
    if (data?.role === "specialist") {
      return [
        {
          path: "/",
          icon: <Grid2x2 className="h-5 w-5 mr-3" />,
          label: "Overview",
          end: true,
        },
        // { path: '//dashboard', icon: <FileText className="h-5 w-5 mr-3" />, label: 'Dashboard' },
        // { path: '//inventory', icon: <PackageSearch className="h-5 w-5 mr-3" />, label: 'Inventory Management' },
        {
          path: "/plant-care",
          icon: <Leaf className="h-5 w-5 mr-3" />,
          label: "Plant Care Advisory",
        },
        {
          path: "/explore-plants",
          icon: <MessageSquare className="h-5 w-5 mr-3" />,
          label: "Inventory",
        },
        // { path: '//reports', icon: <BarChart3 className="h-5 w-5 mr-3" />, label: 'Reports Generation' },
      ];
    } else if (data?.role === "admin") {
      return [
        {
          path: "/",
          icon: <Grid2x2 className="h-5 w-5 mr-3" />,
          label: "Overview",
          end: true,
        },
        {
          path: "/user-management",
          icon: <User className="h-5 w-5 mr-3" />,
          label: "User Management",
        },
        {
          path: "/system-config",
          icon: <Settings className="h-5 w-5 mr-3" />,
          label: "System Configuration",
        },
        {
          path: "/access-logs",
          icon: <AccessLogs className="h-5 w-5 mr-3" />,
          label: "Access Logs",
        },
        {
          path: "/reports",
          icon: <AccessLogs className="h-5 w-5 mr-3" />,
          label: "Reports",
        },
        // {
        //   path: "/plant-care",
        //   icon: <Leaf className="h-5 w-5 mr-3" />,
        //   label: "Plant Care Advisory",
        // },
      ];
    } else {
      return [
        {
          path: "/",
          icon: <Grid2x2 className="h-5 w-5 mr-3" />,
          label: "Overview",
          end: true,
        },
        // { path: '//dashboard', icon: <FileText className="h-5 w-5 mr-3" />, label: 'Dashboard' },
        // { path: '//inventory', icon: <PackageSearch className="h-5 w-5 mr-3" />, label: 'Inventory Management' },
        {
          path: "/feedback",
          icon: <MessageSquare className="h-5 w-5 mr-3" />,
          label: "Customer Feedback",
        },
        {
          path: "/explore-plants",
          icon: <MessageSquare className="h-5 w-5 mr-3" />,
          label: "Inventory",
        },
        {
          path: "/customer-support",
          icon: <MessageSquare className="h-5 w-5 mr-3" />,
          label: "Customer Support",
        },
        {
          path: "/plant-care",
          icon: <Leaf className="h-5 w-5 mr-3" />,
          label: "Plant Care Advisory",
        },
        {
          path: "/reports",
          icon: <BarChart3 className="h-5 w-5 mr-3" />,
          label: "Generate Reports",
        },
      ];
    }
  };

  return (
    <div className="flex h-screen bg-neutral">
      {/* Mobile Drawer Toggle */}
      <div className="fixed top-4 left-4 z-40 block md:hidden">
        <button
          onClick={toggleDrawer}
          className="p-2 bg-primary text-white rounded-md"
        >
          {isDrawerOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar/Drawer */}
      <div
        className={`bg-[#484848] text-white w-64 fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 md:translate-x-0 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } shadow-xl`}
      >
        {/* Logo */}
        <div className="flex items-center px-4 py-6">
          <img src={ThryveLogoWhite} alt="Thryve Logo" className="h-8" />
        </div>

        {/* User Role Badge */}
        <div className="px-6 mb-4">
          <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
            {data?.role === "specialist"
              ? "Plant Specialist"
              : data?.role === "owner"
              ? "Plant Store Owner"
              : data?.role === "itadmin"
              ? "IT Admin"
              : "Admin"}
          </span>
        </div>

        {/* Navigation */}
        <nav className="mt-2">
          <ul>
            {getMenuItems().map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center px-6 py-3 text-base font-medium hover:bg-black/20 ${
                      isActive ? "border-l-4 border-secondary bg-black/20" : ""
                    }`
                  }
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Help Button - Bottom */}
        <div className="absolute bottom-6 w-full px-4">
          <button className="flex items-center w-full px-4 py-2 text-white hover:bg-black/20 rounded">
            <HelpCircle className="h-5 w-5 mr-3" />
            <span>Quick Help</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-margin duration-300 ${
          isDrawerOpen ? "md:ml-64" : "ml-0"
        } bg-[#f2fceb] overflow-auto`}
      >
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="relative">
            {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} /> */}
            {/* <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            /> */}
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} />
            </button>
            <div className="flex items-center">
              {/* <div className="w-8 h-8 bg-gray-200 rounded-full"></div> */}
              <span className="ml-2 text-gray-800">
                {data?.role === "specialist"
                  ? "Plant Specialist"
                  : data?.role === "owner"
                  ? "Plant Store Owner"
                  : data?.role === "itadmin"
                  ? "IT Admin"
                  : "Admin User"}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-red-600"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;