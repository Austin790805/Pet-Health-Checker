import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "app_name": "Pet Health Checker",
      "home": "Home",
      "assessment": "Health Assessment",
      "vet_locator": "Vet Locator",
      "community": "Community",
      "blog": "Blog",
      "login": "Login",
      "logout": "Logout",
      "register": "Register",
      "welcome": "Welcome to Pet Health Checker",
      "welcome_desc": "Get preliminary health assessments for your pets using AI, connect with other owners, and find nearby vets.",
      "start_assessment": "Start Assessment",
      "pet_type": "Pet Type",
      "dog": "Dog",
      "cat": "Cat",
      "upload_image": "Upload Pet Image",
      "symptoms": "Observed Symptoms",
      "analyze": "Analyze Health",
      "analyzing": "Analyzing...",
      "results": "Assessment Results",
      "probable_condition": "Probable Condition",
      "confidence": "Confidence",
      "recommendations": "Recommendations",
      "home_care": "Home Care",
      "vet_visit": "Veterinary Visit",
      "disclaimer": "Disclaimer: This system provides preliminary assessments only and is not a replacement for professional veterinary diagnosis.",
      "find_vets": "Find Nearby Vets",
      "location": "Your Location",
      "search": "Search",
      "community_disclaimer": "Community advice is not medical advice. Always consult a vet for serious concerns.",
      "new_post": "New Post",
      "title": "Title",
      "content": "Content",
      "post": "Post",
      "read_more": "Read More",
      "email": "Email",
      "password": "Password",
      "forgot_password": "Forgot Password?",
      "no_account": "Don't have an account? Register",
      "has_account": "Already have an account? Login",
      "language": "Language"
    }
  },
  sw: {
    translation: {
      "app_name": "Mchunguzi wa Afya ya Wanyama",
      "home": "Mwanzo",
      "assessment": "Tathmini ya Afya",
      "vet_locator": "Tafuta Daktari",
      "community": "Jamii",
      "blog": "Blogu",
      "login": "Ingia",
      "logout": "Toka",
      "register": "Jisajili",
      "welcome": "Karibu kwenye Mchunguzi wa Afya ya Wanyama",
      "welcome_desc": "Pata tathmini ya awali ya afya ya wanyama wako kwa kutumia AI, ungana na wamiliki wengine, na utafute madaktari wa karibu.",
      "start_assessment": "Anza Tathmini",
      "pet_type": "Aina ya Mnyama",
      "dog": "Mbwa",
      "cat": "Paka",
      "upload_image": "Pakia Picha ya Mnyama",
      "symptoms": "Dalili Zilizozingatiwa",
      "analyze": "Chunguza Afya",
      "analyzing": "Inachunguza...",
      "results": "Matokeo ya Tathmini",
      "probable_condition": "Hali Inayowezekana",
      "confidence": "Uhakika",
      "recommendations": "Mapendekezo",
      "home_care": "Huduma ya Nyumbani",
      "vet_visit": "Ziara ya Daktari",
      "disclaimer": "Ilani: Mfumo huu unatoa tathmini za awali pekee na si mbadala wa uchunguzi wa kitaalamu wa daktari wa wanyama.",
      "find_vets": "Tafuta Madaktari Karibu",
      "location": "Eneo Lako",
      "search": "Tafuta",
      "community_disclaimer": "Ushauri wa jamii si ushauri wa kimatibabu. Daima wasiliana na daktari kwa masuala mazito.",
      "new_post": "Chapisho Jipya",
      "title": "Kichwa",
      "content": "Maudhui",
      "post": "Chapisha",
      "read_more": "Soma Zaidi",
      "email": "Barua Pepe",
      "password": "Nenosiri",
      "forgot_password": "Umesahau Nenosiri?",
      "no_account": "Hauna akaunti? Jisajili",
      "has_account": "Tayari una akaunti? Ingia",
      "language": "Lugha"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
