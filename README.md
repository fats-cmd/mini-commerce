# Mini Commerce - Frontend 

A modern, responsive e-commerce application built with Next.js 14, TypeScript, and Tailwind CSS. This project demonstrates advanced frontend development skills with a focus on performance, user experience, and code quality.

## 🚀 Live Demo

[View Live Demo](https://mini-commerce-wine-alpha.vercel.app/)

## 📋 Project Overview

<!-- ### Requirements Met ✅ -->

- **Modern React Development**: Built with Next.js 14, TypeScript, and React 18
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **State Management**: Zustand for global state management
- **Data Fetching**: React Query for efficient data fetching and caching
- **Performance Optimized**: Optimized for Core Web Vitals and LCP
- **Type Safety**: Full TypeScript implementation
- **Component Architecture**: Modular, reusable components
- **User Experience**: Smooth animations, loading states, and intuitive navigation

## 🛠️ Technology Stack

### Core Technologies

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Icons**: Lucide React + React Icons
- **Image Optimization**: Next.js Image component

### Development Tools

- **Package Manager**: npm
- **Linting**: ESLint
- **Code Formatting**: Prettier
- **Type Checking**: TypeScript
- **Build Tool**: Next.js (SWC)

## 🏗️ Architecture & Design Decisions

### 1. **Framework Choice: Next.js 14**

- **Why Next.js**: Chosen for its excellent developer experience, built-in optimizations, and App Router
- **App Router**: Modern file-based routing with improved performance
- **Image Optimization**: Built-in image optimization for better LCP
- **TypeScript Support**: First-class TypeScript support

### 2. **Styling: Tailwind CSS**

- **Utility-First**: Rapid development with utility classes
- **Responsive Design**: Built-in responsive utilities
- **Custom Design System**: Consistent spacing, colors, and typography
- **Performance**: Only includes used CSS in production

### 3. **State Management: Zustand**

- **Lightweight**: Minimal bundle size compared to Redux
- **Simple API**: Easy to use and understand
- **TypeScript Support**: Excellent TypeScript integration
- **Performance**: Efficient re-renders and updates

### 4. **Data Fetching: React Query**

- **Caching**: Intelligent caching with stale-while-revalidate
- **Background Updates**: Automatic background refetching
- **Error Handling**: Built-in error states and retry logic with custom error handling ui for better user experience

- **Optimistic Updates**: Smooth user experience

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── cart/              # Shopping cart functionality
│   ├── checkout/          # Checkout process
│   ├── product/           # Product detail pages
│   └── products/          # Product listing page
├── components/            # Reusable UI components
│   ├── Buttons/          # Button components
│   ├── Hero/             # Hero section components
│   ├── Layout/           # Layout components
│   ├── Product/          # Product-related components
│   └── Providers/        # Context providers
├── context/              # React Context providers
├── hooks/                # Custom React hooks
├── stores/               # Zustand stores
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## 🎨 Design System

### Color Palette

- **Primary**: Orange (#f97316) - Warm, energetic, perfect for e-commerce
- **Secondary**: Blue (#3b82f6) - Trust, reliability
- **Neutral**: Gray scale for text and backgrounds
- **Success**: Green (#10b981) - Positive actions
- **Error**: Red (#ef4444) - Error states

### Typography

- **Font**: Inter (Google Fonts) - Modern, readable, excellent for web
- **Weights**: Light, Regular, Medium, Semibold, Bold
- **Responsive**: Fluid typography scaling

### Spacing & Layout

- **Grid System**: CSS Grid and Flexbox
- **Spacing Scale**: Tailwind's 4px base unit system
- **Container**: Max-width containers for optimal reading
- **Breakpoints**: Mobile-first responsive design

## ⚡ Performance Optimizations

### 1. **Image Optimization**

- **Next.js Image**: Automatic WebP/AVIF conversion
- **Responsive Images**: Proper `sizes` attribute
- **Lazy Loading**: Images load as needed
- **Blur Placeholders**: Better perceived performance

### 2. **Code Splitting**

- **Dynamic Imports**: Lazy load non-critical components
- **Route-based Splitting**: Each page loads independently
- **Component-level Splitting**: Heavy components loaded on demand

### 3. **Caching Strategy**

- **React Query**: Intelligent caching with stale-while-revalidate
- **Static Assets**: Aggressive caching for images and fonts
- **API Responses**: 5-minute cache for product data

### 4. **Bundle Optimization**

- **Tree Shaking**: Remove unused code
- **Minification**: SWC for fast builds, this is not really minification, but it is a fast build tool
- **Compression**: Gzip compression enabled

## 🔧 Key Features

### 1. **Product Management**

- Product grid with responsive layout
- Product detail pages with image gallery
- Search and filtering functionality
- Category-based organization

### 2. **Shopping Cart**

- Add/remove items
- Quantity management
- Persistent cart state
- Real-time price calculations

### 3. **User Experience**

- Smooth animations and transitions
- Loading states and skeletons
- Error handling and fallbacks
- Responsive design for all devices

### 4. **Performance Features**

- Optimized images and assets
- Efficient data fetching
- Minimal bundle size
- Fast page loads

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Test
npm run test

### Manual Testing

- Cross-browser compatibility
- Responsive design testing
- User flow validation
- Performance testing


## 🔄 Development Workflow

### Code Quality

- ESLint for code linting
- TypeScript for type safety
- Prettier for code formatting
- Git hooks for pre-commit checks

### Deployment

- Vercel for hosting
- Automatic deployments on push
- Environment-specific builds


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Ronald Okpara**

- GitHub: [@fats-cmd]
- LinkedIn: [https://www.linkedin.com/in/ronald-okpara-58a5652b8/]
[View Live Demo](https://mini-commerce-wine-alpha.vercel.app/)


---

**Built using Next.js, TypeScript, and Tailwind CSS**
