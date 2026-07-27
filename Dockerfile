FROM node:22-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# Pin tectonic's cache to a fixed location so the build-time pre-compile
# and the runtime compile share the same package cache.
ENV XDG_CACHE_HOME=/app/.cache

# Install tectonic — a self-contained LaTeX engine (no TeX Live, no
# kpathsea, no format files). The musl static binary has zero runtime
# dependencies. It downloads LaTeX packages on demand and caches them.
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
  && rm -rf /var/lib/apt/lists/* \
  && curl -fsSL -o /tmp/tectonic.tar.gz \
    https://github.com/tectonic-typesetting/tectonic/releases/download/tectonic%400.17.0/tectonic-0.17.0-x86_64-unknown-linux-musl.tar.gz \
  && tar xzf /tmp/tectonic.tar.gz -C /usr/local/bin tectonic \
  && chmod +x /usr/local/bin/tectonic \
  && rm /tmp/tectonic.tar.gz \
  && tectonic --version

# Pre-populate tectonic's package cache by compiling the CV once during
# the build. This downloads fontawesome5, sourcesanspro, etc. so runtime
# compiles don't need internet access.
COPY --from=builder /app/data/cv/main.tex /app/data/cv/cvstyle.sty /tmp/cv-precompile/
RUN cd /tmp/cv-precompile && tectonic main.tex && rm -rf /tmp/cv-precompile

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
# Standalone output does NOT auto-include project-root files, so we
# explicitly copy the LaTeX CV sources the API route reads at runtime.
COPY --from=builder /app/data ./data

EXPOSE 3000

CMD ["node", "server.js"]