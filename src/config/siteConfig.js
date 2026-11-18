/**
 * RAJ PROPERTIES - Site Configuration & Utilities
 * Apple-inspired minimal property platform
 */

export const siteConfig = {
  brandName: "RAJ PROPERTIES",
  tagline: "Find a place to call your own.",
  subTagline: "Making property decisions simpler, smarter and more convenient.",
  
  // Phone numbers
  phone1: {
    display: "+91 9322692678",
    raw: "9322692678",
    tel: "+919322692678",
    whatsappNumber: "919322692678",
    label: "Advisor 1",
  },
  phone2: {
    display: "+91 9146082678",
    raw: "9146082678",
    tel: "+919146082678",
    whatsappNumber: "919146082678",
    label: "Advisor 2",
  },

  // Official Instagram Handle
  instagram: {
    handle: "@rajpropertyofficial",
    username: "rajpropertyofficial",
    url: "https://instagram.com/rajpropertyofficial",
  },

  city: "Pune, Maharashtra",
  address: "Pune, Maharashtra, India",
};

/**
 * Builds a clean, professional WhatsApp inquiry message
 */
export const buildWhatsAppUrl = (phoneNumber, inquiryData = {}) => {
  const {
    name = "Client",
    mobile = "Not provided",
    email = "Not provided",
    lookingFor = "Buy",
    propertyType = "Apartment",
    location = "Pune",
    budget = "Flexible",
    message = "I am interested in consulting with Raj Properties.",
    propertyTitle = "",
  } = inquiryData;

  let text = `Hello Raj Properties,\n\nI would like to inquire about property consultation:\n`;
  if (propertyTitle) {
    text += `• Property: ${propertyTitle}\n`;
  }
  text += `• Name: ${name}\n`;
  text += `• Mobile: ${mobile}\n`;
  if (email && email !== "Not provided") {
    text += `• Email: ${email}\n`;
  }
  text += `• Looking For: ${lookingFor}\n`;
  text += `• Property Type: ${propertyType}\n`;
  text += `• Preferred Location: ${location}\n`;
  text += `• Budget: ${budget}\n`;
  if (message) {
    text += `• Message: ${message}\n`;
  }
  text += `\nThank you.`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
};
