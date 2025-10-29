FROM node:20

WORKDIR /app

# 1️⃣ Copy package.json and package-lock.json first
COPY package*.json ./

# 2️⃣ Install all dependencies (dev + prod) → needed for TS & next.config.ts
RUN npm install

# 3️⃣ Copy rest of the app files
COPY . .

# 4️⃣ Build Next.js app
RUN npm run build



# 6️⃣ Start server
CMD ["npm", "start"]
