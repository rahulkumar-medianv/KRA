// Defines the roles a user can have in the system
export enum Role {
  PUBLIC = 'public', // Default role - no authentication needed
  USER = 'user',     // Regular authenticated user
  ADMIN = 'admin',   // Administrator with full access
}
