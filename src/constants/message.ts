const MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: 'Login successful!',

    LOGIN_FAILED: 'Failed to login',

    INVALID_CREDENTIALS: 'Invalid email or password!',
  },

  PROJECT: {
    CREATE_SUCCESS: 'Project created successfully!',

    CREATE_FAILED: 'Project cannot be created!',

    FETCH_ALL_SUCCESS: 'All projects fetched successfully!',

    FETCH_ALL_FAILED: 'Projects cannot be fetched!',

    FETCH_SUCCESS: 'Project fetched successfully!',

    FETCH_FAILED: 'Project cannot be fetched!',

    UPDATE_SUCCESS: 'Project updated successfully!',

    UPDATE_FAILED: 'Project cannot be updated!',

    DELETE_SUCCESS: 'Project deleted successfully!',

    DELETE_FAILED: 'Project cannot be deleted!',

    PROJECT_NOT_FOUND: 'Project not found!',

    NAME_DESCRIPTION_REQUIRED: 'Name and description are required!',

    PROJECT_ID_NOT_FOUND: 'Project id not found'
  },

  JOB: {
    FILE_REQUIRED: 'Please select at least one file!',

    FILE_NOT_FOUND: 'No files found with given ids!',

    CREATE_SUCCESS: 'Job created successfully!',

    FETCH_SUCCESS: 'Jobs fetched successfully!',

    FETCH_ALL_JOBS: 'All jobs fetched successfully!',

    JOB_NOT_FOUND: 'Job not found!',

    DOWNLOAD_ERROR: 'Output file not found!',

    DOWNLOAD_SUCCESS: 'Files downloaded successfully!',

    INVALID_STATUS: 'Job is not completed yet!',

    CREATE_FAILED: 'Job not created!',

    COMPLETE_STATUS: 'Job completed successfully',

    FAILED_CREATE_ZIP: 'Fail to create zip',

    JOB_ID_NOT_FOUND: 'Job id not found',

    GET_STATUS: 'Job status fetched successfully.',


  },

  FILE: {
    NO_FILES_UPLOADED: 'No files uploaded!',

    UPLOAD_SUCCESS: 'Files uploaded successfully!',

    FETCH_SUCCESS: 'Files fetched successfully!',

    FILE_NOT_FOUND: 'File not found!',

    DELETE_SUCCESS: 'File deleted successfully!',

    FILE_ID_NOT_FOUND: 'File id not found'
  },

  MODULE: {
    PROJECT: 'Project',

    FILE: 'File',

    JOBS: 'Jobs',

    AUTH: 'Auth',
  },

  ACTION: {
    CREATE: 'Create',

    UPDATE: 'Update',

    DELETE: 'Delete',

    GET: 'Get',

    COMPLETE: 'Complete',

    UPLOAD: 'Upload',

    DOWNLOAD: 'Download',

    CREATE_ZIP: 'Create Zip',
  },

  MIGRATIONS: {
    MIGRATION_RUNNING: 'Running migrations..',

    ALL_MIGRATION_COMPLETED: 'All migrations completed',

    MIGRATION_FAILED: 'Migration failed',

    ROLLED_BACK: 'Rolled back',

    NO_MIGRATIONS_ROLLED_BACK: 'No migrations to rollback.',
  },

  COMMON: {
    SERVER_ERROR: 'Something went wrong!',

    T00_MANY_REQUEST: 'Too many requests. Please try again later.',
  },
};

export default MESSAGES;
