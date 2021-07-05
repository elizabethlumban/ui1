# Stage 1: Use separate small container to build
FROM node:12.13.0-alpine as builder

WORKDIR /app

# Cache the global packages - use specific versions for consistency
RUN yarn global add modclean@2.0.0

# Copy only the dependency definitions
COPY package.json  ./

# Only re-install if package.json or yarn.lock change
RUN yarn install

# Note .dockerignore 
COPY . .

# To fix resolution issus with eslint
ENV SKIP_PREFLIGHT_CHECK=true

# Compile and optimise dependencies
RUN npm run build \
  && modclean -r

# Prepare the bundle folder
RUN mkdir -p ./bundle \
  && cp -R node_modules ./bundle/node_modules \
  && cp -R build ./bundle/build \
  && cp *.js package.json yarn.lock ./bundle | true

# Stage 2: Build the actual container from the builder's output
FROM node:12.13.0-alpine

# Run as a non-root user "node" (created in base image)
USER node
WORKDIR /home/node/app

# Default env vars
ENV NODE_ENV=production
ENV PORT=3000

# # Based on https://medium.com/@amirilovic/how-to-fix-node-dns-issues-5d4ec2e12e95
# ENV UV_THREADPOOL_SIZE=64

# This environment variable is ignored when node runs as setuid root or 
# has Linux file capabilities set. (https://nodejs.org/api/cli.html)
# ENV NODE_EXTRA_CA_CERTS="To be provided from environment"

# The port we're listening on
EXPOSE ${PORT}

# Copy build bundle from the builder container 
COPY --from=builder --chown=node /app/bundle .

# Use CMD instead of ENTRYPOINT, so we can debug via "docker run -it [container] /bin/sh"
CMD ["npm", "start"]