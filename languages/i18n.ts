import * as Localization from "expo-localization";
import I18n from "i18n-js";

// Varsayılan dil
I18n.defaultLocale = "en";

// Desteklenen diller
I18n.locale = Localization.locale;
I18n.fallbacks = true;
I18n.translations = {
  en: {
    bottomBar: {
      home: "Home",
      stats: "Stats",
      settings: "Settings",
    },
    edit: "Edit",
    delete: "Delete",
    noDescription: "No description",
    aboutUs:
      "Rimsin is a mobile application that helps you take control of your personal finances. It enables you to set financial goals, track your income and expenses, create budgets, and manage your spending. With Rimsin's user-friendly interface and analytical tools, you can gain a better understanding of your financial situation and take steps towards saving and securing your financial well-being. Discover Rimsin to achieve financial freedom!",
    balance: "Balance",
    yourGoals: "Your Goals",
    recentTransactions: "Recent Transactions",
    noTransactions: "No transactions",
    save: "Save",
    expense: "Expense",
    revenue: "Revenue",
    description: "Description",
    amount: "Amount",
    months: {
      january: "January",
      february: "February",
      march: "March",
      april: "April",
      may: "May",
      june: "June",
      july: "July",
      august: "August",
      september: "September",
      october: "October",
      november: "November",
      december: "December",
    },
    settings: {
      titles: {
        privacyPolicy: "Privacy Policy",
        aboutUs: "About Us",
        createrInfo: "Creator Info",
        currency: "Currency",
        deleteAllData: "Delete All Data",
      },
    },
    review: "Rate Us",
    currency: "Currency",
    deleteDataText: "Are you sure it will delete all data?",
    warning: "WARNING",
  },
  tr: {
    bottomBar: {
      home: "Ana Sayfa",
      stats: "İstatistikler",
      settings: "Ayarlar",
    },
    edit: "Düzenle",
    delete: "Sil",
    noDescription: "Açıklama yok",
    aboutUs:
      "Rimsin kişisel finanslarınızı kontrol altına almanıza yardımcı olan bir mobil uygulamadır. Finansal hedefler belirlemenizi, gelir ve giderlerinizi takip etmenizi, bütçeler oluşturmanızı ve harcamalarınızı yönetmenizi sağlar. Rimsin'in kullanıcı dostu arayüzü ve analitik araçlarıyla finansal durumunuzu daha iyi anlayabilir ve finansal refahınızı korumak ve tasarruf etmek için adımlar atabilirsiniz. Finansal özgürlüğe ulaşmak için Rimsin'i keşfedin!",
    balance: "Bakiye",
    yourGoals: "Hedefleriniz",
    recentTransactions: "Son İşlemler",
    noTransactions: "İşlem yok",
    save: "Kaydet",
    expense: "Gider",
    revenue: "Gelir",
    description: "Açıklama",
    amount: "Miktar",
    months: {
      january: "Ocak",
      february: "Şubat",
      march: "Mart",
      april: "Nisan",
      may: "Mayıs",
      june: "Haziran",
      july: "Temmuz",
      august: "Ağustos",
      september: "Eylül",
      october: "Ekim",
      november: "Kasım",
      december: "Aralık",
    },
    settings: {
      titles: {
        privacyPolicy: "Gizlilik Politikası",
        aboutUs: "Hakkımızda",
        createrInfo: "Geliştirici Bilgileri",
        currency: "Para Birimi",
        deleteAllData: "Tüm Verileri Sil",
      },
    },
    review: "Bizi Oyla",
    currency: "Para Birimi",
    deleteDataText: "Tüm verileri silmek istediğinizden emin misiniz?",
    warning: "UYARI",
  },
  de: {
    bottomBar: {
      home: "Zuhause",
      stats: "Statistiken",
      settings: "Einstellungen",
    },
    edit: "Bearbeiten",
    delete: "Löschen",
    noDescription: "Keine Beschreibung",
    aboutUs:
      "Rimsin ist eine mobile Anwendung, die Ihnen hilft, Ihre persönlichen Finanzen unter Kontrolle zu bringen. Es ermöglicht Ihnen, finanzielle Ziele zu setzen, Ihr Einkommen und Ihre Ausgaben zu verfolgen, Budgets zu erstellen und Ihre Ausgaben zu verwalten. Mit der benutzerfreundlichen Oberfläche und den Analysetools von Rimsin können Sie Ihre finanzielle Situation besser verstehen und Schritte unternehmen, um Ihre finanzielle Sicherheit zu gewährleisten und zu sparen. Entdecken Sie Rimsin, um finanzielle Freiheit zu erlangen!",
    balance: "Balance",
    yourGoals: "Ihre Ziele",
    recentTransactions: "Letzte Transaktionen",
    noTransactions: "Keine Transaktionen",
    save: "Speichern",
    expense: "Ausgabe",
    revenue: "Einnahmen",
    description: "Beschreibung",
    amount: "Menge",
    months: {
      january: "Januar",
      february: "Februar",
      march: "März",
      april: "April",
      may: "Mai",
      june: "Juni",
      july: "Juli",
      august: "August",
      september: "September",
      october: "Oktober",
      november: "November",
      december: "Dezember",
    },
    settings: {
      titles: {
        privacyPolicy: "Datenschutz-Bestimmungen",
        aboutUs: "Über uns",
        createrInfo: "Entwickler-Informationen",
        currency: "Währung",
        deleteAllData: "Alle Daten löschen",
      },
    },
    review: "Bewerten Sie uns",
    currency: "Währung",
    deleteDataText: "Sind Sie sicher, dass Sie alle Daten löschen möchten?",
    warning: "WARNUNG",
  },
};

export default I18n;
