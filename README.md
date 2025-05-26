# Factored_Internship
This is a simple web application where you can:
- Sign up with your name, position, and skills
- Log in to your profile
- See your skill levels in a visual chart

Before you begin, make sure you have:
- A computer with Windows, Mac, or Linux
- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running

# How to run this project
# Step 1: Start Docker
1. Open Docker Desktop
2. Wait until it shows: "Docker is running"

# Step 2: Download the project files
Use the project link, go to GitHub and click "Download ZIP", then extract the folder.

# Step 3: Open the folder using a terminal
1. Open Command Prompt (Windows) or Terminal (Mac/Linux)
2. Navigate to the project folder. For example:
    cd "C:\Users\YourUser\Downloads\Factored_Internship"

# Step 4: Start the app using Docker
Once you are inside the folder, type: 
    docker compose up --build
Docker will now build and launch the application. This may take a couple of minutes the first time.

# Step 5: Open the app in your browser
Once it's ready
1. Open your browser (Chrome, Edge, Safari, etc.)
2. Go to:
    http://localhost:3000
3. Now you should be in the landing page, there you can log in or sign in and then access to your profile

# To stop the app
Go to the terminal and type:
    Ctrl + C

# To stop docker
Go to the terminal and type:
    docker compose down
