# Modern Portfolio Website

A beautiful, responsive portfolio website inspired by the [Andrea Lukass site](https://andrea-lukass-site.webflow.io/), built with modern web technologies and GSAP animations.

## ✨ Features

- **Modern Design**: Clean, professional layout with beautiful typography
- **GSAP Animations**: Smooth scroll-triggered animations and interactions
- **Responsive Layout**: Works perfectly on all devices
- **Interactive Elements**: Hover effects, smooth transitions, and floating elements
- **Performance Optimized**: Fast loading with optimized animations

## 🚀 Getting Started

### 0. Start the Local Server

To view your website locally, you have several options:

#### Option 1: Python HTTP Server (Recommended)
```bash
# Navigate to your project directory
cd html5up-massively

# Start the server
python3 -m http.server 4000

# Or if you have Python 2
python -m SimpleHTTPServer 4000
```

Then open your browser and go to: `http://localhost:4000`

#### Option 2: Node.js HTTP Server
```bash
# Install a simple HTTP server globally
npm install -g http-server

# Navigate to your project directory
cd html5up-massively

# Start the server
http-server -p 4000
```

#### Option 3: Live Server (VS Code Extension)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

#### Option 4: PHP Built-in Server
```bash
# Navigate to your project directory
cd html5up-massively

# Start the server
php -S localhost:4000
```

### 1. Customize Your Information

Edit `index.html` to personalize your portfolio:

```html
<!-- Update the title -->
<title>Your Name - Creative Portfolio</title>

<!-- Update the logo -->
<a href="#intro" class="logo">YourName</a>

<!-- Update hero section -->
<h1 class="hero-title">
    <span class="title-line">Your</span>
    <span class="title-line">Title</span>
    <span class="title-line">Here</span>
</h1>

<!-- Update contact information -->
<a href="mailto:hello@yourname.com">hello@yourname.com</a>
<p>Your City, State</p>
```

### 2. Add Your Projects

Replace the placeholder projects in the work section:

```html
<article class="work-item" data-category="web">
    <div class="work-image">
        <img src="images/your-project.jpg" alt="Your Project" />
        <div class="work-overlay">
            <div class="work-details">
                <h3>Your Project Name</h3>
                <p>Project Description</p>
                <a href="#" class="btn-view">View Project</a>
            </div>
        </div>
    </div>
</article>
```

### 3. Update Your Skills

Modify the skills section in the about area:

```html
<div class="skill-category">
    <h3>Your Skills</h3>
    <ul>
        <li>Skill 1</li>
        <li>Skill 2</li>
        <li>Skill 3</li>
    </ul>
</div>
```

### 4. Add Your Images

Replace the placeholder images in the `images/` folder:
- `pic01.jpg` - Project 1 image
- `pic02.jpg` - Project 2 image
- `pic03.jpg` - Project 3 image
- `pic04.jpg` - Project 4 image
- `pic05.jpg` - Your profile/about image

## 🎨 Customization

### Colors

The main color scheme is defined in `assets/css/main.css`:

```css
:root {
    --primary-color: #6366f1;      /* Main brand color */
    --secondary-color: #8b5cf6;    /* Accent color */
    --text-color: #1a1a1a;        /* Main text */
    --text-light: #4a4a4a;        /* Secondary text */
    --background: #ffffff;         /* Main background */
    --background-alt: #f8fafc;    /* Alternative background */
}
```

### Typography

The site uses Inter font family. You can change this in the CSS:

```css
body {
    font-family: 'Your Font', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

### Animations

GSAP animations are configured in `assets/js/main.js`. You can:

- Adjust animation timing
- Change animation effects
- Add new scroll triggers
- Modify hover animations

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript**: ES6+ with modern features
- **GSAP**: Professional animation library
- **ScrollTrigger**: Scroll-based animations
- **Responsive Design**: Mobile-first approach

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Animation Features

### Scroll Animations
- Fade-in effects for sections
- Staggered animations for work items
- Parallax effects for floating elements
- Smooth text reveals

### Interactive Elements
- Hover effects on work items
- Smooth navigation scrolling
- Header background changes on scroll
- Button hover animations

### Performance
- Optimized scroll event handling
- Efficient GSAP animations
- Smooth 60fps animations
- Reduced motion support

## 🔧 Advanced Customization

### Adding New Sections

1. Add HTML structure
2. Add CSS styling
3. Add GSAP animations in `main.js`

### Custom Animations

```javascript
// Example: Add custom scroll animation
gsap.from('.your-element', {
    scrollTrigger: {
        trigger: '.your-element',
        start: 'top 80%',
        end: 'bottom 20%'
    },
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power2.out'
});
```

### Adding GSAP Plugins

```html
<!-- Add new GSAP plugins -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/PluginName.min.js"></script>
```

## 📁 File Structure

```
html5up-massively/
├── index.html              # Main portfolio page
├── assets/
│   ├── css/
│   │   └── main.css       # Main stylesheet
│   ├── js/
│   │   └── main.js        # JavaScript with GSAP
│   └── images/            # Your project images
└── README.md              # This file
```

## 🚀 Deployment

### Local Development
1. **Recommended**: Use a local server (see "Start the Local Server" section above)
2. **Alternative**: Open `index.html` directly in your browser (some features may not work properly)

### Web Hosting
Upload all files to your web hosting provider. The site works without any build process.

### GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Your portfolio will be available at `username.github.io/repository-name`

## 🎨 Design Inspiration

This portfolio is inspired by the beautiful design and animations from [Andrea Lukass's site](https://andrea-lukass-site.webflow.io/), featuring:

- Clean, minimal design
- Smooth GSAP animations
- Professional typography
- Interactive elements
- Modern color schemes

## 📝 License

This template is free to use for personal and commercial projects.

## 🤝 Support

If you need help customizing your portfolio:

1. Check the CSS comments for styling guidance
2. Review the JavaScript comments for animation help
3. Modify the HTML structure to match your needs
4. Test on different devices for responsiveness

## ✨ Tips for Success

1. **Keep it Simple**: Don't overload with too many animations
2. **Optimize Images**: Use compressed, web-optimized images
3. **Test Performance**: Ensure smooth 60fps animations
4. **Mobile First**: Design for mobile, enhance for desktop
5. **Content First**: Focus on showcasing your work effectively

---

**Happy coding! 🎉**

Your portfolio is now ready to showcase your amazing work to the world!

