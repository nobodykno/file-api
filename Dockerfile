

#Install node from the Docker
FROM dhi.io/node:24-alpine3.23-dev AS dev

# Set the working directory inside the container.
# All following commands will run from /app.
WORKDIR /app

# Install project dependencies.
# - Cache downloaded npm packages to speed up future builds.
# - Temporarily mount package.json so Docker knows which dependencies to install
#   without copying the entire project at this stage.
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=bind,source=package.json,target=package.json \
    npm install

# Copy the rest of the project files into the container.
COPY . .

# Inform Docker that the application listens on port 5000
# (This does not publish the port; it is mainly for documentation.)
EXPOSE 5000

# Start the Node.js application when the container starts
CMD ["npm", "run", "dev"]