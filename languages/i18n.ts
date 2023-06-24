import * as Localization from "expo-localization";
import I18n from "i18n-js";

// Varsayılan dil
I18n.defaultLocale = "en";

// Desteklenen diller
I18n.locale = Localization.locale;
I18n.fallbacks = true;
I18n.translations = {
  en: {
    greeting: "Hello1",
    goodbye: "Goodbye",
  },
  tr: {
    greeting: "Merhaba",
    goodbye: "Au revoir",
  },
};

export default I18n;
