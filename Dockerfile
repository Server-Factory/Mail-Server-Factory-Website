FROM jekyll/jekyll:4.2.2

# Set working directory
WORKDIR /srv/jekyll

# Copy Gemfile and Gemfile.lock first for better caching
COPY Gemfile* ./

# Install Ruby dependencies
RUN bundle install

# Copy the rest of the application
COPY . .

# Expose the Jekyll default port
EXPOSE 4000

# Set the default command to serve the site
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--port", "4000", "--livereload", "--drafts", "--future"]