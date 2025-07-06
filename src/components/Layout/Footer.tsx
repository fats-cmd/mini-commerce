import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Clock,
  Shield,
  Truck,
  RotateCcw,
  ChevronRight,
  Heart,
  Send,
} from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // the links here lead to nowhere. just fancy for better UI
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Blog", href: "/blog" },
  ];

  const customerService = [
    { name: "Help Center", href: "/help" },
    { name: "Returns", href: "/returns" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Size Guide", href: "/size-guide" },
    { name: "Track Order", href: "/track" },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
      color: "hover:text-blue-600",
    },
    {
      icon: Twitter,
      href: "#",
      label: "Twitter",
      color: "hover:text-blue-400",
    },
    {
      icon: Instagram,
      href: "#",
      label: "Instagram",
      color: "hover:text-pink-600",
    },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-600" },
    {
      icon: Linkedin,
      href: "#",
      label: "LinkedIn",
      color: "hover:text-blue-700",
    },
  ];

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $50",
      color: "text-green-500",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-day return policy",
      color: "text-blue-500",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure checkout",
      color: "text-purple-500",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Dedicated support team",
      color: "text-orange-500",
    },
  ];

  const paymentMethods = [
    "Visa",
    "Mastercard",
    "PayPal",
    "Apple Pay",
    "Google Pay",
    "Stripe",
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,48,0.3),transparent_50%)]" />
      </div>

      {/* Features Section */}
      <div className="border-b border-gray-700/50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-105 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${feature.color} bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-1mb-4">
                  <p
                    className="relative text-white"
                    style={{
                      fontFamily: "cursive, Comic Sans MS, sans-serif",
                      letterSpacing: "1px",
                    }}
                  >
                    MiniBuy
                  </p>
                  <FaShoppingCart color="orange" />
                </h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Your one-stop destination for quality products at unbeatable
                  prices. We&apos;re committed to providing exceptional shopping
                  experiences with fast shipping and excellent customer service.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                    <Phone size={16} className="text-orange-400" />
                  </div>
                  <span>+234 9110296183</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                    <Mail size={16} className="text-orange-400" />
                  </div>
                  <span>support@MiniBuy.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                    <MapPin size={16} className="text-orange-400" />
                  </div>
                  <span>123 Commerce St, Lagos, Nigeria</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 pt-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:bg-white/20 hover:scale-110`}
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <ChevronRight
                        size={16}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                Customer Service
              </h3>
              <ul className="space-y-3">
                {customerService.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <ChevronRight
                        size={16}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                Stay Updated
              </h3>
              <p className="text-gray-400 mb-4">
                Subscribe to get special offers, free giveaways, and updates.
              </p>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  />
                  <button className="absolute right-2 top-2 w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-110">
                    <Send size={16} />
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  By subscribing, you agree to our Privacy Policy and Terms of
                  Service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700/50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} MiniBuy. All rights reserved.
                <span className="inline-flex items-center gap-1 ml-2">
                  Made with <Heart size={14} className="text-red-500" /> in
                  Nigeria
                </span>
              </p>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">We accept:</span>
              <div className="flex gap-2">
                {paymentMethods.map((method) => (
                  <div
                    key={method}
                    className="px-3 py-1 bg-white/10 rounded-lg text-xs font-medium text-gray-300 hover:bg-white/20 transition-colors"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-6 pt-6 border-t border-gray-700/30">
            {[
              "Privacy Policy",
              "Terms of Service",
              "Cookie Policy",
              "Accessibility",
              "Sitemap",
            ].map((link) => (
              <a
                key={link}
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
