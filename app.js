const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Load configuration from config.json
let config = {};
const configPath = path.join(__dirname, 'config.json');
if (fs.existsSync(configPath)) {
    const configData = fs.readFileSync(configPath, 'utf8');
    config = JSON.parse(configData);
} else {
    console.error('config.json not found or is invalid.');
    process.exit(1);
}

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.render('index');
});

// Route to load mods
app.get('/load-mods', (req, res) => {
    const directoryPath = config.directory;
    const scriptsPath = path.join(directoryPath, 'scripts');

    if (!directoryPath) {
        return res.status(400).send('Directory path is required');
    }

    const modFiles = [];

    // Read main directory for .asi files
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return res.status(500).send('Error reading directory');
        }

        files.filter(file => file.endsWith('.asi')).forEach(file => {
            const iniFile = path.join(directoryPath, `${path.parse(file).name}.ini`);
            modFiles.push({
                modFile: file,
                directory: path.join(directoryPath, file),
                fileType: 'ASI',
                iniFileExists: fs.existsSync(iniFile),
                iniFile: iniFile
            });
        });

        // Read scripts directory for .dll and .cs files, if it exists
        if (fs.existsSync(scriptsPath)) {
            fs.readdir(scriptsPath, (err, scriptFiles) => {
                if (err) {
                    console.error('Error reading scripts directory:', err);
                    return res.status(500).send('Error reading scripts directory');
                }

                scriptFiles.filter(file => file.endsWith('.dll') || file.endsWith('.cs')).forEach(file => {
                    modFiles.push({
                        modFile: 'scripts/' + file,
                        directory: path.join(scriptsPath, file),
                        fileType: file.endsWith('.dll') ? 'DLL' : 'CS',
                        iniFileExists: false,
                        iniFile: null
                    });
                });

                if (modFiles.length === 0) {
                    res.json({ message: 'No mods found' });
                } else {
                    res.json(modFiles);
                }
            });
        } else {
            if (modFiles.length === 0) {
                res.json({ message: 'No mods found' });
            } else {
                res.json(modFiles);
            }
        }
    });
});

// Route to read INI file content
app.get('/read-ini', (req, res) => {
    const iniFile = req.query.iniFile;

    fs.readFile(iniFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading INI file:', err);
            return res.status(500).send('Error reading INI file');
        }

        res.send(data);
    });
});

// Route to save INI file content
app.post('/save-ini', (req, res) => {
    const iniContent = req.body.iniContent;
    const iniFile = req.body.iniFile;

    fs.writeFile(iniFile, iniContent, 'utf8', (err) => {
        if (err) {
            console.error('Error saving INI file:', err);
            return res.status(500).send('Error saving INI file');
        }

        res.send('INI file saved successfully');
    });
});

// Route to delete both INI and mod files
app.post('/delete-files', (req, res) => {
    const directory = req.body.directory;
    const iniFile = req.body.iniFile;

    fs.unlink(directory, (err) => {
        if (err) {
            console.error('Error deleting mod file:', err);
            return res.status(500).send('Error deleting mod file');
        }

        if (iniFile && fs.existsSync(iniFile)) {
            fs.unlink(iniFile, (err) => {
                if (err) {
                    console.error('Error deleting INI file:', err);
                    return res.status(500).send('Error deleting INI file');
                }

                res.send('Files deleted successfully');
            });
        } else {
            res.send('Files deleted successfully');
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
