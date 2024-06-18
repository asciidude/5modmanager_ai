# GTA V Mod Manager

This project is a comprehensive mod manager for Grand Theft Auto V, created through collaboration between ChatGPT 4.0 and a human developer. The manager supports ASI, DLL, and CS file types, allowing users to view, edit, and delete their GTA V mods with ease.

## Human Note

99% of this project has been written by AI, this was done for fun, regardless of the extremely long time it took. It is completely usable, however, "delete" only deletes the ASI (or DLL or CS) file and INI file attached to the mod. I recommend using another mod manager, but to each his own.

## Features

- **View Mods**: Lists all mods in the main GTA V directory and the scripts directory.
- **Edit INI Files**: Edit the configuration files associated with ASI mods.
- **Delete Mods**: Delete both the mod files and their associated INI files.

## Usage

1. **Setup**:
    - Clone the repository.
    - Install the dependencies using `npm install`.
    - Create a `config.json` file in the root directory with the following structure:
      ```json
      {
          "directory": "path_to_your_gtav_directory"
      }
      ```

2. **Run the Application**:
    - Start the server using `node app.js`.
    - Open your browser and navigate to `http://localhost:3000`.

3. **Managing Mods**:
    - The main page lists all the mods in your GTA V directory and scripts folder.
    - Use the "Edit" button to open and modify INI files.
    - Use the "Delete" button to remove mod files and their associated INI files.

## Technical Details

### Backend (app.js)
- **Express.js**: Used to set up the server and handle routes.
- **File System (fs)**: Interact with the file system to read directories, read and write files, and delete files.

### Frontend (index.ejs)
- **HTML/CSS**: Basic structure and styling.
- **JavaScript (jQuery)**: Handles AJAX requests to interact with the backend.

### Key Routes
- **GET /load-mods**: Loads all the mods in the specified directories.
- **GET /read-ini**: Reads the content of an INI file.
- **POST /save-ini**: Saves the content of an INI file.
- **POST /delete-files**: Deletes mod files and their associated INI files.

## Development Process

This mod manager was developed over approximately 6 hours, involving multiple iterations and adjustments to meet the desired functionality and aesthetic. The development process included:
1. Initial setup of the project structure and configuration.
2. Implementation of backend routes to handle file operations.
3. Development of the frontend to interact with the backend and provide a user-friendly interface.
4. Debugging and refining the functionality to ensure robust file handling and error management.
5. Styling the frontend to achieve a modern, visually appealing design.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

Created by ChatGPT 4.0 in collaboration with a human developer.
