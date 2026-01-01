# Urban Home Website

A modern, responsive real estate website built with vanilla HTML, CSS, and JavaScript.

## Project Overview

Urban Home Website is a lightweight, frontend-only real estate platform designed to showcase properties and provide an intuitive user experience. The project uses vanilla web technologies with JSON files for data storage, ensuring fast performance and easy deployment.

## Features

- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **Property Listings**: Display properties with detailed information and images
- **Search & Filter**: Advanced search and filtering capabilities for property discovery
- **Contact Forms**: Easy-to-use contact forms for user inquiries
- **JSON Data Storage**: Efficient data management using JSON files
- **Fast Performance**: No build process or dependencies required

## Tech Stack

- **HTML5**: Semantic markup for structure
- **CSS3**: Modern styling and responsive layouts
- **Vanilla JavaScript**: Client-side interactivity and DOM manipulation
- **JSON**: Data storage and management

## Getting Started

### Prerequisites

You only need a modern web browser to run this project. No installation or build tools are required.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Phanideep18/UrbanHomeWebisite.git
```

2. Navigate to the project directory:
```bash
cd UrbanHomeWebisite
```

3. Open `index.html` in your web browser or use a local server (optional):
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if available)
npx http-server
```

## Project Structure

```
UrbanHomeWebisite/
├── index.html
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── main.js
│   └── utils.js
├── data/
│   └── properties.json
└── assets/
    └── images/
```

## Data Storage

Data is stored in JSON files located in the `data/` directory. Properties and other information are managed through simple JSON files that are loaded and processed by JavaScript.

Example `properties.json` structure:
```json
{
  "properties": [
    {
      "id": 1,
      "name": "Modern Apartment",
      "location": "Downtown",
      "price": 250000,
      "bedrooms": 2,
      "bathrooms": 1,
      "image": "assets/images/property1.jpg"
    }
  ]
}
```

## Usage

1. Open the website in your browser
2. Browse through property listings
3. Use search and filter features to find properties
4. Fill out contact forms to submit inquiries
5. All interactions are handled client-side with JavaScript

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, questions, or suggestions, please open an issue on the GitHub repository.

## Author

Phanideep18

---

**Last Updated**: 2026-01-01
