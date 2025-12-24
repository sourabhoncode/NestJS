import api from './api';

// ==================== INTERFACES ====================
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserSignupData {
  name: string;
  email: string;
  password: string;
  phone: string;
  agreement: boolean;
}

export interface DriverSignupData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  licenseNumber: string;
  address: string;
  profileImage?: string;
  location: {
    latitude: number;
    longitude: number;
  };
  agreement: boolean;
  role: 'DRIVER';
  personalInfo?: {
    bloodGroup?: string;
    dob?: string;
    languages?: string[];
    certificates?: string[];
    emergencyContact?: {
      name: string;
      phone: string;
      relationship: string;
    };
  };
  drivingExperience?: {
    yearsOfExperience?: number;
    licensedSince?: string;
    totalTripsCompleted?: number;
    averageRating?: number;
  };
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user?: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    address?: string;
    role: string;
  };
  driver?: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    driverLicenseNumber?: string;
    role: string;
  };
}

// ==================== AUTH SERVICE ====================
export const authService = {
  // User Registration
  userRegister: async (data: UserSignupData): Promise<AuthResponse> => {
    try {
      console.log('🔵 [USER REGISTER] Sending request:', {
        fullName: data.name,
        email: data.email,
        phoneNumber: data.phone,
      });

      const response = await api.post<AuthResponse>('/auth/register-user', {
        fullName: data.name,
        email: data.email,
        phoneNumber: data.phone,
        password: data.password,
      });

      console.log('✅ [USER REGISTER] Response:', response.data);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', 'USER');
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        console.log('✅ [USER REGISTER] Token and user data saved to localStorage');
      }

      return response.data;
    } catch (error: any) {
      console.error('❌ [USER REGISTER] Error:', {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      throw error;
    }
  },

  // User Login
  userLogin: async (data: LoginCredentials): Promise<AuthResponse> => {
    try {
      console.log('🔵 [USER LOGIN] Sending request:', data.email);

      const response = await api.post<AuthResponse>('/auth/login-user', data);

      console.log('✅ [USER LOGIN] Response:', response.data);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', 'USER');
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        console.log('✅ [USER LOGIN] Token and user data saved to localStorage');
      }

      return response.data;
    } catch (error: any) {
      console.error('❌ [USER LOGIN] Error:', {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
      throw error;
    }
  },

  // Logout
  logout: () => {
    console.log('🔵 [LOGOUT] Clearing localStorage');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    console.log('✅ [LOGOUT] localStorage cleared');
  },

  // Get Current User
  getCurrentUser: () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  },

  // Check if authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get user role
  getUserRole: () => {
    return localStorage.getItem('userRole');
  },

  // ==================== PROFILE METHODS ====================

  // Update User Profile
  updateUserProfile: async (data: Partial<UserSignupData>) => {
    try {
      console.log('🔵 [UPDATE USER PROFILE] Sending request:', data);

      // Map frontend field names to backend field names
      const updatePayload = {
        fullName: data.name,
        email: data.email,
        phoneNumber: data.phone,
        address: data.address,
      };

      const response = await api.patch('/users/update', updatePayload);

      console.log('✅ [UPDATE USER PROFILE] Response:', response.data);

      // Update localStorage with response data from backend
      localStorage.setItem('userData', JSON.stringify(response.data));
      console.log('✅ [UPDATE USER PROFILE] localStorage updated with server response');

      return response.data;
    } catch (error: any) {
      console.error('❌ [UPDATE USER PROFILE] Error:', {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
      throw error;
    }
  },

  // Get User Profile from Backend
  fetchUserProfile: async () => {
    try {
      console.log('🔵 [FETCH USER PROFILE] Fetching from backend');

      const response = await api.get('/users/profile');

      console.log('✅ [FETCH USER PROFILE] Response:', response.data);

      // Update localStorage with fresh data from backend
      if (response.data.user || response.data) {
        const userData = response.data.user || response.data;
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('✅ [FETCH USER PROFILE] localStorage updated with fresh data');
      }

      return response.data;
    } catch (error: any) {
      console.error('❌ [FETCH USER PROFILE] Error:', {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
      throw error;
    }
  },

  // Update Driver Profile
  updateDriverProfile: async (data: Partial<DriverSignupData>) => {
    try {
      console.log('🔵 [UPDATE DRIVER PROFILE] Sending request:', data);

      // Map frontend field names to backend field names
      const updatePayload = {
        fullName: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
        driverLicenseNumber: data.licenseNumber,
        profileImage: data.profileImage,
        personalInfo: data.personalInfo || {},
        drivingExperience: data.drivingExperience || {},
      };

      const response = await api.patch('/drivers/update', updatePayload);

      console.log('✅ [UPDATE DRIVER PROFILE] Response:', response.data);

      // Update localStorage with response data from backend
      localStorage.setItem('userData', JSON.stringify(response.data));
      console.log('✅ [UPDATE DRIVER PROFILE] localStorage updated with server response');

      return response.data;
    } catch (error: any) {
      console.error('❌ [UPDATE DRIVER PROFILE] Error:', {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
      throw error;
    }
  },

  // Get Driver Profile from Backend
  fetchDriverProfile: async () => {
    try {
      console.log('🔵 [FETCH DRIVER PROFILE] Fetching from backend');

      const response = await api.get('/drivers/profile');

      console.log('✅ [FETCH DRIVER PROFILE] Response:', response.data);

      // Update localStorage with fresh data from backend
      if (response.data.driver || response.data) {
        const driverData = response.data.driver || response.data;
        localStorage.setItem('userData', JSON.stringify(driverData));
        console.log('✅ [FETCH DRIVER PROFILE] localStorage updated with fresh data');
      }

      return response.data;
    } catch (error: any) {
      console.error('❌ [FETCH DRIVER PROFILE] Error:', {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
      throw error;
    }
  },

  // ==================== DRIVER METHODS ====================

  // Driver Registration
  driverRegister: async (data: DriverSignupData): Promise<AuthResponse> => {
    try {
      console.log('🔵 [DRIVER REGISTER] Sending request:', {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        address: data.address,
        location: data.location,
        agreement: data.agreement,
        role: data.role,
        licenseNumber: data.licenseNumber,
      });

      const response = await api.post<AuthResponse>('/auth/register-driver', {
        fullName: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        driverLicenseNumber: data.licenseNumber,
      });

      console.log('✅ [DRIVER REGISTER] Response:', response.data);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', 'DRIVER');
        localStorage.setItem('userData', JSON.stringify(response.data.driver));
        console.log('✅ [DRIVER REGISTER] Token and driver data saved to localStorage');
      }

      return response.data;
    } catch (error: any) {
      console.error('❌ [DRIVER REGISTER] Error:', {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      throw error;
    }
  },

  // Driver Login
  driverLogin: async (data: LoginCredentials): Promise<AuthResponse> => {
    try {
      console.log('🔵 [DRIVER LOGIN] Sending request:', data.email);

      const response = await api.post<AuthResponse>('/auth/login-driver', data);

      console.log('✅ [DRIVER LOGIN] Response:', response.data);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', 'DRIVER');
        localStorage.setItem('userData', JSON.stringify(response.data.driver));
        console.log('✅ [DRIVER LOGIN] Token and driver data saved to localStorage');
      }

      return response.data;
    } catch (error: any) {
      console.error('❌ [DRIVER LOGIN] Error:', {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      });
      throw error;
    }
  },
};

export default authService;