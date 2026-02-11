/**
 * VSMC Core Configuration
 * Centralized settings for database, API, and environment variables
 */

const VSMC_CONFIG = {
    // Environment settings
    env: 'development',
    version: '1.0.0',

    // SQL Server / MySQL Settings (Environment Ready)
    // Note: In production, these should be handled via server-side environment variables
    database: {
        host: 'localhost',
        port: 3306,
        user: 'vsmc_admin',
        password: '', // Should be set via process.env
        db_name: 'vsmc_clinical',
        charset: 'utf8mb4',
        connectionLimit: 10
    },

    // API Endpoints
    apiUrls: {
        booking: '/api/v1/booking',
        intake: '/api/v1/intake',
        referral: '/api/v1/referral'
    },

    // UI Preferences
    ui: {
        themeColor: '#ec4899',
        backgroundColor: '#FFFDF5'
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = VSMC_CONFIG;
} else {
    window.VSMC_CONFIG = VSMC_CONFIG;
}
