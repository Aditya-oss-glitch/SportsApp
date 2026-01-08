# 🔐 Login Credentials Reference

This document contains the default login credentials for testing your SportsHub application.

## Admin Login

- **Email**: `admin@sportshub.com`
- **Password**: `admin123`
- **Role**: Admin
- **Access**: Admin Dashboard with full system control

## Team Captain Login

- **Email**: Use the email you registered with
- **Password**: `default123` (default password - change after first login)
- **Role**: Team Captain
- **Access**: Captain Dashboard for team management

## Partner Login

- **Email**: Use the email you registered with during partner registration
- **Password**: Password you set during registration
- **Role**: Partner
- **Access**: Partner Dashboard for managing partnerships

## Notes

1. **Admin credentials are hardcoded** in `Backend/routes/admin.js` - change these in production!
2. **Team Captain default password** is `default123` - users should change this after first login
3. **Partner passwords** are set during registration
4. For production, implement proper password hashing and authentication tokens (JWT)

## Security Recommendations

⚠️ **Before deploying to production:**

1. Change admin credentials to a strong password
2. Implement password hashing (bcrypt)
3. Use JWT tokens for authentication
4. Add rate limiting to login endpoints
5. Implement password reset functionality
6. Add email verification for new registrations

